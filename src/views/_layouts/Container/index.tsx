import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Menu, MenuProps } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

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

const items: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(3).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const Sider: React.FC = () => {
  const location = useLocation();

  return (
    <SiderContainer>
      <Menu
        mode="inline"
        style={{ height: "100%" }}
        // TODO
        // 这里感觉有些问题，应该是用 pathtree 向上寻址来完成
        // 但是因为统一的路径命名规范，所以用 split 来分割也行
        defaultOpenKeys={[`/${location.pathname.split("/")[1]}`]}
        selectedKeys={[location.pathname]}
        items={items}
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
