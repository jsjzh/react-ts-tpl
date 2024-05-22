import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import { Link } from "react-router-dom";

interface IProps {}

const Login: React.FC<IProps> = (props) => {
  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  return (
    <PageWrapper>
      <div>Login</div>
      <Link to="/dashboard/home">home</Link>
    </PageWrapper>
  );
};

export default Login;
