import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import wavesCapService, { IDappResponse } from "@src/services/wavescapService";
import BN from "@src/utils/BN";

const ctx = React.createContext<RankingScreenVM | null>(null);

export const RankingScreenVMProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(() => new RankingScreenVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useRankingScreenVM = () => useVM(ctx);

class RankingScreenVM {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.sync();
  }

  get tags() {
    return this.dappsStats.reduce(
      (acc, stat) => [...acc, ...stat.tags.filter((t) => !acc.includes(t))],
      [] as string[]
    );
  }

  dappsStats: IDappResponse[] = [];
  private setDappsStats = (v: IDappResponse[]) => (this.dappsStats = v);
  private sync = async () => {
    const stats = await wavesCapService.getAllDappsStats();
    this.setDappsStats(
      stats.filter(
        (s) =>
          s.totals["usd-n"] != null &&
          new BN(s.totals["usd-n"]).gt(1000) &&
          s.url != null &&
          s.unique_interacting_addresses_7d > 1
      )
    );
  };
}
