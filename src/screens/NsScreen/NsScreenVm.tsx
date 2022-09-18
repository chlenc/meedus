import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { toBlob } from "html-to-image";
import nftStorageService from "@src/services/nftStorageService";
import { labelColorMap } from "@screens/NsScreen/Preview";

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

const calcPrice = (name: string) => {
  let len = name.length;
  if (len >= 8) return String(15 * 1e8);
  else if (len < 8 && len >= 6) return String(20 * 1e8);
  else if (len < 6 && len >= 4) return String(25 * 1e8);
  else return "0";
};

class NsScreenVM {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get calcPrice() {
    let len = this.name.length;
    if (len >= 8) return String(15 * 1e8);
    else if (len < 8 && len >= 6) return String(20 * 1e8);
    else if (len < 6 && len >= 4) return String(25 * 1e8);
    else return "0";
  }

  previewModalOpened: boolean = false;
  setPreviewModalOpened = (state: boolean) => (this.previewModalOpened = state);

  color: string = Object.keys(labelColorMap)[0];
  setColor = (color: string) => (this.color = color);

  colorIndex: number = 0;
  setColorIndex = (color: number) => (this.colorIndex = color);

  name: string = "";
  setName = (name: string) => (this.name = name);

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
    // if (link == null) {
    //   //todo handle error
    //   return;
    // }
    // const tx = await this.rootStore.accountStore.invoke({
    //   dApp: "3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG",
    //   payment: [
    //     {
    //       assetId: "WAVES",
    //       amount: calcPrice(this.name).toString(),
    //     },
    //   ],
    //   call: {
    //     function: "mint",
    //     args: [
    //       { type: "string", value: this.name },
    //       { type: "string", value: link },
    //     ],
    //   },
    // });
  };
}
