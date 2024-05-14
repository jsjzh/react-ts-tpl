import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";

interface IProps {}

const LayoutContainer: React.FC<IProps> = (props) => {
  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  return (
    <PageWrapper>
      <div>LayoutContainer</div>
    </PageWrapper>
  );
};

export default LayoutContainer;
