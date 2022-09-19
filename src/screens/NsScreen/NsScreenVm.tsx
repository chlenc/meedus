import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { toBlob } from "html-to-image";
import nftStorageService from "@src/services/nftStorageService";
import { IOption } from "@components/Select";
import BN from "@src/utils/BN";
import nodeService from "@src/services/nodeService";

const ctx = React.createContext<NsScreenVM | null>(null);

export const NsScreenVMProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(() => new NsScreenVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useNsScreenVM = () => useVM(ctx);
let description =
  "Created by 3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG. NFT namespace «.waves». Early adopter's NFT used for MEEDUS. Created by @meedus_nft, launched by @puzzle_swap.";

class NsScreenVM {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get calcPrice(): number {
    const len = this.name.toString().length;
    console.log(len);
    if (len >= 8) return 15;
    else if (len < 8 && len >= 6) return 20;
    else if (len < 6 && len >= 4) return 25;
    else return 0;
  }

  previewModalOpened: boolean = false;
  setPreviewModalOpened = (state: boolean) => (this.previewModalOpened = state);

  nameError: string | null = null;
  setNameError = (v: string | null) => (this.nameError = v);

  bg: IOption | null = null;
  setBg = (bg: IOption) => (this.bg = bg);

  name: string = "";
  setName = (name: string) => (this.name = name.toLowerCase());

  createImage = async () => {
    const element = document.getElementById("nft-preview");
    if (element == null) return;
    //todo handle error
    const blob = await toBlob(element);
    if (blob == null) return;
    //todo handle error
    const file = new File([blob], this.name);
    const res = await nftStorageService.storeNFT(file, this.name, description);
    return res.data.image
      .toString()
      .replace("ipfs://", "https://ipfs.io/ipfs/");
  };

  mint = async () => {
    const link = await this.createImage();
    console.log(link);
    if (link == null) {
      //todo handle error
      return;
    }
    const tx = await this.rootStore.accountStore.invoke({
      dApp: "3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG",
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
  };

  checkIfNameTaken = async () =>
    await nodeService.nodeKeysRequest(
      "3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG",
      this.name
    );
}
