import { clone as RClone } from "ramda";

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

const process = (treeData: ITreeData[]) => {
  const safeTreeData = clone(treeData);

  const handle = (
    _treeData: ITreeData[],
    parentKey: Key | null,
  ): IProcessTreeData[] => {
    return _treeData.map((item) => ({
      ...item,
      __parentKey: parentKey,
      children: item.children ? handle(item.children, item.key) : [],
    }));
  };

  return handle(safeTreeData, null);
};

export const clone = <T extends ITreeData[]>(treeData: T): T =>
  RClone<T>(treeData);

export const map = <T extends Omit<ITreeData, "children" | "key">>(
  treeData: ITreeData[],
  callback: (item: ITreeData) => T,
): T[] => {
  const safeTreeData = clone(treeData);

  const handle = <T extends Omit<ITreeData, "children">>(
    _treeData: ITreeData[],
    callback: (item: ITreeData) => T,
  ): T[] => {
    return _treeData.map((item) => ({
      ...callback(item),
      key: item.key,
      children: item.children ? handle(item.children, callback) : item.children,
    }));
  };

  return handle(safeTreeData, callback);
};

export const flat = (treeData: ITreeData[]): ITreeData[] => {
  const safeTreeData = clone(treeData);

  const handle = (_treeData: ITreeData[]): ITreeData[] => {
    return _treeData.reduce<ITreeData[]>((result, item) => {
      result.push(item);
      if (item.children) result.push(...flat(item.children));
      return result;
    }, []);
  };

  return handle(safeTreeData);
};

export const path = (
  treeData: ITreeData[],
  key: Key | null,
): (Key | null)[] => {
  const safeTreeData = clone(treeData);
  const processTreeData = process(safeTreeData);
  const flatTreeData = flat(processTreeData);

  const handle = (_treeData: ITreeData[], key: Key | null): (Key | null)[] => {
    const item = _treeData.find((item) => item.key === key);
    if (!item) return [];
    return [...path(_treeData, item.__parentKey), key];
  };

  return handle(flatTreeData, key);
};
