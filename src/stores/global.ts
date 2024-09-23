import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface GlobalData {
  breadcrumbData: { title: string; href?: string; onClick?: () => void }[];
}

export interface GlobalFunc {
  updateGlobal: (draft: (next: GlobalData) => void) => void;
}

const useGlobalStore = create<GlobalStore>()(
  // devtools(
  // persist(
  immer((set, get, api) => {
    return {
      breadcrumbData: [],
      updateGlobal: (fn) => set((draft) => fn(draft)),
    };
  }),
  // { name: "useGlobalStore" },
  // ),
  // { name: "useGlobalStore" },
  // ),
);

export type GlobalStore = GlobalData & GlobalFunc;

export default useGlobalStore;
