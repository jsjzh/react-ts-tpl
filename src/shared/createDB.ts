import localforage from "localforage";

/**
 * 创建一个封装了localForage实例的数据库对象，提供简化的方法来操作数据存储。
 *
 * @param options - 创建数据库实例所需的配置选项。
 * @param options.name - 数据库名称，必填。
 * @param options.storeName - 存储名称，默认为`name`的值。
 * @param options.driver - 指定存储驱动，可以是字符串或字符串数组，用于优先选择存储方式。
 * @param options.size - 数据库大小（仅限某些驱动，如IndexedDB）。
 * @param options.version - 数据库版本号。
 * @param options.description - 数据库描述信息。
 * @returns 返回一个包含数据库操作方法的对象。
 */
const createDB = (options: {
  name: string;
  storeName?: string;
  driver?: string | string[];
  size?: number;
  version?: number;
  description?: string;
}) => {
  // 使用提供的选项创建一个localForage实例
  const db = localforage.createInstance(options);

  // 封装数据库操作方法
  return {
    // 内部数据库实例，虽然暴露但通常不直接操作
    __db: db,

    // 设置键值对
    set: <T = any>(key: string, value: T) => db.setItem(key, value),

    // 获取键对应的值
    get: <T = any>(key: string) => db.getItem<T>(key),

    // 删除指定键
    remove: (key: string) => db.removeItem(key),

    // 清空整个数据库
    clear: () => db.clear(),
  };
};

export default createDB;
