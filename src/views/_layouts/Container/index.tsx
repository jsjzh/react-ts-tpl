import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";

import { Menu, MenuItemProps, MenuProps } from "antd";
import { routes } from "@/router";
import createProTree from "@/shared/createProTree";

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

// const menu: MenuProps["items"] = [
//   { key: "/dashboard/home", label: "首页" },
//   {
//     key: "/dashboard/todo",
//     label: "待办",
//     children: [{ key: "/dashboard/todo", label: "列表" }],
//   },
// ];

const Sider: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const [openKeys, setOpenKeys] = useState<(string | number)[]>([]);

  const handleClick: MenuProps["onClick"] = (props) => {
    navigate(props.key);
    setSelectedKeys([props.key]);
    // setOpenKeys([props.keyPath[props.keyPath.length - 1]]);
  };

  const menu = [
    { label: "首页", key: "/dashboard", onClick: handleClick },
    {
      label: "待办",
      key: "todo",
      children: [
        { label: "列表", key: "/dashboard/todo", onClick: handleClick },
        { label: "详情", key: "/dashboard/todo/123", onClick: handleClick },
      ],
    },
  ];

  useEffect(() => {
    setSelectedKeys([location.pathname]);
    setOpenKeys(
      createProTree(menu).pathBefore(location.pathname).slice(0, -1) as any,
    );
  }, []);

  return (
    <SiderContainer>
      <Menu
        mode="inline"
        style={{ height: "100%" }}
        selectedKeys={selectedKeys as any}
        openKeys={openKeys as any}
        items={menu}
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
