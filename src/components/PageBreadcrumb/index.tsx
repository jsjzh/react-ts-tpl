// TODO
import { useGlobalStore } from "@/stores";
import { Breadcrumb } from "antd";
import { pick } from "ramda";
import React, { useImperativeHandle, useRef } from "react";

interface IProps {
  style?: React.CSSProperties;
}

interface PageBreadcrumbIRefs {
  push: (item: { title: string; href?: string; onClick?: () => void }) => void;
  pop: () => void;
  get: () => { title: string; href?: string; onClick?: () => void }[];
}

const mapStateFromGlobal = pick(["breadcrumbData", "updateGlobal"]);

const PageBreadcrumb = React.forwardRef<PageBreadcrumbIRefs, IProps>(
  (props, ref) => {
    const global = useGlobalStore(mapStateFromGlobal);

    const get = () => {
      return global.breadcrumbData;
    };

    const push = (item: {
      title: string;
      href?: string;
      onClick?: () => void;
    }) => {
      const pre = global.breadcrumbData;
      const next = [...pre, { title: item.title, href: item.href }];
      global.updateGlobal({ breadcrumbData: next });
    };

    const pop = () => {
      const pre = global.breadcrumbData;
      const next = pre.slice(0, pre.length - 1);
      global.updateGlobal({ breadcrumbData: next });
    };

    useImperativeHandle(ref, () => ({ push, pop, get }), [
      global.breadcrumbData,
    ]);

    return <Breadcrumb style={props.style} items={global.breadcrumbData} />;
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

// export const useGlobalPageBreadcrumb = () => {
//   const global = useGlobalStore(mapStateFromGlobal);

//   return {
//     data: global.breadcrumbData,

//     update(items: { title: string; href?: string; onClick?: () => void }[]) {
//       global.updateGlobal({ breadcrumbData: items });
//     },

//     push(item: { title: string; href?: string; onClick?: () => void }) {
//       const pre = global.breadcrumbData;
//       const next = [...pre, item];
//       global.updateGlobal({ breadcrumbData: next });
//     },

//     pop() {
//       const pre = global.breadcrumbData;
//       const next = pre.slice(0, pre.length - 1);
//       global.updateGlobal({ breadcrumbData: next });
//     },
//   };
// };

export default PageBreadcrumb;
