import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import { Link, json, useLoaderData } from "react-router-dom";

export const loader = () => {
  console.log("loader");
};

export const Component = () => {
  // const data = useLoaderData();
  // console.log(data);

  return (
    <PageWrapper>
      <div>Login</div>
      <Link to="/dashboard/home" state={{ from: "login" }}>
        home
      </Link>
    </PageWrapper>
  );
};

Component.displayName = "SampleLazyRoute";

// interface IProps {}

// const Login: React.FC<IProps> = (props) => {
//   // const [pageData, updatePageData] = useImmer<{}>({});
//   // const [pageStatus, updatePageStatus] = useImmer<{}>({});
//   // const [pageTempData, updatePageTempData] = useImmer<{}>({});

//   const data = useLoaderData();

//   console.log(data);

//   // throw json(
//   //   {
//   //     sorry: "You have been fired.",
//   //     hrEmail: "hr@bigco.com",
//   //   },
//   //   { status: 401 },
//   // );

//   // console.log(data);

//   return (
//     <PageWrapper>
//       <div>Login</div>
//       <Link to="/dashboard/home" state={{ from: "login" }}>
//         home
//       </Link>
//     </PageWrapper>
//   );
// };

// export default Login;
