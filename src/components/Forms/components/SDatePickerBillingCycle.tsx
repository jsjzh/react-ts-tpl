import React from "react";

import SDatePicker from "../baseComponents/SDatePicker";
import { Dayjs } from "dayjs";

interface IProps {
  label?: string;
  name?: string;
  span?: number;
  required?: boolean;

  onChange?: (value: Dayjs | null, dateString: string | string[]) => void;
}

const SDatePickerBillingCycle: React.FC<IProps> = (props) => {
  return (
    <SDatePicker
      label={props.label || "账期"}
      name={props.name || "billingCycle"}
      size="middle"
      span={props.span}
      onChange={props.onChange}
      picker="month"
      formItemProps={{
        rules: [{ required: props.required }],
      }}
    />
  );
};

export default SDatePickerBillingCycle;
