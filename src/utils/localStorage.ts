import { ISerializedRootStore } from "@stores/RootStore";

export const loadState = (key?: string): ISerializedRootStore | undefined => {
  try {
    const state = JSON.parse(
      localStorage.getItem(key ?? "meedus-store") as string
    );
    return state || undefined;
  } catch (error) {
    console.dir(error);
    return undefined;
  }
};
export const saveState = (state: ISerializedRootStore, key?: string): void => {
  localStorage.setItem(key ?? "meedus-store", JSON.stringify(state));
};
