import { useGlobalStore } from "@/stores";
import { Breadcrumb } from "antd";
import React, { useImperativeHandle, useRef } from "react";

interface IProps {
  style?: React.CSSProperties;
}

interface IProps {
  style?: React.CSSProperties;
}

interface PageBreadcrumbIRefs {
  push: (item: { title: string; href?: string; onClick?: () => void }) => void;
  pop: () => void;
  get: () => { title: string; href?: string; onClick?: () => void }[];
}

const PageBreadcrumb = React.forwardRef<PageBreadcrumbIRefs, IProps>(
  (props, ref) => {
    const { gdb, gupdate } = useGlobalStore((state) => ({
      gdb: state,
      gupdate: state.updateGlobal,
    }));

    const get = () => {
      return gdb.breadcrumbData;
    };

    const push = (item: {
      title: string;
      href?: string;
      onClick?: () => void;
    }) => {
      const pre = gdb.breadcrumbData;
      const next = [...pre, { title: item.title, href: item.href }];
      gupdate((draft) => {
        draft.breadcrumbData = next;
      });
    };

    const pop = () => {
      const pre = gdb.breadcrumbData;
      const next = pre.slice(0, pre.length - 1);
      gupdate((draft) => {
        draft.breadcrumbData = next;
      });
    };

    useImperativeHandle(ref, () => ({ push, pop, get }), [gdb.breadcrumbData]);

    return <Breadcrumb style={props.style} items={gdb.breadcrumbData} />;
  },
);

export const usePageBreadcrumb = () => {
  const pageBreadcrumbRef = useRef<PageBreadcrumbIRefs>(null);

  return {
    ref: pageBreadcrumbRef,
    get: () => {
      if (pageBreadcrumbRef.current) {
        return pageBreadcrumbRef.current.get();
      }
    },
    push: (item: { title: string; href?: string; onClick?: () => void }) => {
      if (pageBreadcrumbRef.current) {
        pageBreadcrumbRef.current.push(item);
      }
    },
    pop: () => {
      if (pageBreadcrumbRef.current) {
        pageBreadcrumbRef.current.pop();
      }
    },
  };
};

export default PageBreadcrumb;
