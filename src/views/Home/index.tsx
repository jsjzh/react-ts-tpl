import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import useDemoStore from "@/stores/demo";
import { useLocation } from "react-router-dom";

interface IProps {}

const Home: React.FC<IProps> = (props) => {
  const { db, update } = useDemoStore((state) => ({
    db: state.Demo,
    update: state.updateDemo,
  }));

  const location = useLocation();

  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  return (
    <PageWrapper>
      <div>from location.state: {JSON.stringify(location.state)}</div>
    </PageWrapper>
  );
};

export default Home;
