import localforage from "localforage";

const createDB = (options: {
  name: string;
  storeName?: string;
  driver?: string | string[];
  size?: number;
  version?: number;
  description?: string;
}) => {
  const db = localforage.createInstance(options);

  return {
    __db: db,
    set: <T = any>(key: string, value: any) => db.setItem<T>(key, value),
    get: <T = any>(key: string) => db.getItem<T>(key),
    remove: (key: string) => db.removeItem(key),
    clear: () => db.clear(),
  };
};

export default createDB;
