import { appAPI } from "@/api";
import SRow from "@/components/SRow";
import { SSelect } from "@/components/forms";
import {
  withForm,
  withFormProps,
  withGlobalStore,
  withGlobalStoreProps,
  withPerformance,
} from "@/hoc";
import { createInitPageData } from "@/shared/utils";
import { useTemplateStore } from "@/stores";
import { useDebounceFn } from "ahooks";
import { Button, Form, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { pipe } from "ramda";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import ModalTemplate from "./ModalTemplate";

interface IForms {
  name?: string | number;
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

    appAPI
      .getUsers({
        name: props.form.getFieldValue("name"),
        pageNo: props.form.getFieldValue("pageNo"),
        pageSize: props.form.getFieldValue("pageSize"),
      })
      .then((data) => {
        update((draft) => {
          draft.pageData.dataSource = data;
        });
      })
      .catch(() => {
        update((draft) => {
          draft.pageData.dataSource = createInitPageData();
        });
      })
      .finally(() => {
        update((draft) => {
          draft.pageQuery = props.form.getFieldsValue();
          draft.pageStatus.isLoading = false;
        });
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

  const columns: ColumnsType<API.User> = [
    { title: "id", dataIndex: "id" },
    { title: "name", dataIndex: "name" },
    { title: "age", dataIndex: "age" },
    {
      title: "controller",
      dataIndex: "controller",
      render: (_, record) => (
        <Button
          onClick={() => {
            update((draft) => {
              draft.pageStatus.showModal = true;
              draft.pageTempData.current = record;
            });
          }}
        >
          edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Form form={props.form} onValuesChange={onValuesChange}>
        <SRow>
          <SSelect name="name" label="name" options={db.pageTempData.options} />
        </SRow>
      </Form>

      <Table
        rowKey="id"
        loading={db.pageStatus.isLoading}
        columns={columns}
        dataSource={db.pageData.dataSource.items}
        pagination={{
          showSizeChanger: false,
          current: db.pageData.dataSource.pageNo,
          pageSize: db.pageData.dataSource.pageSize,
          total: db.pageData.dataSource.totalSize,
        }}
        onChange={(pagination, filters, sorter, extra) => {
          if (extra.action === "paginate") {
            props.form.setFieldsValue({ pageNo: pagination.current });
            fetchPageData();
          }
        }}
      />

      {db.pageStatus.showModal && (
        <ModalTemplate
          open={db.pageStatus.showModal}
          current={db.pageTempData.current}
          onOk={() => {
            update((draft) => {
              draft.pageStatus.showModal = false;
              draft.pageTempData.current = undefined;
            });
            props.form.setFieldsValue({ pageNo: 1 });
            fetchPageData();
          }}
          onCancel={() => {
            update((draft) => {
              draft.pageStatus.showModal = false;
              draft.pageTempData.current = undefined;
            });
          }}
        />
      )}
    </>
  );
};

const withHOC = pipe(withPerformance, withGlobalStore, withForm);

export default withHOC(PageTemplate);
