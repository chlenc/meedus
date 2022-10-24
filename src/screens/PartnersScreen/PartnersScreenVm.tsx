import React, { PropsWithChildren, useMemo } from "react";
import useVM from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";

const ctx = React.createContext<PartnersScreenVm | null>(null);

export const PartnersScreenVMProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(() => new PartnersScreenVm(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const usePartnersScreenVM = () => useVM(ctx);

class PartnersScreenVm {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }
}
