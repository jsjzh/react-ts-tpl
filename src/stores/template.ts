import { createInitPageData, createInitPageQuery } from "@/shared/utils";
import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ITemplateData {
  PageTemplate: {
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

interface IITemplateFunc {
  updatePageTemplate: (
    draft: (next: ITemplateData["PageTemplate"]) => void,
  ) => void;
}

const useTemplateStore = create<TemplateStore>()(
  // devtools(
  // persist(
  immer((set, get, api) => {
    return {
      PageTemplate: {
        pageData: {
          dataSource: createInitPageData(),
        },
        pageStatus: {
          isLoading: false,
          showModal: false,
        },
        pageQuery: { ...createInitPageQuery({ select: undefined }) },
        pageTempData: {
          current: undefined,
          options: [
            { label: "foo", value: "foo" },
            { label: "bar", value: "bar" },
          ],
        },
      },
      updatePageTemplate: (fn) => set((draft) => fn(draft.PageTemplate)),
    };
  }),
  // { name: "useTemplateStore" },
  // ),
  // { name: "useTemplateStore" },
  // ),
);

export default useTemplateStore;

export type TemplateStore = ITemplateData & IITemplateFunc;
