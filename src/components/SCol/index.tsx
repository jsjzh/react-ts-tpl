import React from "react";
import { Col } from "antd";
import type { ColProps } from "antd";

export interface SColProps extends ColProps {
  size?: "small" | "middle" | "large" | "huge";
}

// xs 屏幕 < 576px
// sm 屏幕 ≥ 576px
// md 屏幕 ≥ 768px
// lg 屏幕 ≥ 992px
// xl 屏幕 ≥ 1200px
// xxl 屏幕 ≥ 1600px

const smallBase = 3;
const middleBase = 4;
const largeBase = 6;
const hugeBase = 8;

const sizeMap = {
  small: {
    xs: smallBase + 12,
    sm: smallBase + 10,
    md: smallBase + 6,
    lg: smallBase + 4,
    xl: smallBase + 2,
    xxl: smallBase,
  },
  middle: {
    xs: middleBase + 12,
    sm: middleBase + 10,
    md: middleBase + 6,
    lg: middleBase + 4,
    xl: middleBase + 2,
    xxl: middleBase,
  },
  large: {
    xs: largeBase + 12,
    sm: largeBase + 10,
    md: largeBase + 6,
    lg: largeBase + 4,
    xl: largeBase + 2,
    xxl: largeBase,
  },
  huge: {
    xs: hugeBase + 12,
    sm: hugeBase + 10,
    md: hugeBase + 6,
    lg: hugeBase + 4,
    xl: hugeBase + 2,
    xxl: hugeBase,
  },
};

const SCol: React.FC<SColProps> = (props) => {
  const defaultConfig = props.span ? {} : sizeMap[props.size || "middle"];

  return (
    <Col {...defaultConfig} {...props}>
      {props.children}
    </Col>
  );
};

export default SCol;
