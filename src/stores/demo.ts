import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

interface DemoData {
  Demo: {
    pageData: {};
    pageStatus: {};
    pageQuery: {};
    pageTempData: {};
  };
}

interface DemoFunc {
  updateDemo: (draft: (next: DemoData["Demo"]) => void) => void;
}

const useDemoStore = create<DemoStore>()(
  // devtools(
  // persist(
  immer((set, get, api) => {
    return {
      Demo: {
        pageData: {},
        pageStatus: {},
        pageQuery: {},
        pageTempData: {},
      },
      updateDemo: (fn) => set((draft) => fn(draft.Demo)),
    };
  }),
  // { name: "useDemoStore" },
  // ),
  // { name: "useDemoStore" },
  // ),
);

export type DemoStore = DemoData & DemoFunc;

export default useDemoStore;
