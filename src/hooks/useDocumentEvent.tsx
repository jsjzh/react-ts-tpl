import React, { useEffect } from "react";

const useDocumentEvent = <K extends keyof DocumentEventMap>(
  event: K,
  handle: (e: DocumentEventMap[K]) => void,
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
