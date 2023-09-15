import RootStore from "@stores/RootStore";
import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import { NODE_URL } from "@src/constants";
import { autorun, makeAutoObservable, reaction } from "mobx";
import { getCurrentBrowser } from "@src/utils/getCurrentBrowser";
import { nodeInteraction, waitForTx } from "@waves/waves-transactions";
import { toast } from "react-toastify";
import Balance from "@src/entities/Balance";
import nodeService from "@src/services/nodeService";
import BN from "@src/utils/BN";

export enum LOGIN_TYPE {
  SIGNER_SEED = "SIGNER_SEED",
  SIGNER_EMAIL = "SIGNER_EMAIL",
  KEEPER = "KEEPER",
}

export interface IInvokeTxParams {
  fee?: number;
  dApp: string;
  payment: Array<{ assetId: string; amount: string }>;
  call: {
    function: string;
    args: Array<{ type: "integer" | "string"; value: string }>;
  };
}

// export interface ITransferParams {
//   recipient: string;
//   amount: string;
//   assetId?: string;
//   attachment?: string;
//   feeAssetId?: string;
// }

export interface ISerializedAccountStore {
  address: string | null;
  loginType: LOGIN_TYPE | null;
}

class AccountStore {
  public readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  isAccScripted = false;
  setIsAccScripted = (v: boolean) => (this.isAccScripted = v);

  isWavesKeeperInstalled = false;
  setWavesKeeperInstalled = (state: boolean) =>
    (this.isWavesKeeperInstalled = state);

  assetsBalancesLoading = false;
  setAssetsBalancesLoading = (state: boolean) =>
    (this.assetsBalancesLoading = state);

  loginModalOpened: boolean = false;
  setLoginModalOpened = (state: boolean) => (this.loginModalOpened = state);

  // walletModalOpened: boolean = false;
  // setWalletModalOpened = (state: boolean) => (this.walletModalOpened = state);
  //
  // sendAssetModalOpened: boolean = false;
  // setSendAssetModalOpened = (state: boolean) =>
  //   (this.sendAssetModalOpened = state);

  // assetToSend: Balance | null = null;
  // setAssetToSend = (state: Balance | null) => (this.assetToSend = state);
  //
  // changePoolModalOpened: boolean = false;
  // setChangePoolModalOpened = (state: boolean) =>
  //   (this.changePoolModalOpened = state);
  //
  public assetBalances: Balance[] | null = null;
  setAssetBalances = (assetBalances: Balance[] | null) =>
    (this.assetBalances = assetBalances);
  //
  // findBalanceByAssetId = (assetId: string) =>
  //   this.assetBalances &&
  //   this.assetBalances.find((balance) => balance.assetId === assetId);

  public address: string | null = null;
  setAddress = (address: string | null) => (this.address = address);

  public loginType: LOGIN_TYPE | null = null;
  setLoginType = (loginType: LOGIN_TYPE | null) => (this.loginType = loginType);

  public signer: Signer | null = null;
  setSigner = (signer: Signer | null) => (this.signer = signer);

  get isBrowserSupportsWavesKeeper(): boolean {
    const browser = getCurrentBrowser();
    return ["chrome", "firefox", "opera", "edge"].includes(browser);
  }

  setupSynchronizationWithKeeper = () =>
    new Promise((resolve, reject) => {
      let attemptsCount = 0;
      const interval = setInterval(async () => {
        if ((window as any).WavesKeeper == null) {
          attemptsCount = attemptsCount + 1;
          if (attemptsCount > 10) {
            clearInterval(interval);
            reject("❌ There is no waves keeper");
          }
        } else {
          clearInterval(interval);
        }

        const result = await (window as any).WavesKeeper.initialPromise
          .then((keeperApi: any) => keeperApi.publicState())
          .then(() => this.subscribeToKeeperUpdate())
          .catch(
            ({ code }: { code: string }) =>
              code === "14" && this.subscribeToKeeperUpdate()
          );
        resolve(result);
      }, 500);
    });

  checkScriptedAccount = async () => {
    const { address } = this;
    if (address == null) return;
    const res = await nodeInteraction.scriptInfo(address, NODE_URL);
    this.setIsAccScripted(res.script != null);
  };

  login = async (loginType: LOGIN_TYPE) => {
    this.setLoginType(loginType);
    switch (loginType) {
      case LOGIN_TYPE.KEEPER:
        this.setSigner(new Signer());
        await this.setupSynchronizationWithKeeper();
        // const authData = { data: "you know what is the main reason" };
        // await this.signer?.setProvider(new ProviderKeeper(authData));
        await this.signer?.setProvider(new ProviderKeeper());
        break;
      case LOGIN_TYPE.SIGNER_EMAIL:
        this.setSigner(new Signer());
        await this.signer?.setProvider(new ProviderCloud());
        break;
      case LOGIN_TYPE.SIGNER_SEED:
        this.setSigner(new Signer({ NODE_URL: NODE_URL }));
        const provider = new ProviderWeb("https://waves.exchange/signer/");
        await this.signer?.setProvider(provider);
        break;
      default:
        return;
    }
    const loginData = await this.signer?.login();
    this.setAddress(loginData?.address ?? null);
  };

  logout() {
    this.setAddress(null);
    this.setLoginType(null);
  }

