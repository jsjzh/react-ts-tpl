import React from "react";
import { Row } from "antd";
import type { RowProps } from "antd";

export interface SRowProps extends RowProps {
  size?: "small" | "middle" | "large";
}

// xs 屏幕 < 576px
// sm 屏幕 ≥ 576px
// md 屏幕 ≥ 768px
// lg 屏幕 ≥ 992px
// xl 屏幕 ≥ 1200px
// xxl 屏幕 ≥ 1600px

const baseSmall = 4;
const baseMiddle = 8;
const baseLarge = 16;

const sizeMap = {
  small: {
    xs: baseSmall,
    sm: baseSmall * 2,
    md: baseSmall * 3,
    lg: baseSmall * 3,
    xl: baseSmall * 3,
    xxl: baseSmall * 3,
  },
  middle: {
    xs: baseMiddle,
    sm: baseMiddle * 2,
    md: baseMiddle * 3,
    lg: baseMiddle * 3,
    xl: baseMiddle * 3,
    xxl: baseMiddle * 3,
  },
  large: {
    xs: baseLarge,
    sm: baseLarge * 2,
    md: baseLarge * 3,
    lg: baseLarge * 3,
    xl: baseLarge * 3,
    xxl: baseLarge * 3,
  },
};

export default (props: SRowProps) => {
  const defaultConfig = props.gutter
    ? {}
    : { gutter: sizeMap[props.size || "middle"] };

  return (
    <Row {...defaultConfig} {...props}>
      {props.children}
    </Row>
  );
};
