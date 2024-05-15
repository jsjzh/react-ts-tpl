// 添加类型注解
export default class ExtendableError extends Error {
  /**
   * 构造函数，接收一个可选的错误消息
   * @param message 错误消息，默认为空字符串
   */
  public constructor(message = "") {
    super(message);

    // 修复在继承Error时可能出现的message属性丢失问题
    Object.defineProperty(this, "message", {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true,
    });

    // 设置错误类的名称
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    // 如果Error类有captureStackTrace方法，使用它来设置堆栈跟踪
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      // 如果没有captureStackTrace，使用new Error(message)来获取堆栈跟踪
      Object.defineProperty(this, "stack", {
        configurable: true,
        enumerable: false,
        value: new Error(message).stack,
        writable: true,
      });
    }
  }
}
