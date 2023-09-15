import { makeAutoObservable } from "mobx";
import AccountStore from "@stores/AccountStore";
import AuctionStore from "@stores/AuctionStore";

export default class RootStore {
  public accountStore: AccountStore;
  public auctionStore: AuctionStore;

  constructor(_: any) {
    this.accountStore = new AccountStore(this);
    this.auctionStore = new AuctionStore(this);
    makeAutoObservable(this);
  }

  serialize = () => ({});
}
