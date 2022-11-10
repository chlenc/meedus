import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import makeNodeRequest from "@src/utils/makeNodeRequest";
import { AUCTION } from "@src/constants";
import { IData } from "@src/utils/getStateByKey";
import nodeService from "@src/services/nodeService";
import { loadState } from "@src/utils/localStorage";

const ctx = React.createContext<MyBidsVM | null>(null);

export const MyBidsVMProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new MyBidsVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useMyBidsVM = () => useVM(ctx);

type TBidBackup = {
  id: string;
  hash: string;
  domain: string;
  auctionId: number;
  address: string;
  name: string;
  secret: string;
  amount: string;
  deposit: string;
  color?: string;
};

type TAuction = {
  id: string;
  phase: string;
  bidStart: string;
  revealStart: string;
  auctionEnd: string;
};

type TStateBid = {
  auctionId: string;
  address: string;
  hash: string;
  deposit: string;
};

type TState = {
  bid: Array<TStateBid>;
  reveal: Array<TStateBid & { name: string; bid: string }>;
  top: Array<TStateBid & { name: string }>;
};

export type TBidStatus =
  | "bid"
  | "missed"
  | "needReveal"
  | "reveal"
  | "leading"
  | "winner"
  | "expired";

export type TBid = Partial<TBidBackup> &
  Partial<{ name: string; bid: string }> &
  TStateBid & { top: boolean; reveal: boolean; status?: TBidStatus };

class MyBidsVM {
  // private readonly
  private backup: TBidBackup[] = [];
  private setBackup = (b: TBidBackup[]) => (this.backup = b);

  private auction: TAuction | null = null;
  private setAuction = (a: TAuction) => (this.auction = a);

  private state: TState | null = null;
  private setState = (s: TState | null) => (this.state = s);

  private fetchAuction = async (): Promise<TAuction> => {
    const data = await nodeService
      .evaluate(AUCTION, "getAuction()")
      .then((d) => d.result.value);

    const keys = ["id", "phase", "bidStart", "revealStart", "auctionEnd"];
    return keys.reduce(
      (acc, name, index) => ({
        ...acc,
        [name]: String(data[`_${index + 1}`].value),
      }),
      {} as Record<string, string>
    ) as TAuction;
  };

  private fetchState = async (): Promise<TState | null> => {
    const address = this.rootStore.accountStore.address;
    if (address == null) return null;
    const req = `/addresses/data/${AUCTION}?matches=%5E%28Top_.%2B%7CBid_.%2A.%2B_${address}_.%2B%7CReveal_.%2A.%2B_${address}.%2B%29%24`;
    const { data } = await makeNodeRequest(req);
    return (data as IData[]).reduce(
      (acc, { key, value }) => {
        if (key.indexOf("Bid") === 0) {
          const [, auctionId, address, hash] = key.split("_");
          acc.bid.push({ auctionId, address, hash, deposit: String(value) });
        }
        if (key.indexOf("Top") === 0) {
          const [, name] = key.split("_");
          const [reveal, deposit] = String(value).split(",");
          const [, auctionId, address, hash] = reveal.split("_");
          acc.top.push({ name, deposit, auctionId, address, hash });
        }
        if (key.indexOf("Reveal") === 0) {
          const [, auctionId, address, hash] = key.split("_");
          const [deposit, bid, name] = String(value).split(",");
          acc.reveal.push({ name, deposit, bid, auctionId, address, hash });
        }
        return acc;
      },
      { bid: [], reveal: [], top: [] } as TState
    );
  };

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.sync();
    setInterval(this.sync, 30 * 1000);
  }

  //Фаза Bid:
  // 1. Ставка сделана, раскрывать еще нельзя
  // id текущего аукциона равно id аукциона из бекапа и у текущего аукциона phase=BID
  //
  // Фаза Reveal:
  // 2. Ставка сделана, можно раскрыть
  // id текущего аукциона равно id аукциона из бекапа и у текущего аукциона phase=REVEAL и нет еще записи Reveal_(.*)
  //
  //-------------- 3. У нас это чисто промежуточный статус между "подписали транзу на раскрытие" и "транзакция легла в БЧ и мы получили апдейт по ставкам из АПИ ноды". Можете пропустить
  //
  // 4. Ставка раскрыта, но за это же имя уже есть бОльшая раскрытая ставка
  // id текущего аукциона равно id аукциона из бекапа и у текущего аукциона phase=REVEAL и есть запись Reveal_(.*) но Top_(.*) указывает не на меня
  //
  // 5. Ставка раскрыта и она самая большая за это имя
  // id текущего аукциона равно id аукциона из бекапа и у текущего аукциона phase=REVEAL и есть запись Reveal_(.*) и Top_(.*) указывает на меня
  //
  // Аукцион завершен:
  // 6. Ставка раскрыта и она победила — самая большая за это имя
  // id текущего аукциона больше id аукциона из бекапа, есть запись Reveal_(.*) и Top_(.*) указывает на меня
  //
  //
  // 7. Ставка раскрыта и она проиграла — есть другая бОльшая ставка за это имя
  // id текущего аукциона больше id аукциона из бекапа, есть запись Reveal_(.*) но Top_(.*) указывает не на меня
  //
  // 8. Ставка не была раскрыта на фазе Reveal. Теперь она заморожена: нельзя её раскрыть или вернуть депозит этой ставки (пока)
  // id текущего аукциона больше id аукциона из бекапа, нет записи Reveal_(.*)

  public get bids(): TBid[] {
    return (
      this.state?.bid.map((bid) => {
        const backup = this.backup.find(({ hash }) => bid.hash === hash);
        const reveal = this.state?.reveal?.find(
          ({ hash }) => bid.hash === hash
        );
        const top = this.state?.top?.find(({ hash }) => bid.hash === hash);
        let status;
        const auction = this.auction;
        const isActive = auction != null && bid.auctionId === auction.id;
        const isReveal = auction?.phase === "REVEAL";
        if (isActive && auction.phase === "BID") {
          status = "bid";
        } else if (isActive && isReveal && reveal == null) {
          status = "needReveal";
        } else if (isActive && isReveal && reveal != null && top == null) {
          status = "reveal";
        } else if (isActive && isReveal && reveal != null && top != null) {
          status = "leading";
        } else if (!isActive && reveal != null && top != null) {
          status = "winner";
        } else if (!isActive && reveal != null && top == null) {
          status = "missed";
        } else if (!isActive && reveal == null) {
          status = "expired";
        }
        return {
          ...bid,
          ...reveal,
          ...(backup != null
            ? { ...backup, auctionId: backup.auctionId.toString() }
            : {}),
          reveal: reveal != null,
          top: top != null,
          status,
        } as TBid;
      }) ?? []
    );
  }

  private sync = async () => {
    this.setBackup((loadState("meedus-bid-backup") ?? []) as TBidBackup[]);
    this.fetchState().then(this.setState);
    this.fetchAuction().then(this.setAuction);
  };
}
