import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { toBlob } from "html-to-image";
import nftStorageService from "@src/services/nftStorageService";
import { IOption } from "@components/Select";
import BN from "@src/utils/BN";
import nodeService from "@src/services/nodeService";
import { toast } from "react-toastify";
import makeNodeRequest from "@src/utils/makeNodeRequest";
import {
  AUCTION,
  NFT_STORAGE,
  NS_DAPP,
  REGISTER,
  TOKENS_BY_ASSET_ID,
  TOKENS_BY_SYMBOL,
} from "@src/constants";
import { WavesDomainsClient } from "@waves-domains/client";
import InvalidNameErr from "@screens/NameServiceScreen/InvalidNameErr";
import {
  buildSuccessPurchaseParams,
  IDialogNotificationProps,
} from "@components/Dialog/DialogNotification";

const ctx = React.createContext<NameServiceScreenVm | null>(null);

export const NameServiceScreenVMProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(() => new NameServiceScreenVm(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useNameServiceScreenVM = () => useVM(ctx);
let description =
  "Created by 3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG. NFT namespace «.waves». Early adopter's NFT used for MEEDUS. Created by @meedus_nft, launched by @puzzle_swap.";

export type TNftData = { id: string; img: string };

class NameServiceScreenVm {
  client = new WavesDomainsClient({ network: "mainnet" });

  public notificationParams: IDialogNotificationProps | null = null;
  public setNotificationParams = (params: IDialogNotificationProps | null) =>
    (this.notificationParams = params);

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get calcPrice(): number {
    const len = this.name.toString().length;
    if (len >= 8) return 15;
    else if (len < 8 && len >= 6) return 20;
    else if (len < 6 && len >= 4) return 25;
    else return 0;
  }

  get wnsTokensToPayment(): string[] {
    const len = this.name.toString().length;
    const wns0 = TOKENS_BY_SYMBOL.WNS0.assetId;
    const wns1 = TOKENS_BY_SYMBOL.WNS1.assetId;
    const wns2 = TOKENS_BY_SYMBOL.WNS2.assetId;
    const wns3 = TOKENS_BY_SYMBOL.WNS3.assetId;
    if (len >= 8) return [wns3, wns2, wns1, wns0];
    else if (len < 8 && len >= 6) return [wns2, wns1, wns0];
    else if (len < 6 && len >= 4) return [wns1, wns0];
    else return [wns0];
  }

  get paymentAsset() {
    const { assetBalances } = this.rootStore.accountStore;
    const wnsTokens = this.wnsTokensToPayment;
    const tokenAssetId = wnsTokens?.find((assetId) => {
      const b = assetBalances?.find((b) => assetId === b.assetId);
      return b?.balance?.gt(0);
    });
    return tokenAssetId != null ? TOKENS_BY_ASSET_ID[tokenAssetId] : null;
  }

  existingNft: TNftData | null = null;
  setExistingNft = (v: TNftData | null) => (this.existingNft = v);

  loading = false;
  setLoading = (v: boolean) => (this.loading = v);

  bg: IOption | null = { title: "Waves Blue", key: "#0055FF" };
  setBg = (bg: IOption) => (this.bg = bg);

  search: string = "";
  private setSearch = (search: string) => (this.search = search.toLowerCase());

  name: string = "";
  setName = (name: string) => (this.name = name.toLowerCase());

  createImage = async () => {
    const element = document.getElementById("hidden-preview");
    if (element == null) {
      const e = "Error while getting element out of pic: element not found";
      console.error(e);
      toast.error(e);
      return;
    }
    const blob = await toBlob(element);
    if (blob == null) {
      const e = "Error while creating blob from pic";
      console.error(e);
      toast.error(e);
      return;
    }
    const file = new File([blob], this.name);
    const res = await nftStorageService.storeNFT(file, this.name, description);
    return res.data.image
      .toString()
      .replace("ipfs://", "https://ipfs.io/ipfs/");
  };

  mint = async (wnsPayment?: boolean) => {
    const wnsPaymentAssetId = this.paymentAsset?.assetId;
    if (wnsPayment && wnsPaymentAssetId == null) {
      toast.error("Try to use WAVES as payment");
      return;
    }
    this.setLoading(true);
    const link = await this.createImage();
    console.log(link);
    if (this.name == null || this.existingNft != null) {
      return;
    }
    if (link == null) {
      toast.error("Something went wrong");
      this.setLoading(false);
      return;
    }

    const txPayment = wnsPayment
      ? { assetId: wnsPaymentAssetId ?? "", amount: "1" }
      : {
          assetId: "WAVES",
          amount: BN.parseUnits(new BN(this.calcPrice), 8).toString(),
        };
    const args: Array<{ type: "integer" | "string"; value: string }> = [
      {
        type: "string",
        value: this.name.length <= 3 ? this.name + ".vip" : this.name,
      },
      { type: "string", value: link },
    ];
    const txParams = {
      dApp: NS_DAPP,
      payment: [txPayment],
      call: { function: "mint", args },
    };
    const txId = await this.rootStore.accountStore
      .invoke(txParams)
      .finally(() => this.setLoading(false));
    if (txId != null) {
      const params = this.setNotificationParams(
        buildSuccessPurchaseParams({
          domain: `${this.name}.waves`,
          onGoMarket: () =>
            window.open(`https://puzzlemarket.org/nft/${"txId"}`),
          onGoBack: () => {
            window.location.reload();
            //todo add some more
          },
        })
      );
      this.setNotificationParams(params);
      return;
    } else {
      toast.error("Something went wrong");
      return;
    }
  };

  //1) вводим имя, нажимаем поиск
  //
  // 2.0) проверяем что оно соответствует правилам заведения
  // - 1й и последний не может быть дефисом, 3й и 4й не могут быть дефисом подряд
  // - длинна максимальная 53 минимальная  1, из специальных символов только ‘-‘ a-z маленькие буквы и цифры
  // - не сминчено такое в мидас
  // 2.1) проверяем доступность: isAvailable(name: String) в контракте регистратора или whoIs в npm пакете
  // 2.2) проверяем проверяем валидно ли имя при помощи isValid(name: String) в контракте регистратора
  // 3) узнаем фазу аукциона getAuction() в контракте аукциона, фазу и проверяем что полтзователь может произвести аукцион
  // 4) делаем ставку
  // 5) сохраняем файл
  // [
  //   {
  //     "id": "<id транзакции>", //id транзакции ставки
  //     "hash": "9ezR6Er5hDJWXV5YXXBuZQcxQiNKhyRDBXzQXPagzKaW", // хеш транзакции ставки
  //     "domain": ".waves", // так надо оставить
  //     "auctionId": 457, // id аукциона
  //     "address": "3PAbP5zRZEXU93LaLQPEuYPnn8fnrs28wTB", //адрес пользователя
  //     "name": "foo-bar", // имя за которое сделана ставка
  //     "secret": "ZHVuZSBsYXRlciBub21pbmVlIQ==", // автогенеренный секрет, генерит 3 произвольных слова, превращаем в массив UTF-8 byte и кодируем в base64
  //     "amount": "100001", //деньгт в вейвс
  //     "deposit": "107000"
  //   }
  // ]

  isValidName = (name = this.name) => {
    const len = name.length;
    //длинна максимальная 53 минимальная 1
    if (len < 1 || len > 53) return false;
    //1й и последний не может быть дефисом
    else if (name[0] === "-" || name[len - 1] === "-") return false;
    //3й и 4й не могут быть дефисом подряд
    else if (name[2] === "-" && name[3] === "-") return false;
    //из специальных символов только ‘-‘ a-z маленькие буквы и цифры
    else if (!/^[a-z0-9-]*$/.test(name)) return false;
    return true;
  };

  private getNftData = async (): Promise<TNftData | null> => {
    if (!this.isValidName()) {
      toast.error(<InvalidNameErr />, { style: { width: 320 } });
      return null;
    }
    //todo
    // 2.1) проверяем доступность: isAvailable(name: String) в контракте регистратора
    // 2.2) проверяем проверяем валидно ли имя при помощи isValid(name: String) в контракте регистратора
    const [isAvailable, isValid, res] = await Promise.all([
      nodeService
        .evaluate(REGISTER, `isAvailableName("${this.name}")`)
        .then(({ result }) => result.value),
      nodeService
        .evaluate(AUCTION, `isValidName("${this.name}")`)
        .then(({ result }) => result.value),
      nodeService.nodeKeysRequest(NS_DAPP, this.name),
    ]);

    if (res.length !== 0) {
      const id = res[0].value.toString();
      const req = `/addresses/data/${NFT_STORAGE}/nft_${id}_image`;
      const { data } = await makeNodeRequest(req);
      const img = data.value;
      this.setSearch(this.name);
      return { id, img };
    } else if (!isAvailable) {
      toast.error(
        `${this.name}.waves is not available right now, please try again later`
      );
      return null;
    } else if (!isValid) {
      toast.error(
        `You cannot start auction with ${this.name}.waves right now, please try again later`
      );
      return null;
    } else {
      this.setSearch(this.name);
      return null;
    }
  };

  checkNft = () => this.getNftData().then(this.setExistingNft);
}
