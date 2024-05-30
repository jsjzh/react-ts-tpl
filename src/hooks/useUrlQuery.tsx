import { useLocation } from "react-router-dom";
import qs from "query-string";

const useUrlQuery = <T extends { [k: string]: any }>(): T => {
  const location = useLocation();
  return qs.parse(location.search) as T;
};

export default useUrlQuery;
