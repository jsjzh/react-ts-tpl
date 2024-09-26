import SModal from "@/components/SModal";
import {
  withForm,
  withFormProps,
  withGlobalStore,
  withGlobalStoreProps,
  withPerformance,
} from "@/hoc";
import { pipe } from "ramda";
import React from "react";
import { useImmer } from "use-immer";

interface IForms {
  name?: string | number;
  pageNo: number;
  pageSize: number;
}

interface IProps extends OProps, withGlobalStoreProps, withFormProps<IForms> {}

const ModalTemplate: React.FC<IProps> = (props) => {
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
      title="ModalTemplate"
      maskClosable={false}
      keyboard={false}
      open={props.open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      ModalTemplate
    </SModal>
  );
};

interface OProps {
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;

  current?: API.User;
}

const withHOC = pipe(withPerformance, withGlobalStore, withForm);

export default withHOC(ModalTemplate) as any as React.FC<OProps>;