  setupWavesKeeper = () => {
    let attemptsCount = 0;

    autorun(
      (reaction) => {
        if (attemptsCount === 2) {
          reaction.dispose();
        } else if ((window as any).WavesKeeper) {
          reaction.dispose();
          this.setWavesKeeperInstalled(true);
        } else {
          attemptsCount += 1;
        }
      },
      { scheduler: (run) => setInterval(run, 5 * 1000) }
    );
  };

  subscribeToKeeperUpdate = () =>
    (window as any).WavesKeeper.on("update", (publicState: any) =>
      this.setAddress(publicState.account?.address ?? null)
    );

  serialize = (): ISerializedAccountStore => ({
    address: this.address,
    loginType: this.loginType,
  });

  updateAccountAssets = async (force = false) => {
    if (this.address == null) {
      this.setAssetBalances([]);
      return;
    }
    if (!force && this.assetsBalancesLoading) return;
    this.setAssetsBalancesLoading(true);

    const address = this.address;
    // const data = await nodeService.getAddressBalances(address);
    // const assetBalances = TOKENS_LIST.map((asset) => {
    //   const t = data.find(({ assetId }) => asset.assetId === assetId);
    //   const balance = new BN(t != null ? t.balance : 0);
    //   return new Balance({ balance, ...asset });
    // });
    const newAddress = this.address;
    if (address !== newAddress) return;

    // this.setAssetBalances(assetBalances);
    this.setAssetsBalancesLoading(false);
  };

  ///------------------transfer
  // public transfer = async (trParams: ITransferParams) =>
  //   this.loginType === LOGIN_TYPE.KEEPER
  //     ? this.transferWithKeeper(trParams)
  //     : this.transferWithSigner(trParams);
  //
  // private transferWithSigner = async (
  //   data: ITransferParams
  // ): Promise<string | null> => {
  //   if (this.signer == null) {
  //     await this.login(this.loginType ?? LOGIN_TYPE.SIGNER_EMAIL);
  //   }
  //   if (this.signer == null) {
  //     this.rootStore.notificationStore.notify("You need to login firstly", {
  //       title: "Error",
  //       type: "error",
  //     });
  //     return null;
  //   }
  //   try {
  //     const ttx = this.signer.transfer({
  //       ...data,
  //       fee: this.isAccScripted ? 500000 : 100000,
  //     });
  //     const txId = await ttx.broadcast().then((tx: any) => tx.id);
  //     await waitForTx(txId, {
  //       apiBase: NODE_URL,
  //     });
  //     return txId;
  //   } catch (e: any) {
  //     console.warn(e);
  //     this.rootStore.notificationStore.notify(e.toString(), {
  //       type: "error",
  //       title: "Transaction is not completed",
  //     });
  //     return null;
  //   }
  // };
  //
  // private transferWithKeeper = async (
  //   data: ITransferParams
  // ): Promise<string | null> => {
  //   const tokenAmount = BN.formatUnits(
  //     data.amount,
  //     this.assetToSend?.decimals
  //   ).toString();
  //   const tx = await (window as any).WavesKeeper.signAndPublishTransaction({
  //     type: 4,
  //     data: {
  //       amount: { tokens: tokenAmount, assetId: data.assetId },
  //       fee: {
  //         tokens: this.isAccScripted ? "0.005" : "0.001",
  //         assetId: "WAVES",
  //       },
  //       recipient: data.recipient,
  //     },
  //   } as any);
  //
  //   const txId = JSON.parse(tx).id;
  //   await waitForTx(txId, {
  //     apiBase: NODE_URL,
  //   });
  //   return txId;
  // };

  ///////////------------invoke

  public invoke = async (txParams: IInvokeTxParams) =>
    this.loginType === LOGIN_TYPE.KEEPER
      ? this.invokeWithKeeper(txParams)
      : this.invokeWithSigner(txParams);

  private invokeWithSigner = async (
    txParams: IInvokeTxParams
  ): Promise<string | null> => {
    if (this.signer == null) {
      await this.login(this.loginType ?? LOGIN_TYPE.SIGNER_EMAIL);
    }
    if (this.signer == null) {
      toast.error("You need to login firstly");
      return null;
    }
    const ttx = this.signer.invoke({
      dApp: txParams.dApp,
      fee:
        txParams.fee != null
          ? txParams.fee
          : this.isAccScripted
          ? 900000
          : 500000,
      payment: txParams.payment,
      call: txParams.call,
    });

    const txId = await ttx.broadcast().then((tx: any) => tx.id);
    await waitForTx(txId, {
      apiBase: NODE_URL,
    });
    return txId;
  };

  private invokeWithKeeper = async (
    txParams: IInvokeTxParams
  ): Promise<string | null> => {
    const data = {
      fee: {
        assetId: "WAVES",
        amount:
          txParams.fee != null
            ? txParams.fee
            : this.isAccScripted
            ? 900000
            : 500000,
      },
      dApp: txParams.dApp,
      call: txParams.call,
      payment: txParams.payment,
    };
    const tx = await (window as any).WavesKeeper.signAndPublishTransaction({
      type: 16,
      data,
    } as any);

    const txId = JSON.parse(tx).id;
    await waitForTx(txId, {
      apiBase: NODE_URL,
    });
    return txId;
  };
}

export default AccountStore;
