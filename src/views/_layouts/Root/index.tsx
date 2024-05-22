import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const LayoutRoot: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  console.log("location", location);
  console.log("params", params);

  // const history = createBrowserHistory();
  // history.listen(({ location, action }) => {
  //   // this is called whenever new locations come in
  //   // the action is POP, PUSH, or REPLACE
  // });

  let locations = {
    pathname: "/bbq/pig-pickins",
    search: "?campaign=instagram&campaign=instagram2&popular=true",
    hash: "",
    state: null,
    key: "aefz24ie",
  };

  const query = new URLSearchParams(locations.search);
  console.log(query);
  console.log(query.getAll("campaign"));

  // https://reactrouter.com/en/main/start/tutorial#tutorial
  // https://reactrouter.com/en/main/route/route#children
  // https://reactrouter.com/en/main/start/concepts#match-params

  return <Outlet />;
};

export default LayoutRoot;
