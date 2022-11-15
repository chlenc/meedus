import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import {
  fetchBadges,
  fetchProgress,
  TBadge,
  TCheckResult,
  TCheckScriptResult,
} from "@src/services/badgesService";
import { CORE } from "@src/constants";
import { toast } from "react-toastify";
import { IInvokeTxParams } from "@stores/AccountStore";
import { Nullable } from "tsdef";
import makeNodeRequest from "@src/utils/makeNodeRequest";
import { IData } from "@src/utils/getStateByKey";

const ctx = React.createContext<AchievementsScreenVm | null>(null);

export const AchievementsScreenVMProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(() => new AchievementsScreenVm(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useAchievementsScreenVM = () => useVM(ctx);

class AchievementsScreenVm {
  loading = true;
  private setLoading = (v: boolean) => (this.loading = v);

  updateLoading = false;
  private setUpdateLoading = (v: boolean) => (this.updateLoading = v);

  tab = 0;
  setTab = (v: number) => (this.tab = v);

  search = "";
  setSearch = (v: string) => (this.search = v);

  mintingId: Nullable<string> = null;
  setMintingId = (id: Nullable<string>) => (this.mintingId = id);

  mintedDates: Record<string, number> = {};
  setMintedDates = (v: Record<string, number>) => (this.mintedDates = v);

  private _badges: TBadge[] = [];
  private fetchBadges = () =>
    fetchBadges().then((badges) => (this._badges = badges));

  private fetchMintedDates = async () => {
    const { address } = this.rootStore.accountStore;
    if (address == null) return {};
    const req = `/addresses/data/${CORE}?matches=${address}_dateOf_(.*)`;
    const { data } = await makeNodeRequest(req);
    return (data as IData[]).reduce(
      (acc, { key, value }) => ({
        ...acc,
        [key.split("_")[2]]: value as number,
      }),
      {} as Record<string, number>
    );
  };

  get badges(): Array<TBadge & { progress?: TCheckScriptResult }> {
    return this._badges.map((badge) => {
      const p = this.progress.find((p) => p.badgeId === badge.id)?.scriptResult;
      return { ...badge, progress: p };
    });
  }

  get unlockedBadges() {
    return this.badges.filter(
      (b) =>
        b.progress != null &&
        b.progress.actualActionValue >= b.progress.requiredActionValue
    );
  }

  get lockedBadges() {
    return this.badges.filter(
      (b) =>
        b.progress == null ||
        b.progress.actualActionValue < b.progress.requiredActionValue
    );
  }

  get filteredBadges() {
    let result = this.badges;
    if (this.tab === 1) result = this.unlockedBadges;
    if (this.tab === 2) result = this.lockedBadges;
    return result.filter(({ name }) =>
      name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  syncProgress = () => {
    const { address } = this.rootStore.accountStore;
    if (address == null || this.updateLoading) return;

    this.setUpdateLoading(true);
    return Promise.all([
      fetchProgress(address).then(this.setProgress),
      this.fetchMintedDates().then(this.setMintedDates),
    ]).finally(() => this.setUpdateLoading(false));
  };

  mint = async (id: string) => {
    this.setMintingId(id);
    const txParams = {
      dApp: CORE,
      payment: [{ assetId: "WAVES", amount: "10000000" }],
      call: { function: "mint", args: [{ type: "string", value: id }] },
    };
    const txId = await this.rootStore.accountStore
      .invoke(txParams as IInvokeTxParams)
      .then(this.syncProgress)
      .catch((e) => {
        console.error(e);
        toast.error(e.data ?? e.message ?? e.toString());
      })
      .finally(() => this.setMintingId(null));
    if (txId != null) {
      toast.success("Achievement was minted");
    }
  };

  private progress: TCheckResult[] = [];
  private setProgress = (p: TCheckResult[]) => (this.progress = p);
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.fetchBadges().then(() => this.setLoading(false));
    when(
      () => rootStore.accountStore.address != null && this.badges.length > 0,
      this.syncProgress
    );
  }
}
