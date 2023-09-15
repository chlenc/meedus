import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { IOption } from "@components/Select";
import nodeService from "@src/services/nodeService";
import { toast } from "react-toastify";
import { AUCTION, EXPLORER_URL } from "@src/constants";
import BN from "@src/utils/BN";
import * as libCrypto from "@waves/ts-lib-crypto";
import Long from "long";
import { loadState, saveState } from "@src/utils/localStorage";
import {
  buildSuccessBidPlacementParams,
  IDialogNotificationProps,
} from "@components/Dialog/DialogNotification";

const ctx = React.createContext<AuctionScreenVM | null>(null);

interface IProps extends PropsWithChildren {
  name: string;
  bg: IOption;
}

export const AuctionScreenVMProvider: React.FC<IProps> = ({
  name,
  bg,
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(
    () => new AuctionScreenVM(rootStore, name, bg),
    [bg, name, rootStore]
  );
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useAuctionScreenVM = () => useVM(ctx);

type TNftData = { id: string; img: string };

class AuctionScreenVM {
  constructor(
    private rootStore: RootStore,
    public name: string,
    public bg: IOption
  ) {
    makeAutoObservable(this);
  }

  previewModalOpened: boolean = false;
  setPreviewModalOpened = (state: boolean) => (this.previewModalOpened = state);

  public notificationParams: IDialogNotificationProps | null = null;
  public setNotificationParams = (params: IDialogNotificationProps | null) =>
    (this.notificationParams = params);

  existingNft: TNftData | null = null;
  setExistingNft = (v: TNftData | null) => (this.existingNft = v);

  loading = false;
  setLoading = (v: boolean) => (this.loading = v);

  get disabled() {
    return (
      this.bid.eq(0) ||
      this.deposit.eq(0) ||
      this.deposit.lt(this.bid) ||
      !this.isValid
    );
  }

  get minBid() {
    return this.name.length <= 6 ? 20 : 10;
  }

  setBid = (n: BN) => {
    if (this.deposit.lte(this.bid)) this.setDeposit(n);
    this.bid = n;
  };
  bid: BN = BN.ZERO;
  setDeposit = (n: BN) => (this.deposit = n);
  deposit: BN = BN.ZERO;

  isValid = true;
  validate = () => {
    this.isValid =
      this.bid.gte(this.minBid * 1e8) && this.deposit.gte(this.bid);
    if (!this.isValid) {
      toast.dismiss();
      toast.error(`Bet must be greater than or equal to ${this.minBid} fuel`);
    }
  };

  placeBid = async () => {
    if (this.disabled) {
      toast.error("Bid cannot be less then deposit");
      return;
    }
    this.setLoading(true);
    //, _2: phase, _3: bidStart, _4: revealStart, _5: auctionEnd,
    const { _1: auctionId } = await nodeService
      .evaluate(AUCTION, "getAuction()")
      .then((d) => d.result.value);
    const txPayment = { assetId: "WAVES", amount: this.deposit.toString() };
    const secretWords = libCrypto.randomSeed(3);
    const secret = libCrypto.base64Encode(libCrypto.stringToBytes(secretWords));
    const hash = makeBidHash({
      name: this.name,
      amount: this.bid.toString(),
      secret,
      address: this.rootStore.accountStore.address!,
    });
    const args: Array<{ type: "integer" | "string"; value: string }> = [
      { type: "integer", value: String(auctionId.value) },
      { type: "string", value: hash },
      { type: "string", value: "meedus" },
    ];
    const txParams = {
      dApp: AUCTION,
      payment: [txPayment],
      call: { function: "bidWithReferrer", args },
    };
    const txId = await this.rootStore.accountStore
      .invoke(txParams)
      .finally(() => this.setLoading(false));
    if (txId != null) {
      const backup = {
        id: txId, //id транзакции ставки
        hash, // хеш ставки
        domain: ".sway", // так надо оставить
        auctionId: auctionId.value, // id аукциона
        address: this.rootStore.accountStore.address, //адрес пользователя
        name: this.name, // имя за которое сделана ставка
        color: this.bg.key,
        secret, // автогенеренный секрет, генерит 3 произвольных слова, превращаем в массив UTF-8 byte и кодируем в base64
        amount: this.bid.toString(), //деньгт в вейвс
        deposit: this.deposit.toString(),
      };
      const state: any = loadState("meedus-bid-backup") ?? [];
      state.push(backup);
      saveState(state, "meedus-bid-backup");
      console.log(loadState("meedus-bid-backup"));
      this.setNotificationParams(
        buildSuccessBidPlacementParams({
          domain: `${this.name}.sway`,
          onBackToBids: () => window.open(`/#/nameservice`, "_self"),
          onExplorerClick: () =>
            window.open(`${EXPLORER_URL}/transactions/${txId}`),
        })
      );
      return;
    } else {
      toast.error("Something went wrong");
      return;
    }
  };
}

type TMakeBidHashProps = {
  name: string;
  amount: string;
  secret: string;
  address: string;
};

function makeBidHash({ name, amount, secret, address }: TMakeBidHashProps) {
  const amountArrayNumbers = Long.fromString(amount);
  const amountArrayBytes = amountArrayNumbers.toBytes();
  const amountBytes = Uint8Array.from(amountArrayBytes);
  const nameBytes = libCrypto.stringToBytes(name);
  const addrBytes = libCrypto.base58Decode(address);
  const secretBytes = libCrypto.base64Decode(secret);
  const hashb2b = libCrypto.blake2b(
    libCrypto.keccak(
      libCrypto.concat(nameBytes, amountBytes, addrBytes, secretBytes)
    )
  );

  return libCrypto.base58Encode(hashb2b);
}
