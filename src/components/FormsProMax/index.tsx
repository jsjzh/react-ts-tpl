import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
import { Col, Form, FormInstance, Row } from "antd";
import { clone, curry, omit, pick } from "ramda";
import { useDebounceFn } from "ahooks";
import dayjs, { Dayjs } from "dayjs";
import { useImmer } from "use-immer";
import useSWRImmutable from "swr/immutable";

import SInput from "./components/SInput";
import SInputNumber from "./components/SInputNumber";
import SSelect from "./components/SSelect";
import SDatePicker from "./components/SDatePicker";
import STreeSelect from "./components/STreeSelect";
import SSelectSearch from "./components/SSelectSearch";
import SCheckbox from "./components/SCheckbox";

import { billingManagementAPI, resourceManagementAPI } from "@/api";
import { useGlobalStore } from "@/store";
import { formatTreeLikeData } from "@/shared/tree";
import SRow from "../SRow";
import SCol from "../SCol";

const curryPickObjToOption = curry(
  (format: { value: string; label: string }, data: { [k: string]: any }) => ({
    value: data[format.value],
    label: data[format.label],
  }),
);

export const pickIdAndCode = curryPickObjToOption({
  value: "id",
  label: "code",
});

export const pickIdAndName = curryPickObjToOption({
  value: "id",
  label: "name",
});

export const pickCodeAndName = curryPickObjToOption({
  value: "code",
  label: "name",
});

export const pickNodeIdAndNodeName = curryPickObjToOption({
  value: "businessNodeId",
  label: "businessNodeName",
});

const FormComponents = {
  SInput,
  SInputNumber,
  SSelect,
  SDatePicker,
  STreeSelect,
  SSelectSearch,
  SCheckbox,
};

interface IInitValues {
  businessUnitSelectSearch: number;
  titleInput: string;
  levelSelect: string;
  weightInputNumber: number;
  businessUnitInput: string;
  appCodeInput: string;
  appNameInput: string;
  gitUrlInput: string;
  appTypeInput: string;
  appTypeSelect: string;
  billingPeriodDatePicker: Dayjs;
  financialYearDatePicker: Dayjs;
  budgetBusinessSelectSearch: number;
  apportionLevelSelect: number;
  instanceInput: string;
  cloudSourceResourceSelect: string;
  cloudResourceTypeSelect: string;
  cloudProductTypeSelect: string;
  cloudResourceStatusSelect: string;
  customSourceResourceSelect: string;
  customSourceResourceInput: string;
  customResourceTypeInput: string;
  customResourceTypeSelect: string;
  showNoBindSelect: number;
  showNoBindCheckbox: boolean;
  expensesInputNumber: number;
  instanceSelectSearch: string;
  hierarchySelectSearch: number;
  businessUnitWithHierarchySelectSearch: number;
  billManageApportionModel: string;
  businessNodeTreeSTreeSelect: number;

  businessNodeLevelTwoSnapshotSelectSearch: number;
  businessUnitNodeSnapshotSelectSearch: number;

  applicationWithBusinessUnitSelectSearch: number;

  apportionCostTypeSelect: string;
  healthLevelsSelect: string;

  customResourceTypeSelectWithGlobal: string;
  [k: string]: any;
}

export type FormsOutputValues = Partial<IInitValues>;

interface IProps {
  formKey?: string;
  initialValues: Partial<IInitValues>;
  form?: FormInstance;

  layout?: "horizontal" | "vertical";
  formProps?: Record<string, any>;
  formItemProps?: { [k in keyof FormsOutputValues]: Record<string, any> };
  componentProps?: { [k in keyof FormsOutputValues]: Record<string, any> };
  querys?: { applicationWithBusinessUnitSelectSearch: { id: number } };
  colSpans?: { [k in keyof FormsOutputValues]: number };
  colExtends?: { [k in keyof FormsOutputValues]: ReactNode };
  onChange?: (values: FormsOutputValues) => void;

