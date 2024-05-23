import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Menu } from "antd";

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
  height: 3.5rem;
  line-height: 3.5rem;
  text-align: right;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 999;
`;

const Header: React.FC = () => {
  return <HeaderContainer>123</HeaderContainer>;
};

const SiderContainer = styled.div`
  width: 14rem;
  height: calc(100vh - 3.5rem);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  overflow: auto;
`;

const Sider: React.FC = () => {
  return (
    <SiderContainer>
      <Menu
        mode="inline"
        style={{ height: "100%" }}
        // TODO 这里感觉有些问题，应该是用 pathtree 向上寻址来完成
        // 但是因为统一的路径命名规范，所以用 split 来分割也行
        defaultOpenKeys={[`/${location.pathname.split("/")[1]}`]}
        selectedKeys={[location.pathname]}
        items={[]}
      />
    </SiderContainer>
  );
};

const ContentContainer = styled.div`
  flex: 1;
  overflow: auto;
  height: calc(100vh - 3.5rem);
`;

const Content: React.FC = () => {
  return (
    <ContentContainer id="globalContentContainer">
      <Outlet />
    </ContentContainer>
  );
};
