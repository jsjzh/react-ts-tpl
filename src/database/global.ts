import createDB from "@/shared/createDB";

const db = createDB({ name: "global" });

interface GlobalData {
  name: string;
  age: number;
}

interface GlobalDataFunc<T = any> {
  get: () => Promise<T | null>;
  set: (value: T) => Promise<T>;
  remove: () => Promise<void>;
}

export const name: GlobalDataFunc<GlobalData["name"]> = {
  set: (value) => db.set("name", value),
  get: () => db.get("name"),
  remove: () => db.remove("name"),
};

export const age: GlobalDataFunc<GlobalData["age"]> = {
  set: (value) => db.set("age", value),
  get: () => db.get("age"),
  remove: () => db.remove("age"),
};
