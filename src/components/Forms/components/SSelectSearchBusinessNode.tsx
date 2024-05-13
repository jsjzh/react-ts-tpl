import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { billingManagementAPI } from "@/api";

import SSelectSearchPro from "../baseComponents/SSelectSearchPro";
import dayjs, { Dayjs } from "dayjs";

interface IProps {
  billingCycle?: Dayjs;
  businessNodeId?: number;

  label?: string;
  name?: string;
  span?: number;
  required?: boolean;
  searchOnInit?: boolean;

  onChange?: (value?: string | number) => void;
}

const SSelectSearchBusinessNode: React.FC<IProps> = (props) => {
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
        .getBusinessNodeLevelSnapshot({
          level: 2,
          billingCycle: props.billingCycle.format("YYYY-MM"),
          keyword,
        })
        .then((res) => {
          updatePageData((draft) => {
            draft.dataSource = (res || []).map((item) => ({
              label: item.name,
              value: item.id,
            }));
          });
        });
    } else {
      billingManagementAPI
        .getBusinessNodeLevel({ level: 2, keyword })
        .then((res) => {
          updatePageData((draft) => {
            draft.dataSource = (res || []).map((item) => ({
              label: item.name,
              value: item.id,
            }));
          });
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.billingCycle]);

  return (
    <SSelectSearchPro
      label={props.label || "层级架构"}
      name={props.name || "businessNodeId"}
      size="large"
      span={props.span}
      searchOnInit={props.searchOnInit}
      options={pageData.dataSource}
      onSearch={fetchData}
      onChange={props.onChange}
      formItemProps={{
        rules: [{ required: props.required }],
        initialValue: props.businessNodeId,
      }}
    />
  );
};

export default SSelectSearchBusinessNode;
