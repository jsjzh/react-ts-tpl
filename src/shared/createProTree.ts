import { clone } from "ramda";

type Key = string | number;

interface ITreeData {
  key: Key;
  children?: ITreeData[];
  [k: string]: any;
}

interface IProcessTreeData extends ITreeData {
  children: IProcessTreeData[];
  __parentKey: Key | null;
}

interface IOptions {
  customKey?: string;
  customChildren?: string;
  // undefinedChildren?: Key;
}

class ProTree {
  private originalTreeData: ITreeData[];
  private flatTreeData: IProcessTreeData[];
  private processTreeData: IProcessTreeData[];

  private options: Required<IOptions>;

  public constructor(treeData: ITreeData[], options: IOptions) {
    this.originalTreeData = clone(treeData);
    this.processTreeData = this.process(this.originalTreeData, null);
    this.flatTreeData = this.flat(this.processTreeData);

    this.options = {
      customKey: options.customKey || "key",
      customChildren: options.customChildren || "children",
    };
  }

  public pathBefore(key: Key | null): (Key | null)[] {
    const item = this.flatTreeData.find((item) => item.key === key);
    if (!item) return [];
    return [...this.pathBefore(item.__parentKey), key];
  }

  public deepMap<T extends Omit<ITreeData, "children" | "key">>(
    callback: (item: ITreeData) => T,
  ): T[] {
    const handle = <T extends Omit<ITreeData, "children">>(
      treeData: ITreeData[],
      callback: (item: ITreeData) => T,
    ): T[] => {
      return treeData.map((item) => ({
        ...callback(item),
        key: item.key,
        children: item.children
          ? handle(item.children, callback)
          : item.children,
      }));
    };

    return handle(this.processTreeData, callback);
  }

  private process(
    treeData: ITreeData[],
    parentKey: Key | null,
  ): IProcessTreeData[] {
    return treeData.map((item) => ({
      ...item,
      __parentKey: parentKey,
      children: item.children ? this.process(item.children, item.key) : [],
    }));
  }

  private flat(treeData: IProcessTreeData[]): IProcessTreeData[] {
    return treeData.reduce<IProcessTreeData[]>((result, item) => {
      result.push(item);
      if (item.children) result.push(...this.flat(item.children));
      return result;
    }, []);
  }
}

const createProTree = (treeData: ITreeData[], options?: IOptions): ProTree => {
  return new ProTree(treeData, options || {});
};

export default createProTree;

const treeData: ITreeData[] = [
  {
    key: 1,
    children: [
      { key: 11 },
      { key: 12 },
      { key: 13, children: [{ key: 131, children: [{ key: 1311 }] }] },
      { key: 14 },
    ],
  },
  {
    key: 2,
    children: [
      {
        key: 21,
        children: [
          {
            key: 211,
            children: [
              {
                key: 2111,
                children: [{ key: 21111, children: [{ key: 211111 }] }],
              },
            ],
          },
        ],
      },
      { key: 22 },
      { key: 23, children: [{ key: 231 }] },
      { key: 24, children: [{ key: 241 }] },
    ],
  },
  { key: 3, children: [{ key: 31 }, { key: 32 }, { key: 33 }, { key: 34 }] },
  {
    key: 4,
    children: [
      { key: 41, children: [{ key: 411, children: [{ key: 4111 }] }] },
      { key: 42 },
      {
        key: 43,
        children: [
          { key: 431, children: [{ key: 4311, children: [{ key: 43111 }] }] },
        ],
      },
      { key: 44 },
    ],
  },
  { key: 5, children: [{ key: 51 }, { key: 52 }, { key: 53 }, { key: 54 }] },
];

const proTree = createProTree(treeData, {});

console.log(
  proTree.deepMap((item) => ({
    path: item.key,
  })),
);

// console.log(proTree.pathBefore(211111));
// console.log(proTree.pathAfter(1));
