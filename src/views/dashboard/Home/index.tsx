import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import { useDashboardStore } from "@/stores";

interface IProps {}

const Home: React.FC<IProps> = (props) => {
  const { db, update } = useDashboardStore((state) => ({
    db: state.Home,
    update: state.updateHome,
  }));

  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  return (
    <PageWrapper>
      <div>home</div>
    </PageWrapper>
  );
};

export default Home;
