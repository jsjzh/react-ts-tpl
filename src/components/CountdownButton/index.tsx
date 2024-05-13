import React, { useImperativeHandle, useState } from "react";
import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export interface CountdownButtonIRefs {
  handleStart: () => void;
}

interface IProps {
  initText?: string;
  countdown?: number;
  onClick?: () => void;
  buttonSize?: SizeType;
}

const CountdownButton = React.forwardRef<CountdownButtonIRefs, IProps>(
  (props, ref) => {
    const [isStart, setIsStart] = useState(false);
    const [countdown, setCountdown] = useState(props.countdown || 60);

    useImperativeHandle(ref, () => ({ handleStart }), []);

    const handleStart = () => {
      setIsStart(true);
      const interval = setInterval(() => {
        setCountdown((preCountdown) => {
          const next = preCountdown - 1;

          if (next === 0) {
            setIsStart(false);
            clearInterval(interval);
            setCountdown(props.countdown || 60);
          }

          return next;
        });
      }, 1000);
    };

    return (
      <Button
        size={props.buttonSize || "large"}
        disabled={isStart}
        onClick={props.onClick}
      >
        {isStart ? countdown : props.initText || "倒计时"}
      </Button>
    );
  },
);

export default CountdownButton;
