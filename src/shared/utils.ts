import { encode } from "js-base64";

export const sleepAsync = (timer: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, timer));

export const sleepSync = (timer: number) => {
  const current = Date.now();
  while (Date.now() - current < timer) {}
};

export const types = (
  obj: any,
):
  | "Number"
  | "String"
  | "Boolean"
  | "Object"
  | "Null"
  | "Undefined"
  | "Array"
  | "Function"
  | "Symbol"
  | "Date"
  | "BigInt"
  | "Map"
  | "Set"
  | "WeakMap"
  | "WeakSet"
  | "Promise"
  | "AsyncFunction"
  | string => {
  const matched = /^\[object (\w+)\]$/.exec(
    Object.prototype.toString.call(obj),
  );
  return matched ? matched[1] : "unknown";
};

types.isNumber = (x: any) => types(x) === "Number";

types.isString = (x: any) => types(x) === "String";

types.isBoolean = (x: any) => types(x) === "Boolean";

types.isObject = (x: any) => types(x) === "Object";

types.isNull = (x: any) => types(x) === "Null";

types.isUndefined = (x: any) => types(x) === "Undefined";

types.isArray = (x: any) => types(x) === "Array";

types.isFunction = (x: any) => types(x) === "Function";

types.isSymbol = (x: any) => types(x) === "Symbol";

types.isDate = (x: any) => types(x) === "Date";

types.isBigInt = (x: any) => types(x) === "BigInt";

types.isMap = (x: any) => types(x) === "Map";

types.isSet = (x: any) => types(x) === "Set";

types.isWeakMap = (x: any) => types(x) === "WeakMap";

types.isWeakSet = (x: any) => types(x) === "WeakSet";

types.isPromise = (x: any) => types(x) === "Promise";

types.isAsyncFunction = (x: any) => types(x) === "AsyncFunction";

export const phoneReg =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

export const isPhoneNumber = (phone: number | string) =>
  phoneReg.test(String(phone));

export const encodeBase64 = (pwd: string) => encode(pwd);

export const downloadFile = (fileName: string, blob: Blob) => {
  const aElement = document.createElement("a");
  aElement.setAttribute("download", fileName);
  const href = URL.createObjectURL(blob);
  aElement.href = href;
  aElement.setAttribute("target", "_blank");
  aElement.click();
  URL.revokeObjectURL(href);
};

export const createInitPageData = (
  values?: Partial<APP.PaginationResp<any>>,
) => ({
  items: [],
  pageNo: 1,
  pageSize: 10,
  totalPage: 0,
  totalSize: 0,
  ...(values || {}),
});

export const createInitPageQuery = <T extends { [k: string]: any }>(
  values?: T,
): T & { pageNo: number; pageSize: number } =>
  ({
    pageNo: 1,
    pageSize: 10,
    ...(values || {}),
  }) as any;

export const containerScrollToTop = () => {
  const container = document.getElementById("globalContentContainer");
  container?.scrollTo({ top: 0, behavior: "smooth" });
};

export const transUrl = (hash?: string) =>
  hash
    ? `${window.location.origin}${window.location.pathname}#${hash}`
    : `${window.location.origin}${window.location.pathname}`;
