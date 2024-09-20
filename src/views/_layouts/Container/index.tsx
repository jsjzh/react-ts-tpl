import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { menus } from "@/router";
import { path } from "@/shared/treeUtils";
import { Menu, MenuProps } from "antd";

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

const HeaderIcon = styled.span`
  font-weight: 600;
  padding: 0.4rem;
  border-radius: 8px;
  background-color: #eee;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderIcon>REACT-TS-TPL</HeaderIcon>
    </HeaderContainer>
  );
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

  useEffect(() => {
    setSelectedKeys([location.pathname]);
    // TODO
    // 如果仅仅解析 menus
    // 那对于 todo/detail 就无法定位至 todo/list
    // 需要对 routes 进行解析
    // 但是 routes 又包含了 layout 的信息
    // 则可能会获取到不正确的 path
    const menuPath = path(menus, location.pathname) as string[];
    setOpenKeys(menuPath);
  }, []);

  return (
    <SiderContainer>
      <Menu
        mode="inline"
        style={{ height: "100%" }}
        items={menus}
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
