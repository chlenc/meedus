import { ISerializedRootStore } from "@stores/RootStore";
import { saveAs } from "file-saver";

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

export const backupBids = () => {
  const str = JSON.stringify(loadState("meedus-bid-backup") ?? []);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, "meedus-backup.json");
};
