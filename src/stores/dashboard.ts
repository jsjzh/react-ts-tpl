import { createInitPageData, createInitPageQuery } from "@/shared/utils";
import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface DashboardData {
  Home: {
    pageData: {
      dataSource: BASE.PaginationResp<API.User>;
    };
    pageStatus: {
      isLoading: boolean;
      showModal: boolean;
    };
    pageQuery: {
      select?: string | number;
      pageNo: number;
      pageSize: number;
    };
    pageTempData: {
      current?: API.User;
      options: { label: string; value: string | number }[];
    };
  };
}

interface DashboardFunc {
  updateHome: (draft: (next: DashboardData["Home"]) => void) => void;
}

const useDashboardStore = create<DashboardStore>()(
  // devtools(
  // persist(
  immer((set, get, api) => {
    return {
      Home: {
        pageData: {
          dataSource: createInitPageData(),
        },
        pageStatus: {
          isLoading: false,
          showModal: false,
        },
        pageQuery: {
          ...createInitPageQuery({ select: undefined }),
        },
        pageTempData: {
          current: undefined,
          options: [
            { label: "foo", value: "foo" },
            { label: "bar", value: "bar" },
          ],
        },
      },
      updateHome: (fn) => set((draft) => fn(draft.Home)),
    };
  }),
  // { name: "useDashboardStore" },
  // ),
  // { name: "useDashboardStore" },
  // ),
);

export type DashboardStore = DashboardData & DashboardFunc;

export default useDashboardStore;
