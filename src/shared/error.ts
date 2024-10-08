export default class ExtendableError extends Error {
  public constructor(message = "") {
    super(message);

    Object.defineProperty(this, "message", {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true,
    });

    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    if (Error.hasOwnProperty("captureStackTrace")) {
      Error.captureStackTrace(this, this.constructor);
      return;
    }

    Object.defineProperty(this, "stack", {
      configurable: true,
      enumerable: false,
      value: new Error(message).stack,
      writable: true,
    });
  }
}
