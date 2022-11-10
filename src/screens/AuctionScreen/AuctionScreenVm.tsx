import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable, reaction } from "mobx";
import { RootStore, useStores } from "@stores";
import { toBlob } from "html-to-image";
import nftStorageService from "@src/services/nftStorageService";
import { IOption } from "@components/Select";
import nodeService from "@src/services/nodeService";
import { toast } from "react-toastify";
import makeNodeRequest from "@src/utils/makeNodeRequest";
import { NS_DAPP, TOKENS_BY_ASSET_ID, TOKENS_BY_SYMBOL } from "@src/constants";
import BN from "@src/utils/BN";

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
let description =
  "Created by 3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG. NFT namespace «.waves». Early adopter's NFT used for MEEDUS. Created by @meedus_nft, launched by @puzzle_swap.";

type TNftData = { id: string; img: string };

class AuctionScreenVM {
  constructor(
    private rootStore: RootStore,
    public name: string,
    public bg: IOption
  ) {
    makeAutoObservable(this);
    setInterval(this.checkNft, 30 * 1000);
    reaction(() => this.name, this.checkNft);
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

  previewModalOpened: boolean = false;
  setPreviewModalOpened = (state: boolean) => (this.previewModalOpened = state);

  existingNft: TNftData | null = null;
  setExistingNft = (v: TNftData | null) => (this.existingNft = v);

  loading = false;
  setLoading = (v: boolean) => (this.loading = v);

  setBid = (n: BN) => (this.bid = n);
  bid: BN = BN.ZERO;
  setDeposit = (n: BN) => (this.deposit = n);
  deposit: BN = BN.ZERO;

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

  placeBid = async () => {};

  private getNftData = async (): Promise<TNftData | null> => {
    const res = await nodeService.nodeKeysRequest(NS_DAPP, this.name);
    if (res.length === 0) return null;
    const id = res[0].value.toString();
    const req = `/addresses/data/3PFQjjDMiZKQZdu5JqTHD7HwgSXyp9Rw9By/nft_${id}_image`;
    const { data } = await makeNodeRequest(req);
    const img = data.value;
    return { id, img };
  };

  checkNft = () => this.getNftData().then(this.setExistingNft);
}
