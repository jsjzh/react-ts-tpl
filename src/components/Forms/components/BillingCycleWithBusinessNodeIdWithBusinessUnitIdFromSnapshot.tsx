import React, { useImperativeHandle, useRef } from "react";
import { useImmer } from "use-immer";
import { FormInstance } from "antd";
import SDatePicker from "../baseComponents/SDatePicker";
import STreeSelectSearch from "../baseComponents/STreeSelectSearch";
import { billingManagementAPI } from "@/api";
import { formatTreeLikeData } from "@/shared/tree";
import { Dayjs } from "dayjs";
import { pickIdAndName } from "../shared";
import SSelectSearchPro from "../baseComponents/SSelectSearchPro";

export interface IRefs {
  init: () => void;
}

interface IProps {
  form: FormInstance<{
    billingCycle?: Dayjs;
    businessNodeId?: number;
    businessUnitId?: number;
    [k: string]: any;
  }>;
}

const BillingCycleWithBusinessNodeIdWithBusinessUnitIdFromSnapshot =
  React.forwardRef<IRefs, IProps>((props, ref) => {
    const [pageData, updatePageData] = useImmer<{
      businessNodeTree: ItBilling.getBusinessNodeLevelItem[];
      businessUnitList: { value: number; label: string }[];
    }>({ businessNodeTree: [], businessUnitList: [] });

    useImperativeHandle(
      ref,
      () => ({
        init: () => {
          if (props.form.getFieldValue("billingCycle")) {
            fetchBusinessNodeTree();
            if (props.form.getFieldValue("businessNodeId")) {
              fetchBusinessUnitList();
            }
          }
        },
      }),
      [],
    );

    const fetchBusinessNodeTree = () => {
      billingManagementAPI
        .getBusinessNodeTreeSnapshot({
          billingCycle: props.form
            .getFieldValue("billingCycle")
            .format("YYYY-MM"),
        })
        .then((data) => {
          if (!data) {
            updatePageData((draft) => {
              draft.businessNodeTree = [];
            });
          } else {
            const result: any = formatTreeLikeData([data], {
              value: "id",
              title: "name",
            })[0].children;
            updatePageData((draft) => {
              draft.businessNodeTree = result;
            });
          }
        });
    };

    const fetchBusinessUnitList = () => {
      billingManagementAPI
        .getBusinessNodeBusinessNodeIdBusinessUnitNodesSnapshot({
          billingCycle: props.form
            .getFieldValue("billingCycle")
            .format("YYYY-MM"),
          businessNodeId: props.form.getFieldValue("businessNodeId"),
          pageNo: 1,
          pageSize: 9999,
        })
        .then((data) => {
          updatePageData((draft) => {
            draft.businessUnitList = (data.items || []).map(pickIdAndName);
          });
        });
    };

    return (
      <>
        <SDatePicker
          name="billingCycle"
          label="账期"
          picker="month"
          formItemProps={{ required: true }}
          onChange={() => {
            props.form.setFieldValue("businessNodeId", undefined);
            props.form.setFieldValue("businessUnitId", undefined);
            updatePageData((draft) => {
              draft.businessNodeTree = [];
              draft.businessUnitList = [];
            });
            fetchBusinessNodeTree();
          }}
          componentProps={{ allowClear: false }}
        />
        <STreeSelectSearch
          name="businessNodeId"
          label="层级架构"
          size="large"
          treeData={pageData.businessNodeTree}
          onChange={(value) => {
            props.form.setFieldValue("businessUnitId", undefined);
            updatePageData((draft) => {
              draft.businessUnitList = [];
            });
            if (value) fetchBusinessUnitList();
          }}
        />
        <SSelectSearchPro
          name="businessUnitId"
          label="业务单元"
          size="large"
          options={pageData.businessUnitList}
        />
      </>
    );
  });

export const useBillingCycleWithBusinessNodeIdWithBusinessUnitIdFromSnapshot =
  () => {
    const ref = useRef<IRefs>(null);
    return {
      current: ref,
      init: () => {
        if (ref.current) {
          ref.current.init();
        }
      },
    };
  };

export default BillingCycleWithBusinessNodeIdWithBusinessUnitIdFromSnapshot;
