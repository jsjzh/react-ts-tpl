import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import { useDashboardStore, useGlobalStore } from "@/stores";
import TodoDetail from "./_components/Detail";
import { Button } from "antd";

interface IProps {}

const Todo: React.FC<IProps> = (props) => {
  const { gdb } = useGlobalStore((state) => ({ gdb: state.Global }));
  const { db, update } = useDashboardStore((state) => ({
    db: state.Todo,
    update: state.updateTodo,
  }));
  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{ showDetailModal: boolean }>(
    { showDetailModal: false },
  );
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  return (
    <PageWrapper>
      <Button
        onClick={() => {
          updatePageStatus((draft) => {
            draft.showDetailModal = true;
          });
        }}
      >
        show detail
      </Button>

      <TodoDetail
        open={pageStatus.showDetailModal}
        onOk={() => {
          updatePageStatus((draft) => {
            draft.showDetailModal = false;
          });
        }}
        onCancel={() => {
          updatePageStatus((draft) => {
            draft.showDetailModal = false;
          });
        }}
      />
    </PageWrapper>
  );
};

export default Todo;
