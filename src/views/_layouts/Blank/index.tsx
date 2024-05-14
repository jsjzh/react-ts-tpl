import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";

interface IProps {}

const LayoutBlank: React.FC<IProps> = (props) => {
  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  return (
    <PageWrapper>
      <div>LayoutBlank</div>
    </PageWrapper>
  );
};

export default LayoutBlank;
