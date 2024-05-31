import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Menu, MenuProps } from "antd";
import { path } from "@/shared/treeUtils";
import { routes } from "@/router";

const styles: { [k: string]: string | number } = {
  headerHeight: "4rem",
  siderWidth: "16rem",
};

const Container = styled.div`
  display: flex;
`;

const LayoutContainer: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Sider />
        <Content />
      </Container>
    </>
  );
};

export default LayoutContainer;

const HeaderContainer = styled.div`
  height: ${styles.headerHeight};
  line-height: ${styles.headerHeight};
  padding-left: 2rem;
  padding-right: 2rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 999;
`;

const Header: React.FC = () => {
  return <HeaderContainer>123</HeaderContainer>;
};

const SiderContainer = styled.div`
  width: ${styles.siderWidth};
  height: calc(100vh - ${styles.headerHeight});
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  overflow: auto;
`;

const Sider: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleClick: MenuProps["onClick"] = (props) => {
    setSelectedKeys([props.key]);
    navigate(props.key);
  };

  const handleOpenChange: MenuProps["onOpenChange"] = (props) => {
    setOpenKeys(props);
  };

  const parseRoutes = () => {};

  console.log(routes);

  const menu = [
    { label: "首页", key: "/dashboard" },
    {
      label: "待办",
      key: "todo",
      children: [{ label: "列表", key: "/dashboard/todo" }],
    },
  ];

  useEffect(() => {
    setSelectedKeys([location.pathname]);
    const menuPath = path(menu, location.pathname) as string[];
    setOpenKeys(menuPath);
  }, []);

  return (
    <SiderContainer>
      <Menu
        mode="inline"
        style={{ height: "100%" }}
        items={menu}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
      />
    </SiderContainer>
  );
};

const ContentContainer = styled.div`
  flex: 1;
  overflow: auto;
  height: calc(100vh - ${styles.headerHeight});
`;

const Content: React.FC = () => {
  return (
    <ContentContainer id="globalContentContainer">
      <Outlet />
    </ContentContainer>
  );
};
