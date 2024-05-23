import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Menu, MenuProps } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IRoute, routes } from "@/router";
import { containerScrollToTop } from "@/shared/utils";

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

// const items: MenuProps["items"] = [
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// ].map((icon, index) => {
//   return routes.map((route) => ({
//     key: route.path,
//     icon: React.createElement(icon),
//     label: route.title,
//   }));

//   // const key = String(index + 1);

//   // return {
//   //   key: `sub${key}`,
//   //   icon: React.createElement(icon),
//   //   label: `subnav ${key}`,

//   //   children: new Array(3).fill(null).map((_, j) => {
//   //     const subKey = index * 4 + j + 1;
//   //     return {
//   //       key: subKey,
//   //       label: `option${subKey}`,
//   //     };
//   //   }),
//   // };
// });

type MenuItem = Required<MenuProps>["items"][number];

const Sider: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menu, setMenu] = useState<MenuItem[]>([]);

  const generateSiderTree = (routes: IRoute[]) => {
    const result: MenuItem[] = [];

    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];

      if (route.hide) continue;

      let item: MenuItem = {
        icon: route.icon,
        key: route.path,
        label: route.title,
        onClick: (e: any) => {
          if (!route.children) {
            containerScrollToTop();
            navigate(e.key);
          }
        },
      };

      if (Array.isArray(route.children) && route.children.length) {
        if (route.children.length === 1) {
          const current = route.children[0];
          item = {
            icon: item.icon,
            key: current.path,
            label: current.title,
            onClick: (e: any) => {
              containerScrollToTop();
              navigate(current.path);
            },
          };
        } else {
          (item as any).children = generateSiderTree(route.children);
        }
      }

      result.push(item);
    }

    return result;
  };

  useEffect(() => {
    setMenu(generateSiderTree(routes));
  }, []);

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
