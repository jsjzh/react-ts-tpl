import SModal from "@/components/SModal";
import { withGlobalStore, withGlobalStoreProps, withPerformance } from "@/hoc";
import { pipe } from "ramda";
import React from "react";
import { useImmer } from "use-immer";

interface IProps extends withGlobalStoreProps {
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;

  current?: API.User;
}

const HomeModal: React.FC<IProps> = (props) => {
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
      title="HomeModal"
      maskClosable={false}
      keyboard={false}
      open={props.open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      HomeModal
    </SModal>
  );
};

const withHOC = pipe(withPerformance, withGlobalStore);

export default withHOC(HomeModal);