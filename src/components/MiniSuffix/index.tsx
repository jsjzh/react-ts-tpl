import { isPositive } from "@/shared/utils";

interface MiniSuffixIprops {
  label: string | number;
  color: string;
  prefix?: string;
  suffix?: string;

  onClick?: () => void;
}

const MiniSuffix = (props: MiniSuffixIprops) => {
  return (
    <span
      style={{
        fontSize: "0.8rem",
        fontWeight: 600,
        color: props.color,
        cursor: props.onClick ? "pointer" : "",
      }}
      onClick={props.onClick}
    >
      {props.prefix || ""}
      {props.label}
      {props.suffix || ""}
    </span>
  );
};

export const suffixNumTColor = (count: number | null) =>
  count === null ? "" : isPositive(count) ? "#f44336" : "#009688";

export const suffixNumTUnit = (count: number | null) =>
  count === null ? "" : isPositive(count) ? "+" : "";

export default MiniSuffix;
