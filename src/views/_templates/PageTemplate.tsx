import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import { useGlobalStore } from "@/stores";

interface IProps {}

const PageTemplate: React.FC<IProps> = (props) => {
  const { gdb } = useGlobalStore((state) => ({ gdb: state.Global }));

  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  return (
    <PageWrapper>
      <div>PageTemplate</div>
    </PageWrapper>
  );
};

export default PageTemplate;
