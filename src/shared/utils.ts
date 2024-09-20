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

export const encodeBase64 = (str: string) => window.btoa(str);

export const decodeBase64 = (b64: string) => window.atob(b64);

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
  }) as any;

export const containerScrollToTop = () => {
  const container = document.getElementById("globalContentContainer");
  container?.scrollTo({ top: 0, behavior: "smooth" });
};
