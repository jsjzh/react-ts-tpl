import { curry } from "ramda";

const curryPickObjToOption = curry(
  (format: { value: string; label: string }, data: { [k: string]: any }) => ({
    value: data[format.value],
    label: data[format.label],
  }),
);

export const pickCodeAndName = curryPickObjToOption({
  value: "code",
  label: "name",
});
