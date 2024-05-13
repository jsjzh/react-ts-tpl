import React from "react";
import { Modal } from "antd";
import { omit } from "ramda";

import type { ModalProps } from "antd";

interface IProps extends ModalProps {
  size?: keyof typeof sizeMap;
}

const sizeMap = {
  small: 600,
  middle: 800,
  large: 1200,
  huge: 1400,
};

const omitProps = omit(["size", "width"]);

const SModal: React.FC<IProps> = (props) => {
  const currentWidth = props.width
    ? props.width
    : props.size
      ? sizeMap[props.size]
      : sizeMap.middle;

  return (
    <Modal {...omitProps(props)} width={currentWidth}>
      {props.children}
    </Modal>
  );
};

export default SModal;
