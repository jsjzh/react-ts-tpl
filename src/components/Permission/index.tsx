import React from "react";
import { SKIP_AUTHENTICATION } from "@/shared/const";

interface IProps {
  code: string;
  children: React.ReactElement;
}

const Permission: React.FC<IProps> = (props) => {
  if (SKIP_AUTHENTICATION) {
    return props.children;
  } else {
    return null;
  }
};

export default Permission;
