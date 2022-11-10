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
  setLoading = (v: boolean) => (this.loading = v);

  tab = 0;
  setTab = (v: number) => (this.tab = v);

  search = "";
  setSearch = (v: string) => (this.search = v);

  private _badges: TBadge[] = [];
  private fetchBadges = () =>
    fetchBadges().then((badges) => (this._badges = badges));

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

  private progress: TCheckResult[] = [];
  private setProgress = (p: TCheckResult[]) => (this.progress = p);
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.fetchBadges().then(() => this.setLoading(false));
    when(
      () => rootStore.accountStore.address != null,
      () =>
        rootStore.accountStore.address &&
        fetchProgress(rootStore.accountStore.address).then(this.setProgress)
    );
  }
}
