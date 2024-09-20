import queryString from "query-string";
import { useLocation, useParams } from "react-router-dom";

const useUrlQuery = <T extends { [k: string]: any }>(): T => {
  const location = useLocation();
  const param = useParams() as any;
  const query = queryString.parse(location.search) as any;
  return { ...query, ...param };
};

export default useUrlQuery;
