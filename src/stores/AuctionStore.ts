import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";
import nodeService from "@src/services/nodeService";
import { AUCTION } from "@src/constants";

export type TAuction = {
  id: string;
  phase: string;
  bidStart: string;
  revealStart: string;
  auctionEnd: string;
};

export default class TokenStore {
  public rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.fetchAuction().then(this.setAuction);
    setInterval(() => this.fetchAuction().then(this.setAuction), 60 * 1000);
  }

  auction: TAuction | null = null;
  private setAuction = (a: TAuction) => (this.auction = a);

  fetchAuction = async (): Promise<TAuction> => {
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
}
