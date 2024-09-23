// TODO
import { SKIP_AUTHENTICATION } from "@/shared/const";
import { useGlobalStore } from "@/stores";
import { pick } from "ramda";
import React from "react";

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
