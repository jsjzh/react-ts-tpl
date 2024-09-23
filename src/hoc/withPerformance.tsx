import React, { useEffect, useRef } from "react";

function withPerformance<T>(WrappedComponent: React.FC<T>) {
  return function WithPerformanceComponent(props: any) {
    const startTime = useRef(Date.now());

    useEffect(() => {
      const endTime = Date.now();
      const renderTime = endTime - startTime.current;
      console.log(`${WrappedComponent.name} render time: ${renderTime} ms`);
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withPerformance;
