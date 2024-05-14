import { encode } from "js-base64";

/**
 * 异步延迟函数
 * 创建一个Promise，在指定的延迟时间（毫秒）后自动解析，无返回值。
 * 用于异步操作中的等待或流程控制。
 *
 * @param timer 延迟时间，单位为毫秒
 * @returns 返回一个在延迟时间后解析的Promise
 */
export const sleepAsync = async (timer: number): Promise<void> => {
  return new Promise<void>((resolve) => setTimeout(resolve, timer));
};

// 使用示例：
// (async () => {
//   console.log('开始等待...');
//   await sleepAsync(2000); // 等待2秒
//   console.log('等待结束！');
// })();

/**
 * 不推荐的同步延迟函数
 * 通过循环检查时间差来实现同步延迟，这会阻塞整个JavaScript执行线程。
 * 避免在生产环境中使用，因为会导致应用无响应。
 *
 * @param timer 延迟时间，单位为毫秒
 */
export const sleepSync = (timer: number): void => {
  const current = Date.now();
  while (Date.now() - current < timer) {
    // 这里是忙等待，不推荐在生产环境中使用
  }
};

// 使用示例（不建议在实际项目中使用此函数）
// sleepSync(2000); // 应用将在此处阻塞2秒

export const phoneReg =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

export const isPhoneNumber = (phone: number | string) =>
  phoneReg.test(String(phone));

export const encodeBase64 = (pwd: string) => encode(pwd);

/**
 * 下载Blob数据为指定名称的文件
 * @param fileName 文件名，包括扩展名
 * @param blob 要下载的Blob对象
 */
export const downloadFile = (fileName: string, blob: Blob): void => {
  try {
    // 创建隐藏的<a>标签
    const aElement = document.createElement("a");
    document.body.appendChild(aElement); // 将元素临时添加到DOM，以便能触发点击事件

    // 设置下载属性和文件名
    aElement.setAttribute("download", fileName);

    // 创建Blob URL供下载使用
    const href = URL.createObjectURL(blob);
    aElement.href = href;

    // 设置目标为新窗口打开，避免页面跳转（可选，根据需求决定是否保留）
    // aElement.setAttribute("target", "_blank"); // 注释此行，根据实际情况决定是否需要新窗口打开

    // 模拟点击以触发下载
    aElement.click();

    // 清理释放创建的Blob URL，避免内存泄漏
    URL.revokeObjectURL(href);

    // 完成后从DOM中移除临时元素
    document.body.removeChild(aElement);
  } catch (error) {
    console.error("下载文件时发生错误:", error);
  }
};

export const createInitPageData = <T>(
  values: Partial<BASE.PaginationResp<T>> = {},
): BASE.PaginationResp<T> => ({
  items: [],
  pageNo: 1,
  pageSize: 10,
  totalPage: 0,
  totalSize: 0,
  ...values,
});

export const createInitPageQuery = <T extends { [k: string]: any }>(
  values?: T,
): T & { pageNo: number; pageSize: number } =>
  ({
    pageNo: 1,
    pageSize: 10,
    ...(values || {}),
  } as any);

export const containerScrollToTop = () => {
  const container = document.getElementById("globalContentContainer");
  container?.scrollTo({ top: 0, behavior: "smooth" });
};

export const transUrl = (hash?: string) =>
  hash
    ? `${window.location.origin}${window.location.pathname}#${hash}`
    : `${window.location.origin}${window.location.pathname}`;
