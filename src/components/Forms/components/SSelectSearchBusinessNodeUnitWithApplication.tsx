import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { resourceManagementAPI } from "@/api";

import SSelectSearchPro from "../baseComponents/SSelectSearchPro";
import { pickIdAndCode } from "../shared";

interface IProps {
  businessUnitId?: number;
  applicationId?: number;

  label?: string;
  name?: string;
  span?: number;
  required?: boolean;
  searchOnInit?: boolean;

  onChange?: (value?: string | number) => void;
}

const SSelectSearchBusinessNodeUnitWithApplication: React.FC<IProps> = (
  props,
) => {
  const [pageData, updatePageData] = useImmer<{
    dataSource: { label: string; value: number }[];
  }>({
    dataSource: [],
  });

  const fetchData = (keyword?: string) =>
    props.businessUnitId &&
    resourceManagementAPI
      .getApplicationsByBussinessUnitNodeId({
        id: props.businessUnitId,
        keyword,
        pageNo: 1,
        pageSize: 999,
      })
      .then((data) => {
        updatePageData((draft) => {
          draft.dataSource = Array.isArray(data.items)
            ? data.items.map(pickIdAndCode)
            : [];
        });
      });

  useEffect(() => {
    if (!props.businessUnitId) {
      updatePageData((draft) => {
        draft.dataSource = [];
      });
    } else {
      fetchData();
    }
  }, [props.businessUnitId]);

  return (
    <SSelectSearchPro
      label={props.label || "应用名称"}
      name={props.name || "applicationId"}
      size="middle"
      span={props.span}
      searchOnInit={props.searchOnInit}
      options={pageData.dataSource}
      onSearch={fetchData}
      formItemProps={{
        rules: [{ required: props.required }],
        initialValue: props.applicationId,
      }}
      componentProps={{
        disabled: !props.businessUnitId,
      }}
    />
  );
};

export default SSelectSearchBusinessNodeUnitWithApplication;
