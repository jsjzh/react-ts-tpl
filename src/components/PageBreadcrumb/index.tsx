import { withGlobalStore, withGlobalStoreProps } from "@/hoc";
import { Breadcrumb } from "antd";
import { pipe } from "ramda";
import React, { useImperativeHandle, useRef } from "react";

interface IProps {
  style?: React.CSSProperties;
}

interface IProps extends withGlobalStoreProps {
  style?: React.CSSProperties;
}

interface PageBreadcrumbIRefs {
  push: (item: { title: string; href?: string; onClick?: () => void }) => void;
  pop: () => void;
  get: () => { title: string; href?: string; onClick?: () => void }[];
}

const PageBreadcrumb = React.forwardRef<PageBreadcrumbIRefs, IProps>(
  (props, ref) => {
    const get = () => {
      return props.gdb.breadcrumbData;
    };

    const push = (item: {
      title: string;
      href?: string;
      onClick?: () => void;
    }) => {
      const pre = props.gdb.breadcrumbData;
      const next = [...pre, { title: item.title, href: item.href }];
      props.gupdate((draft) => {
        draft.breadcrumbData = next;
      });
    };

    const pop = () => {
      const pre = props.gdb.breadcrumbData;
      const next = pre.slice(0, pre.length - 1);
      props.gupdate((draft) => {
        draft.breadcrumbData = next;
      });
    };

    useImperativeHandle(ref, () => ({ push, pop, get }), [
      props.gdb.breadcrumbData,
    ]);

    return <Breadcrumb style={props.style} items={props.gdb.breadcrumbData} />;
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

const withHOC = pipe(withGlobalStore);

export default withHOC(PageBreadcrumb);
