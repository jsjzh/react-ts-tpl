import { SKIP_AUTHENTICATION } from "@/shared/const";
import { useGlobalStore } from "@/stores";
import React from "react";

interface IProps {
  code: string;
  children: React.ReactElement;
}

const Permission: React.FC<IProps> = (props) => {
  const { gdb } = useGlobalStore((state) => ({ gdb: state }));

  const codes: string[] = [];

  if (SKIP_AUTHENTICATION || codes.includes(props.code.toLocaleUpperCase())) {
    return props.children;
  } else {
    return <></>;
  }
};

export default Permission;