  style?: React.CSSProperties;
}

interface IItem {
  label: string;
  type: keyof typeof FormComponents;
  valueProp?: "checked" | "value";
  formItemProps?: Record<string, any>;
  componentProps?: Record<string, any>;
}

type ISN = string | number;

interface IOption {
  value: ISN;
  label: ISN;
}

type IOptions = IOption[];

type ITree = {
  value: ISN;
  title: string;
  children: ITree[];
}[];

const mapStateFromGlobal = omit(["currentUser", "isInit"]);

const FormsProMax: React.FC<IProps> = (props) => {
  const form = props.form ? props.form : Form.useForm()[0];

  const global = useGlobalStore(mapStateFromGlobal);

  const [formDatas, updateFormDatas] = useImmer<{
    businessUnitSelectSearch: { options: IOptions };
    instanceSelectSearch: { options: IOptions };
    cloudProductTypeSelect: { options: IOptions };
    customResourceTypeSelect: { options: IOptions };
    hierarchySelectSearch: { options: IOptions };
    businessUnitWithHierarchySelectSearch: { options: IOptions };
    budgetBusinessSelectSearchDataSource: { options: IOptions };
    businessNodeLevelTwoSnapshotSelectSearch: { options: IOptions };
    businessUnitNodeSnapshotSelectSearch: { options: IOptions };
    applicationWithBusinessUnitSelectSearch: { options: IOptions };
    customResourceTypeSelectWithGlobal: {
      handleCustomSourceResourceSelectChangeActive: string;
    };

    businessNodeTreeSTreeSelect: { treeData: ITree };
  }>({
    businessUnitSelectSearch: { options: [] },
    instanceSelectSearch: { options: [] },
    cloudProductTypeSelect: { options: [] },
    customResourceTypeSelect: { options: [] },
    hierarchySelectSearch: { options: [] },
    businessUnitWithHierarchySelectSearch: { options: [] },
    budgetBusinessSelectSearchDataSource: { options: [] },
    businessNodeLevelTwoSnapshotSelectSearch: { options: [] },
    businessUnitNodeSnapshotSelectSearch: { options: [] },
    applicationWithBusinessUnitSelectSearch: { options: [] },

    businessNodeTreeSTreeSelect: { treeData: [] },
    customResourceTypeSelectWithGlobal: {
      handleCustomSourceResourceSelectChangeActive: "",
    },
  });

  const hasValues = (keys: (keyof IInitValues)[]) =>
    keys.every((key) => Object.hasOwn(props.initialValues, key));

  useSWRImmutable(
    hasValues(["applicationWithBusinessUnitSelectSearch"]) &&
      !!props.querys!.applicationWithBusinessUnitSelectSearch.id && [
        "getApplicationsByBussinessUnitNodeId",
      ],
    ([_]) =>
      resourceManagementAPI.getApplicationsByBussinessUnitNodeId({
        ...props.querys!.applicationWithBusinessUnitSelectSearch,
        keyword: "",
        pageNo: 1,
        pageSize: 50,
      }),
    {
      onSuccess(data) {
        updateFormDatas((draft) => {
          const result = Array.isArray(data.items)
            ? data.items.map(pickIdAndCode)
            : [];

          draft.applicationWithBusinessUnitSelectSearch.options = result;
        });
      },
    },
  );

  useSWRImmutable(
    hasValues(["hierarchySelectSearch"]) && ["getBusinessNodeLevel"],
    ([_]) => billingManagementAPI.getBusinessNodeLevel({ level: 2 }),
    {
      onSuccess(data) {
        updateFormDatas((draft) => {
          draft.hierarchySelectSearch.options = data.map(pickIdAndName);
        });
      },
    },
  );

  useSWRImmutable(
    hasValues(["budgetBusinessSelectSearch"]) && [
      "getBillManageBudgetQueryBudgetList",
    ],
    ([_]) => billingManagementAPI.getBillManageBudgetQueryBudgetList({}),
    {
      onSuccess(data) {
        updateFormDatas((draft) => {
          draft.budgetBusinessSelectSearchDataSource.options = data.map(
            pickNodeIdAndNodeName,
          );
        });
      },
    },
  );

  useSWRImmutable(
    hasValues(["billingPeriodDatePicker", "businessNodeTreeSTreeSelect"]) && [
      "getBusinessNodeTreeSnapshot",
      props.formKey || "getBusinessNodeTreeSnapshot",
    ],
    ([_]) =>
      billingManagementAPI.getBusinessNodeTreeSnapshot({
        billingCycle:
          props.initialValues.billingPeriodDatePicker?.format("YYYY-MM")!,
      }),
    {
      onSuccess(data) {
        updateFormDatas((draft) => {
          if (!data) {
            draft.businessNodeTreeSTreeSelect.treeData = [];
          } else {
            const result: any = formatTreeLikeData([data], {
              value: "id",
              title: "name",
            })[0].children;

            draft.businessNodeTreeSTreeSelect.treeData = result;

            if (props.formItemProps?.businessNodeTreeSTreeSelect?.required) {
              form.setFieldValue(
                "businessNodeTreeSTreeSelect",
                result.length ? result[0].value : undefined,
              );

              handleChange();
            }
          }
        });
      },
    },
  );

  useSWRImmutable(
    hasValues([
      "billingPeriodDatePicker",
      "businessNodeLevelTwoSnapshotSelectSearch",
    ]) && ["getBusinessNodeTreeSnapshot"],
    ([_]) =>
      billingManagementAPI.getBusinessNodeLevelSnapshot({
        billingCycle:
          props.initialValues.billingPeriodDatePicker?.format("YYYY-MM")!,
        level: 2,
      }),
    {
      onSuccess(data) {
        updateFormDatas((draft) => {
          if (!data) {
            draft.businessNodeLevelTwoSnapshotSelectSearch.options = [];
          } else {
            const result = data.map(pickIdAndName);

            draft.businessNodeLevelTwoSnapshotSelectSearch.options = result;

            if (
              props.formItemProps?.businessNodeLevelTwoSnapshotSelectSearch
                ?.required
            ) {
              form.setFieldValue(
                "businessNodeLevelTwoSnapshotSelectSearch",
                result.length ? result[0].value : undefined,
              );

              handleChange();
            }
          }
        });
      },
    },
  );

  const handleHierarchySelectSearchChange = async (value: string | number) => {
    form.setFieldValue("businessUnitWithHierarchySelectSearch", undefined);

    if (!value) return;

    await billingManagementAPI
      .getBusinessNodeBusinessNodeIdBusinessUnitNodesAll({
        businessNodeId: Number(value),
      })
      .then((data) => {
        updateFormDatas((draft) => {
          draft.businessUnitWithHierarchySelectSearch.options = data.map(
            (item) => ({
              value: item.id,
              label: `${item.name} (level ${item.apportionLevel})`,
            }),
          );
        });
      });
  };

  const handleFinancialYearDatePicker = async (value: string | number) => {
    form.setFieldValue("budgetBusinessSelectSearch", undefined);

    await billingManagementAPI
      .getBillManageBudgetQueryBudgetList({
        financialYear: value ? dayjs(value).format("YYYY") : undefined,
      })
      .then((data) => {
        updateFormDatas((draft) => {
          draft.budgetBusinessSelectSearchDataSource.options = data.map(
            pickNodeIdAndNodeName,
          );
        });
      });
  };

  const handleBusinessUnitSelectSearch = async (value: string | number) => {
    await resourceManagementAPI
      .getBusinessUnitNodes({ keyword: String(value) })
      .then((data) => {
        updateFormDatas((draft) => {
          draft.businessUnitSelectSearch.options = data.map(pickIdAndName);
        });
      });
  };

  const handleInstanceSelectSearch = async (value: string | number) => {
    if (
      form.getFieldValue("customSourceResourceSelect") &&
      form.getFieldValue("customResourceTypeSelect")
    ) {
      await billingManagementAPI
        .getCustomResourceInstances({
          keyword: String(value),
          platformId: form.getFieldValue("customSourceResourceSelect"),
          productTypeId: form.getFieldValue("customResourceTypeSelect"),
        })
        .then((data) => {
          updateFormDatas((draft) => {
            draft.instanceSelectSearch.options = data.map(pickCodeAndName);
          });
        });
    }
  };

  // 已废弃
  const handleCloudResourceTypeSelectChange = (value: string) => {
    form.setFieldValue("cloudProductTypeSelect", undefined);

    updateFormDatas((draft) => {
      const item = global.cloudResourceTypesAndProductTypes.find(
        (item) => item.code === value,
      );

      if (!item || !item.children) {
        draft.cloudProductTypeSelect.options = [];
      } else {
        draft.cloudProductTypeSelect.options =
          item.children.map(pickCodeAndName);
      }
    });
  };

  const handleCloudSourceResourceSelectChange = (value: string) => {
    form.setFieldValue("cloudProductTypeSelect", undefined);

    updateFormDatas((draft) => {
      const item = global.cloudResourceTypesAndProductTypes.find(
        (item) => item.code === value,
      );

      if (!item || !item.children) {
        draft.cloudProductTypeSelect.options = [];
      } else {
        draft.cloudProductTypeSelect.options = item.children
          .map((item) => ({
            code: item.code,
            name: `${item.name}（${item.code}）`,
          }))
          .map(pickCodeAndName);
      }
    });
  };

  const handleCustomSourceResourceSelectChange = (value: string) => {
    form.setFieldValue("customResourceTypeSelect", undefined);
    form.setFieldValue("instanceSelectSearch", undefined);

    updateFormDatas((draft) => {
      draft.customResourceTypeSelectWithGlobal.handleCustomSourceResourceSelectChangeActive =
        value;

      const item = global.customResourcePlatformsAndTypes.find(
        (item) => item.code === value,
      );

      if (!item || !item.children) {
        draft.customResourceTypeSelect.options = [];
      } else {
        draft.customResourceTypeSelect.options =
          item.children.map(pickCodeAndName);
      }

      draft.instanceSelectSearch.options = [];
    });
  };

  const handleCustomResourceTypeSelectChange = (value: string) => {
    form.setFieldValue("instanceSelectSearch", undefined);

    updateFormDatas((draft) => {
      draft.instanceSelectSearch.options = [];
    });

    handleInstanceSelectSearch("");
  };

  const handleBillingPeriodDatePickerChange = (value: Dayjs) => {
    if (hasValues(["businessNodeTreeSTreeSelect"])) {
      form.setFieldValue("businessNodeTreeSTreeSelect", undefined);

      updateFormDatas((draft) => {
        draft.businessNodeTreeSTreeSelect.treeData = [];
      });

      billingManagementAPI
        .getBusinessNodeTreeSnapshot({
          billingCycle: value.format("YYYY-MM"),
        })
        .then((data) => {
          updateFormDatas((draft) => {
            if (data) {
              const result: any = formatTreeLikeData([data], {
                value: "id",
                title: "name",
              })[0].children;

              draft.businessNodeTreeSTreeSelect.treeData = result;

              if (props.formItemProps?.businessNodeTreeSTreeSelect?.required) {
                form.setFieldValue(
                  "businessNodeTreeSTreeSelect",
                  result.length ? result[0].value : undefined,
                );

                handleChange();
              }
            }
          });
        });
    }

    if (hasValues(["businessNodeLevelTwoSnapshotSelectSearch"])) {
      form.setFieldValue("businessNodeLevelTwoSnapshotSelectSearch", undefined);

      updateFormDatas((draft) => {
        draft.businessNodeLevelTwoSnapshotSelectSearch.options = [];
      });

      billingManagementAPI
        .getBusinessNodeLevelSnapshot({
          billingCycle: value.format("YYYY-MM"),
          level: 2,
        })
        .then((data) => {
          updateFormDatas((draft) => {
            if (data) {
              const result = data.map(pickIdAndName);
              draft.businessNodeLevelTwoSnapshotSelectSearch.options = result;
              if (
                props.formItemProps?.businessNodeLevelTwoSnapshotSelectSearch
                  ?.required
              ) {
                form.setFieldValue(
                  "businessNodeLevelTwoSnapshotSelectSearch",
                  result.length ? result[0].value : undefined,
                );

                handleChange();
              }
            }
          });
        });
    }

    if (hasValues(["businessUnitNodeSnapshotSelectSearch"])) {
      form.setFieldValue("businessUnitNodeSnapshotSelectSearch", undefined);

      updateFormDatas((draft) => {
        draft.businessUnitNodeSnapshotSelectSearch.options = [];
      });
    }
  };

  const handleBusinessNodeTreeSTreeSelect = (value: number) => {
    if (hasValues(["businessUnitNodeSnapshotSelectSearch"])) {
      form.setFieldValue("businessUnitNodeSnapshotSelectSearch", undefined);

      if (!value) return;

      billingManagementAPI
        .getBusinessNodeBusinessNodeIdBusinessUnitNodesSnapshot({
          billingCycle: form
            .getFieldValue("billingPeriodDatePicker")
            .format("YYYY-MM"),
          businessNodeId: value,
          pageNo: 1,
          // 这里写死获取 100 条
          pageSize: 100,
        })
        .then((data) => {
          updateFormDatas((draft) => {
            draft.businessUnitNodeSnapshotSelectSearch.options =
              data.items.map(pickIdAndName);
          });
        });
    }
  };

  const handleApplicationWithBusinessUnitSelectSearchSearch = (
    value?: string,
  ) => {
    resourceManagementAPI
      .getApplicationsByBussinessUnitNodeId({
        ...props.querys!.applicationWithBusinessUnitSelectSearch,
        keyword: value,
        pageNo: 1,
        pageSize: 50,
      })
      .then((data) => {
        updateFormDatas((draft) => {
          const result = Array.isArray(data.items)
            ? data.items.map(pickIdAndCode)
            : [];

          draft.applicationWithBusinessUnitSelectSearch.options = result;
        });
      });
  };

  const formItemMaps: { [k: string]: IItem } = {
    businessUnitSelectSearch: {
      label: "目标业务单元",
      type: "SSelectSearch",
      componentProps: {
        onSearch: handleBusinessUnitSelectSearch,
        options: formDatas.businessUnitSelectSearch.options,
      },
    },
    appNameInput: { label: "应用名称", type: "SInput" },
    gitUrlInput: { label: "git 地址", type: "SInput" },
    appTypeInput: { label: "应用类型", type: "SInput" },
    titleInput: { label: "应用类型", type: "SInput" },
    levelSelect: { label: "应用类型", type: "SInput" },
    billingPeriodDatePicker: {
      label: "账期",
      type: "SDatePicker",
      componentProps: {
        picker: "month",
        onChange: handleBillingPeriodDatePickerChange,
      },
    },
    apportionLevelSelect: {
      label: "分摊层级",
      type: "SSelect",
      componentProps: {
        options: global.bussinessUnitCodeApportionLevels.map(pickCodeAndName),
      },
    },
    appCodeInput: { label: "应用 Code/名称", type: "SInput" },
    appTypeSelect: {
      label: "应用类型",
      type: "SSelect",
      componentProps: {
        options: global.applicationTypes.map(pickCodeAndName),
      },
    },
    businessUnitInput: { label: "业务单元", type: "SInput" },
    instanceInput: { label: "实例 id/名称", type: "SInput" },
    instanceSelectSearch: {
      label: "实例名称",
      type: "SSelectSearch",
      componentProps: {
        onSearch: handleInstanceSelectSearch,
        options: formDatas.instanceSelectSearch.options,
      },
    },
    weightInputNumber: { label: "权重", type: "SInputNumber" },
    cloudSourceResourceSelect: {
      label: "资源来源",
      type: "SSelect",
      componentProps: {
        options: global.cloudResourceTypesAndProductTypes.map(pickCodeAndName),
        onChange: handleCloudSourceResourceSelectChange,
      },
    },
    // 已废弃
    cloudResourceTypeSelect: {
      label: "资源类型",
      type: "SSelect",
      componentProps: {
        options: global.cloudResourceTypesAndProductTypes.map(pickCodeAndName),
        onChange: handleCloudResourceTypeSelectChange,
      },
    },
    cloudProductTypeSelect: {
      label: "产品名称",
      type: "SSelectSearch",
      componentProps: {
        options: formDatas.cloudProductTypeSelect.options,
      },
    },
    cloudResourceStatusSelect: {
      label: "资源状态",
      type: "SSelect",
      componentProps: {
        options: global.cloudResourceStates.map(pickCodeAndName),
      },
    },
    customSourceResourceSelect: {
      label: "资源来源",
      type: "SSelectSearch",
      componentProps: {
        options: global.customResourcePlatformsAndTypes.map(pickCodeAndName),
        onChange: handleCustomSourceResourceSelectChange,
      },
    },
    customSourceResourceInput: {
      label: "资源来源",
      type: "SInput",
    },
    customResourceTypeSelect: {
      label: "产品名称",
      type: "SSelectSearch",
      componentProps: {
        options: formDatas.customResourceTypeSelect.options,
        onChange: handleCustomResourceTypeSelectChange,
      },
    },
    customResourceTypeSelectWithGlobal: {
      label: "产品名称",
      type: "SSelectSearch",
      componentProps: {
        options: (() => {
          const item = global.customResourcePlatformsAndTypes.find(
            (item) =>
              item.code ===
              formDatas.customResourceTypeSelectWithGlobal
                .handleCustomSourceResourceSelectChangeActive,
          );

          if (item && item.children) {
            return item.children.map((item) => ({
              value: item.code,
              label: item.name,
            }));
          } else {
            return [];
          }
        })(),
        onChange: handleCustomResourceTypeSelectChange,
      },
    },
    customResourceTypeInput: {
      label: "产品名称",
      type: "SInput",
    },
    showNoBindSelect: {
      label: "显示未绑定资源",
      type: "SSelect",
      componentProps: {
        options: [
          { value: 0, label: "是" },
          { value: 1, label: "否" },
        ],
      },
    },
    showNoBindCheckbox: {
      label: "显示未绑定资源",
      type: "SCheckbox",
    },
    expensesInputNumber: { label: "费用", type: "SInputNumber" },
    hierarchySelectSearch: {
      label: "层级架构",
      type: "SSelectSearch",
      componentProps: {
        options: formDatas.hierarchySelectSearch.options,
        onChange: handleHierarchySelectSearchChange,
      },
    },
    businessUnitWithHierarchySelectSearch: {
      label: "业务单元",
      type: "SSelectSearch",
      componentProps: {
        options: formDatas.businessUnitWithHierarchySelectSearch.options,
      },
    },
    billManageApportionModel: {
      label: "分摊模型",
      type: "SSelect",
      componentProps: {
        options: global.billManageApportionModel.map(pickCodeAndName),
      },
    },

    financialYearDatePicker: {
      label: "年份",
      type: "SDatePicker",
      componentProps: {
        picker: "year",
        onChange: handleFinancialYearDatePicker,
      },
    },
    budgetBusinessSelectSearch: {
      label: "层级架构",
      type: "SSelectSearch",
      componentProps: {
        options: formDatas.budgetBusinessSelectSearchDataSource.options,
      },
    },
    businessNodeTreeSTreeSelect: {
      label: "层级架构",
      type: "STreeSelect",
      componentProps: {
        onChange: handleBusinessNodeTreeSTreeSelect,
        treeData: formDatas.businessNodeTreeSTreeSelect.treeData,
      },
    },

    businessNodeLevelTwoSnapshotSelectSearch: {
      label: "层级架构",
      type: "SSelectSearch",
      componentProps: {
        options: formDatas.businessNodeLevelTwoSnapshotSelectSearch.options,
      },
    },

    businessUnitNodeSnapshotSelectSearch: {
      label: "业务单元",
      type: "SSelectSearch",
      componentProps: {
        options: formDatas.businessUnitNodeSnapshotSelectSearch.options,
      },
    },

    apportionCostTypeSelect: {
      label: "分摊方式",
      type: "SSelect",
      componentProps: {
        options: [
          { label: "我分出去", value: "apportionTo" },
          { label: "分给我的", value: "apportionFrom" },
        ],
      },
    },
    healthLevelsSelect: {
      label: "合理程度",
      type: "SSelect",
      componentProps: {
        options: global.healthLevels.map(pickCodeAndName),
      },
    },
    applicationWithBusinessUnitSelectSearch: {
      label: "应用名称",
      type: "SSelectSearch",
      componentProps: {
        options: formDatas.applicationWithBusinessUnitSelectSearch.options,
        onSearch: handleApplicationWithBusinessUnitSelectSearchSearch,
      },
    },
  };

  const pickValues = useCallback(pick(Object.keys(props.initialValues)), [
    props.initialValues,
  ]);

  const _handleChange = () => {
    if (typeof props.onChange === "function") {
      // props.onChange!(pickValues(form.getFieldsValue()));
      form
        .validateFields()
        .then((values) => props.onChange!(pickValues(values)));
    } else {
      console.log(pickValues(form.getFieldsValue()));
    }
  };

  const { run: handleChange } = useDebounceFn(_handleChange, { wait: 500 });

  const initValue = useMemo(() => clone(props.initialValues), []);

  // (() => {
  //   const datas = Object.keys(props.initialValues).reduce(
  //     (pre, curr) => ({ ...pre, [curr]: Form.useWatch(curr, form) }),
  //     props.initialValues
  //   );

  //   handleChange(datas);
  // })();

  return (
    <Form
      form={form}
      initialValues={initValue}
      // TODO 切换使用 Form.useWatch 来实现数据的改变监听
      onValuesChange={handleChange}
      {...props.formProps}
    >
      <SRow style={props.style}>
        {Object.keys(props.initialValues).map((key) => {
          const item = formItemMaps[key];
          if (!item) return <>notFound </>;
          const FormType = FormComponents[item.type] as any;
          return (
            <React.Fragment key={key}>
              <SCol
                span={
                  props.layout === "vertical"
                    ? 24
                    : props.colSpans
                    ? props.colSpans[key]
                      ? props.colSpans[key]
                      : 4
                    : 4
                }
              >
                <FormType
                  name={key}
                  formItemProps={{
                    label: item.label,
                    ...item.formItemProps,
                    ...(props.formItemProps ? props.formItemProps[key] : {}),
                  }}
                  componentProps={{
                    ...item.componentProps,
                    ...(props.componentProps ? props.componentProps[key] : {}),
                  }}
                />
              </SCol>
              {props.colExtends && (
                <SCol>
                  {props.colExtends[key] ? props.colExtends[key] : <></>}
                </SCol>
              )}
            </React.Fragment>
          );
        })}
      </SRow>
    </Form>
  );
};

export default FormsProMax;
