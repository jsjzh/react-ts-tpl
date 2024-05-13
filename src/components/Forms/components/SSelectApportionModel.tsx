import React from "react";
import { pick } from "ramda";
import { useGlobalStore } from "@/store";
import { pickCodeAndName } from "../shared";

import SSelectPro from "../baseComponents/SSelectPro";
import { FormItemProps } from "antd";

interface IProps {
  label?: string;
  name?: string;
  span?: number;
  required?: boolean;

  onChange?: (value?: string | number) => void;
  optionsHandler?: (
    options: { label: string; value: string | number }[],
  ) => { label: string; value: string | number; [k: string]: any }[];

  formItemProps?: Omit<FormItemProps, "name" | "label">;
}

const mapStateFromGlobal = pick(["billManageApportionModel"]);

const SSelectApportionModel: React.FC<IProps> = (props) => {
  const global = useGlobalStore(mapStateFromGlobal);
  let billManageApportionModel =
    global.billManageApportionModel.map(pickCodeAndName);

  if (props.optionsHandler) {
    billManageApportionModel = props.optionsHandler(billManageApportionModel);
  }

  return (
    <SSelectPro
      label={props.label || "分摊模型"}
      name={props.name || "apportionModel"}
      size="middle"
      span={props.span}
      options={billManageApportionModel}
      onChange={props.onChange}
      formItemProps={{
        rules: [{ required: props.required }],
        ...props.formItemProps,
      }}
    />
  );
};

export default SSelectApportionModel;
