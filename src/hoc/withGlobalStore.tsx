import { useGlobalStore } from "@/stores";
import { GlobalData, GlobalFunc } from "@/stores/global";
import React from "react";

export interface withGlobalStoreProps {
  gdb: GlobalData;
  gupdate: GlobalFunc["updateGlobal"];
}

function withGlobalStore<T extends withGlobalStoreProps>(
  WrappedComponent: React.ComponentType<T>,
) {
  return function withGlobalStoreComponent(
    props: Omit<T, keyof withGlobalStoreProps>,
  ) {
    const { gdb, gupdate } = useGlobalStore((state) => ({
      gdb: state,
      gupdate: state.updateGlobal,
    }));

    return <WrappedComponent gdb={gdb} gupdate={gupdate} {...(props as any)} />;
  };
}

export default withGlobalStore;
