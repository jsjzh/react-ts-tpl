import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import { useParams } from "react-router-dom";

interface IProps {}

const TodoDetail: React.FC<IProps> = (props) => {
  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  const params = useParams();

  return (
    <PageWrapper>
      <div>TodoDetail</div>
    </PageWrapper>
  );
};

export default TodoDetail;
