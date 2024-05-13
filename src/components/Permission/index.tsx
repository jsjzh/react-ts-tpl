import React from "react";
import { useImmer } from "use-immer";
import { pick } from "ramda";
import { useGlobalStore } from "@/store";
import { SKIP_AUTHENTICATION } from "@/shared/constants";

interface IProps {
  code: string;
  children: React.ReactElement;
}

const mapStateFromGlobal = pick(["componentCodeList", "menuCodeList"]);

const Permission: React.FC<IProps> = (props) => {
  const global = useGlobalStore(mapStateFromGlobal);

  const codes = [...global.componentCodeList, ...global.menuCodeList];

  if (SKIP_AUTHENTICATION || codes.includes(props.code.toLocaleUpperCase())) {
    return props.children;
  } else {
    return <></>;
  }
};

export default Permission;
