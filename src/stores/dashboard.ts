import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { devtools, persist } from "zustand/middleware";

interface DashboardData {
  Home: {
    pageData: {};
    pageStatus: {};
    pageQuery: {};
    pageTempData: {};
  };
  Todo: {
    pageData: {};
    pageStatus: {};
    pageQuery: {};
    pageTempData: {};
  };
}

interface DashboardFunc {
  updateHome: (draft: (next: DashboardData["Home"]) => void) => void;
  updateTodo: (draft: (next: DashboardData["Todo"]) => void) => void;
}

const useDashboardStore = create<DashboardStore>()(
  // devtools(
  // persist(
  immer((set, get, api) => {
    return {
      Home: {
        pageData: {},
        pageStatus: {},
        pageQuery: {},
        pageTempData: {},
      },
      updateHome: (fn) => set((draft) => fn(draft.Home)),

      Todo: {
        pageData: {},
        pageStatus: {},
        pageQuery: {},
        pageTempData: {},
      },
      updateTodo: (fn) => set((draft) => fn(draft.Todo)),
    };
  }),
  // { name: "useDashboardStore" },
  // ),
  // { name: "useDashboardStore" },
  // ),
);

export type DashboardStore = DashboardData & DashboardFunc;

export default useDashboardStore;
