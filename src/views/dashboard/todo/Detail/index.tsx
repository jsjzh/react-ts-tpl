import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import { useDashboardStore } from "@/stores";

interface IProps {}

const TodoDetail: React.FC<IProps> = (props) => {
  const { db, update } = useDashboardStore((state) => ({
    db: state.Todo,
    update: state.updateTodo,
  }));

  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  return (
    <PageWrapper>
      <div>TodoDetail</div>
    </PageWrapper>
  );
};

export default TodoDetail;