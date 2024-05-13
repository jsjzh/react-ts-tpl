import React from "react";

interface IPageWrapperProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const PageWrapper: React.FC<IPageWrapperProps> = (props) => {
  return (
    <div style={{ padding: "1rem", ...props.style }}>{props.children}</div>
  );
};

export default PageWrapper;
