import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

interface AppData {
  app: {
    pageData: {};
    pageStatus: {};
    pageQuery: {};
    pageTempData: {};
  };
}

interface AppFunc {
  updateApp: (draft: (next: AppData["app"]) => void) => void;
}

const useAppStore = create<AppStore>()(
  // devtools(
  // persist(
  immer((set, get, api) => {
    return {
      app: {
        pageData: {},
        pageStatus: {},
        pageQuery: {},
        pageTempData: {},
      },
      updateApp: (fn) => set((draft) => fn(draft.app)),
    };
  }),
  // { name: "useAppStore" },
  // ),
  // { name: "useAppStore" },
  // ),
);

export type AppStore = AppData & AppFunc;

export default useAppStore;
