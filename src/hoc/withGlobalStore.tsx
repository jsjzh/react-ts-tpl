import { useGlobalStore } from "@/stores";
import { GlobalData, GlobalFunc } from "@/stores/global";
import React from "react";

export interface withGlobalStoreProps {
  gdb: GlobalData;
  gupdate: GlobalFunc["updateGlobal"];
}

function withGlobalStore<T>(WrappedComponent: React.FC<T>) {
  return function withGlobalStoreComponent(props: any) {
    const { gdb, gupdate } = useGlobalStore((state) => ({
      gdb: state,
      gupdate: state.updateGlobal,
    }));

    return <WrappedComponent gdb={gdb} gupdate={gupdate} {...props} />;
  };
}

export default withGlobalStore;
