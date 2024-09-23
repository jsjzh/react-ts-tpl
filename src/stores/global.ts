import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { devtools, persist } from "zustand/middleware";

export interface GlobalData {
  Global: {
    pageData: {};
    pageStatus: {};
    pageQuery: {};
    pageTempData: {};
  };
}

export interface GlobalFunc {
  updateGlobal: (draft: (next: GlobalData["Global"]) => void) => void;
}

const useGlobalStore = create<GlobalStore>()(
  // devtools(
  // persist(
  immer((set, get, api) => {
    return {
      Global: {
        pageData: {},
        pageStatus: {},
        pageQuery: {},
        pageTempData: {},
      },
      updateGlobal: (fn) => set((draft) => fn(draft.Global)),
    };
  }),
  // { name: "useGlobalStore" },
  // ),
  // { name: "useGlobalStore" },
  // ),
);

export type GlobalStore = GlobalData & GlobalFunc;

export default useGlobalStore;
