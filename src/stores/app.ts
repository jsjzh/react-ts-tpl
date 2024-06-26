import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

interface AppData {
  App: {
    pageData: {};
    pageStatus: {};
    pageQuery: {};
    pageTempData: {};
  };
}

interface AppFunc {
  updateApp: (draft: (next: AppData["App"]) => void) => void;
}

const useAppStore = create<AppStore>()(
  // devtools(
  // persist(
  immer((set, get, api) => {
    return {
      App: {
        pageData: {},
        pageStatus: {},
        pageQuery: {},
        pageTempData: {},
      },
      updateApp: (fn) => set((draft) => fn(draft.App)),
    };
  }),
  // { name: "useAppStore" },
  // ),
  // { name: "useAppStore" },
  // ),
);

export type AppStore = AppData & AppFunc;

export default useAppStore;
