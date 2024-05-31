import React from "react";
import { useImmer } from "use-immer";
import SModal from "@/components/SModal";

interface IProps {
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

const TodoDetail: React.FC<IProps> = (props) => {
  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  const handleOk = () => {
    props.onOk && props.onOk();
  };
  const handleCancel = () => {
    props.onCancel && props.onCancel();
  };

  return (
    <SModal
      title="TodoDetail"
      maskClosable={false}
      keyboard={false}
      open={props.open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      TodoDetail
    </SModal>
  );
};

export default TodoDetail;
