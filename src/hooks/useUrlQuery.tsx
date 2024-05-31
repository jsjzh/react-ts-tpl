import { useLocation, useParams } from "react-router-dom";
import qs from "query-string";

const useUrlQuery = <T extends { [k: string]: any }>(): T => {
  const location = useLocation();
  const param = useParams() as any;
  const query = qs.parse(location.search) as any;
  return { ...query, ...param };
};

export default useUrlQuery;
