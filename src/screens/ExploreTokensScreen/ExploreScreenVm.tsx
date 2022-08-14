import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import dayjs from "dayjs";
import { TTokenStatistics } from "@stores/TokenStore";
import BN from "@src/utils/BN";

const ctx = React.createContext<ExploreScreenVM | null>(null);

export const ExploreScreenVMProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(() => new ExploreScreenVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useExploreScreenVM = () => useVM(ctx);

export type TSortType = "price" | "change" | "volume";
export type TSortMode = "descending" | "ascending";

class ExploreScreenVM {
  // loading = true;
  // setLoading = (loading: boolean) => (this.loading = loading);

  search: string = "";
  setSearch = (v: string) => (this.search = v);

  sort: TSortType = "volume";
  setSort = (v: TSortType) => (this.sort = v);

  sortMode: TSortMode = "descending";
  setSortMode = (v: TSortMode) => (this.sortMode = v);

  selectSort = (v: TSortType) => {
    if (this.sort === v) {
      this.setSortMode(
        this.sortMode === "ascending" ? "descending" : "ascending"
      );
    } else {
      this.setSort(v);
      this.setSortMode("descending");
    }
  };

  get sortedStats() {
    return this.rootStore.tokenStore.statistics
      .slice()
      .filter((v) => !v.change24H.isNaN())
      .filter(
        (v) =>
          this.search === "" ||
          v.assetId.toLowerCase().includes(this.search.toLowerCase()) ||
          v.symbol.toLowerCase().includes(this.search.toLowerCase()) ||
          v.name.toLowerCase().includes(this.search.toLowerCase())
      )
      .sort((stats1, stats2) => {
        let key: keyof TTokenStatistics | undefined;
        if (this.sort === "change") key = "change24H";
        if (this.sort === "price") key = "currentPrice";
        if (this.sort === "volume") key = "volume24";
        if (key == null) return 0;

        if (stats1 == null && stats2 == null) return 0;
        if ((stats1[key] as BN).isNaN()) {
          return this.sortMode === "descending" ? 1 : -1;
        }
        if ((stats2[key] as BN).isNaN()) {
          return this.sortMode === "descending" ? -1 : 1;
        }
        if (stats1[key] == null && stats2[key] != null) {
          return this.sortMode === "descending" ? 1 : -1;
        }
        if (stats1[key] == null && stats2[key] == null) {
          return this.sortMode === "descending" ? -1 : 1;
        }
        return this.sortMode === "descending"
          ? (stats1[key] as BN).lt(stats2[key])
            ? 1
            : -1
          : (stats1[key] as BN).lt(stats2[key])
          ? -1
          : 1;
      });
  }

  get top3Gainers() {
    return this.rootStore.tokenStore.statistics
      .slice()
      .filter((v) => !v.change24H.isNaN())
      .sort((a, b) => (a.change24H.gt(b.change24H) ? -1 : 1))
      .slice(0, 3);
  }
  get recentlyAdded() {
    return this.rootStore.tokenStore.statistics
      .slice()
      .sort((a, b) => (dayjs(a.start).isAfter(b.start) ? -1 : 1))
      .slice(0, 3);
  }

  get top3Losers() {
    return this.rootStore.tokenStore.statistics
      .slice()
      .filter((v) => !v.change24H.isNaN())
      .sort((a, b) => (a.change24H.gt(b.change24H) ? 1 : -1))
      .slice(0, 3);
  }

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }
}
