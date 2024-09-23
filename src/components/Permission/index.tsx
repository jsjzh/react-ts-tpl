import { withGlobalStore, withGlobalStoreProps } from "@/hoc";
import { SKIP_AUTHENTICATION } from "@/shared/const";
import { pipe } from "ramda";
import React from "react";

interface IProps extends withGlobalStoreProps {
  code: string;
  children: React.ReactElement;
}

const Permission: React.FC<IProps> = (props) => {
  const codes: string[] = [];

  if (SKIP_AUTHENTICATION || codes.includes(props.code.toLocaleUpperCase())) {
    return props.children;
  } else {
    return <></>;
  }
};

const withHOC = pipe(withGlobalStore);

export default withHOC(Permission);
