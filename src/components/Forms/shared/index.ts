import { curry } from "ramda";

const curryPickObjToOption = curry(
  (format: { value: string; label: string }, data: { [k: string]: any }) => ({
    value: data[format.value],
    label: data[format.label],
  }),
);

export const pickIdAndCode = curryPickObjToOption({
  value: "id",
  label: "code",
});

export const pickIdAndName = curryPickObjToOption({
  value: "id",
  label: "name",
});

export const pickCodeAndName = curryPickObjToOption({
  value: "code",
  label: "name",
});

export const pickNodeIdAndNodeName = curryPickObjToOption({
  value: "businessNodeId",
  label: "businessNodeName",
});
