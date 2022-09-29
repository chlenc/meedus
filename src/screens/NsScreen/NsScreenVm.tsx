import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable, reaction } from "mobx";
import { RootStore, useStores } from "@stores";
import { toBlob } from "html-to-image";
import nftStorageService from "@src/services/nftStorageService";
import { IOption } from "@components/Select";
import BN from "@src/utils/BN";
import nodeService from "@src/services/nodeService";
import { toast } from "react-toastify";
import makeNodeRequest from "@src/utils/makeNodeRequest";

const ctx = React.createContext<NsScreenVM | null>(null);

export const NsScreenVMProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(() => new NsScreenVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

const NS_DAPP = "3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG"; //mainnet
// const NS_DAPP = "3N9CHPgP4cjToRcdiwyvfBhmS1rJp1JXZ6M"; //testnet

export const useNsScreenVM = () => useVM(ctx);
let description =
  "Created by 3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG. NFT namespace «.waves». Early adopter's NFT used for MEEDUS. Created by @meedus_nft, launched by @puzzle_swap.";

type TNftData = { id: string; img: string };

class NsScreenVM {
  constructor(private rootStore: RootStore) {
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

  get calcWNSPrice(): number {
    const len = this.name.toString().length;
    if (len >= 8) return 15;
    else if (len < 8 && len >= 6) return 20;
    else if (len < 6 && len >= 4) return 25;
    else return 0;
  }

  previewModalOpened: boolean = false;
  setPreviewModalOpened = (state: boolean) => (this.previewModalOpened = state);

  existingNft: TNftData | null = null;
  setExistingNft = (v: TNftData | null) => (this.existingNft = v);

  loading = false;
  setLoading = (v: boolean) => (this.loading = v);

  bg: IOption | null = null;
  setBg = (bg: IOption) => (this.bg = bg);

  name: string = "";
  setName = (name: string) => (this.name = name.toLowerCase());

  createImage = async () => {
    const element = document.getElementById("nft-preview");
    if (element == null) {
      const e = "Error while getting element out of pic: element not found";
      console.error(e);
      toast.error(e);
      return;
    }
    console.log(element);
    const blob = await toBlob(element);
    if (blob == null) {
      const e = "Error while creating blob from pic";
      console.error(e);
      toast.error(e);
      return;
    }
    const file = new File([blob], this.name);
    console.log(file);
    // const res = await nftStorageService.storeNFT(file, this.name, description);
    // return res.data.image
    //   .toString()
    //   .replace("ipfs://", "https://ipfs.io/ipfs/");
  };

  mint = async () => {
    this.setLoading(true);
    const link = await this.createImage();
    if (this.name == null || this.existingNft != null) {
      return;
    }
    if (link == null) {
      toast.error("Something went wrong");
      this.setLoading(false);
      return;
    }
    const txId = await this.rootStore.accountStore.invoke({
      dApp: NS_DAPP,
      payment: [
        {
          assetId: "WAVES",
          amount: BN.parseUnits(new BN(this.calcPrice), 8).toString(),
        },
      ],
      call: {
        function: "mint",
        args: [
          { type: "string", value: this.name },
          { type: "string", value: link },
        ],
      },
    });
    this.setLoading(false);
    if (txId != null) {
      toast.success("Congrats! You can check your name on puzzlemarket.org");
      return;
    } else {
      toast.error("Something went wrong");
      return;
    }
  };

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
