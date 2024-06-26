import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import useDemoStore from "@/stores/demo";

interface IProps {}

const Homepage: React.FC<IProps> = (props) => {
  const { db, update } = useDemoStore((state) => ({
    db: state.Demo,
    update: state.updateDemo,
  }));

  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  return (
    <PageWrapper>
      <div>{JSON.stringify(db)}</div>
    </PageWrapper>
  );
};

export default Homepage;
