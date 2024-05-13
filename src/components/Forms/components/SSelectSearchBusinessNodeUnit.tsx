import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { billingManagementAPI } from "@/api";

import SSelectSearchPro from "../baseComponents/SSelectSearchPro";
import { pickIdAndName } from "../shared";
import dayjs, { Dayjs } from "dayjs";

interface IProps {
  billingCycle?: Dayjs;
  businessNodeId?: number;
  businessUnitId?: number;

  label?: string;
  name?: string;
  span?: number;
  required?: boolean;
  searchOnInit?: boolean;

  onChange?: (value?: string | number) => void;
}

const SSelectSearchBusinessNodeUnit: React.FC<IProps> = (props) => {
  const [pageData, updatePageData] = useImmer<{
    dataSource: { label: string; value: number }[];
  }>({
    dataSource: [],
  });

  const fetchData = (keyword?: string) => {
    if (
      props.billingCycle &&
      props.billingCycle.isBefore(dayjs().subtract(1, "M").startOf("M"))
    ) {
      billingManagementAPI
        .getBusinessUnitNodesSnapshotPage({
          keyword,
          billingCycle: props.billingCycle.format("YYYY-MM"),
          businessNodeId: props.businessNodeId,
          pageNo: 1,
          pageSize: 999,
        })
        .then((res) => {
          updatePageData((draft) => {
            draft.dataSource = (res.items || []).map(pickIdAndName);
          });
        });
    } else {
      billingManagementAPI
        .getBusinessUnitNodesPage({
          keyword,
          businessNodeId: props.businessNodeId,
          pageNo: 1,
          pageSize: 999,
        })
        .then((res) => {
          updatePageData((draft) => {
            draft.dataSource = (res.items || []).map(pickIdAndName);
          });
        });
    }
  };

  useEffect(() => {
    if (!props.businessNodeId) {
      updatePageData((draft) => {
        draft.dataSource = [];
      });
    } else {
      fetchData();
    }
  }, [props.businessNodeId, props.billingCycle]);

  return (
    <SSelectSearchPro
      label={props.label || "业务单元"}
      name={props.name || "businessUnitId"}
      size="large"
      span={props.span}
      searchOnInit={props.searchOnInit}
      options={pageData.dataSource}
      onSearch={fetchData}
      onChange={props.onChange}
      formItemProps={{
        rules: [{ required: props.required }],
        initialValue: props.businessUnitId,
      }}
    />
  );
};

export default SSelectSearchBusinessNodeUnit;
