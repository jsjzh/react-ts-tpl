import React, { useEffect } from "react";

// 定义泛型函数 useDocumentEvent，K 必须是 DocumentEventMap 的一个键
// DocumentEventMap 是一个类型对象，包含了所有可以监听的文档事件及其对应的事件参数类型
const useDocumentEvent = <K extends keyof DocumentEventMap>(
  // 参数1：要监听的事件名称
  event: K,
  // 参数2：事件发生时的处理函数，传入事件对象作为参数
  handle: (e: DocumentEventMap[K]) => void,
  // 可选参数3：依赖项数组，类似于 useEffect 的依赖项，用于决定何时重新添加事件监听器
  deps?: React.DependencyList,
) => {
  // 使用 useEffect 钩子，当组件挂载时添加事件监听器
  useEffect(
    () => {
      // 添加事件监听器到文档对象
      document.addEventListener(event, handle);

      // 当组件卸载时，清理事件监听器
      return () => {
        // 移除事件监听器
        document.removeEventListener(event, handle);
      };
    }, // useEffect 的依赖项数组，若为空则始终只执行一次
    deps || [],
  ); // 若未提供依赖项，使用空数组，表示只在组件挂载和卸载时执行
};

// 导出 useDocumentEvent 以便在其他组件中使用
export default useDocumentEvent;
