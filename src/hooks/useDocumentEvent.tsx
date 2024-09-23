import React, { useEffect } from "react";

const useDocumentEvent = <T extends keyof DocumentEventMap>(
  event: T,
  handle: (e: DocumentEventMap[T]) => void,
  deps?: React.DependencyList,
) => {
  useEffect(() => {
    document.addEventListener(event, handle);
    return () => {
      document.removeEventListener(event, handle);
    };
  }, deps || []);
};

export default useDocumentEvent;
