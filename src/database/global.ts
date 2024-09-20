import createDB from "@/shared/createDB";

interface GlobalData {}

const db = createDB({ name: "global" });

export const appData = {
  set: (value: { [k: string]: boolean }) =>
    db.set<{ [k: string]: boolean }>("appData", value),
  get: () => db.get<{ [k: string]: boolean }>("appData"),
  remove: () => db.remove("appData"),
};
