import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";

const ctx = React.createContext<SwapScreenVM | null>(null);

export const SwapScreenVMProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(() => new SwapScreenVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useSwapScreenVM = () => useVM(ctx);

class SwapScreenVM {
  assetId0: string = "WAVES";
  setAsset0 = (v: string) => (this.assetId0 = v);

  asset0Value: BN = BN.parseUnits(1, 8);
  setAsset0Value = (v: BN) => (this.asset0Value = v);

  assetId1: string = "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p";
  setAsset1 = (v: string) => (this.assetId0 = v);

  get asset1Value() {
    const asset0Amount = BN.formatUnits(
      this.asset0Value,
      this.asset0Stats?.decimals
    );
    return BN.parseUnits(
      this.asset0Stats?.currentPrice.times(asset0Amount) ?? BN.ZERO,
      this.asset1Stats?.decimals
    );
  }

  get asset0Stats() {
    return this.rootStore.tokenStore.statistics.find(
      (stats) => stats.assetId === this.assetId0
    );
  }

  get asset1Stats() {
    return this.rootStore.tokenStore.statistics.find(
      (stats) => stats.assetId === this.assetId1
    );
  }

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }
}
