import { makeAutoObservable } from "mobx";
import AccountStore, { ISerializedAccountStore } from "@stores/AccountStore";
import TokenStore, { ISerializedTokenStore } from "@stores/TokenStore";

export interface ISerializedRootStore {
  accountStore?: ISerializedAccountStore;
  tokenStore?: ISerializedTokenStore;
}

export default class RootStore {
  public accountStore: AccountStore;
  public tokenStore: TokenStore;

  constructor(initState?: ISerializedRootStore) {
    this.tokenStore = new TokenStore(this, initState?.tokenStore);
    this.accountStore = new AccountStore(this, initState?.accountStore);
    makeAutoObservable(this);
  }

  serialize = (): ISerializedRootStore => ({
    accountStore: this.accountStore.serialize(),
    tokenStore: this.tokenStore.serialize(),
  });
}
