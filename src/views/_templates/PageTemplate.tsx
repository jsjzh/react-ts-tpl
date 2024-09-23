import SSelectPro from "@/components/forms/baseComponents/SSelectPro";
import PageWrapper from "@/components/PageWrapper";
import SRow from "@/components/SRow";
import {
  withForm,
  withFormProps,
  withGlobalStore,
  withGlobalStoreProps,
  withPerformance,
} from "@/hoc";
import { useTemplateStore } from "@/stores";
import { useDebounceFn } from "ahooks";
import { Form } from "antd";
import { pipe } from "ramda";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";

interface IForms {
  select?: string | number;
  pageNo: number;
  pageSize: number;
}

interface IProps extends withGlobalStoreProps, withFormProps<IForms> {}

const PageTemplate: React.FC<IProps> = (props) => {
  const { db, update } = useTemplateStore((state) => ({
    db: state.PageTemplate,
    update: state.updatePageTemplate,
  }));

  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  const fetchPageData = () => {
    update((draft) => {
      draft.pageStatus.isLoading = true;
    });
  };

  const _onValuesChange = (_: Partial<IForms>, values: IForms) => {
    fetchPageData();
  };

  const { run: onValuesChange } = useDebounceFn(_onValuesChange, {
    wait: 300,
  });

  useEffect(() => {
    props.form.setFieldsValue(db.pageQuery);
    fetchPageData();
  }, []);

  return (
    <PageWrapper>
      <Form form={props.form} onValuesChange={onValuesChange}>
        <SRow>
          <SSelectPro
            name="select"
            label="下拉选择"
            options={db.pageTempData.options}
          />
        </SRow>
      </Form>
    </PageWrapper>
  );
};

const withHOC = pipe(withPerformance, withGlobalStore, withForm);

export default withHOC(PageTemplate);
