import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import Header from "./header/header";
import { siderbarData } from "./sidebar/sidebar-mock-data";
import { logoIcon } from "../assets/icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

const MainLayout: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        width={245}
        style={{
          background: "white",
          height: "100vh",
        
          // overflow: "hidden",
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="flex gap-4 items-center p-3">
          <img className="w-16" src={logoIcon} alt="logo" />
          {!collapsed && (
            <span className="_easyology_sidebar text-3xl primary-color">Easyology</span>
          )}
        </div>
        <Menu
          className="font-semibold mt-3"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}

        >
          {siderbarData.map((data) => (
            <Menu.Item key={data.key} icon={data.icon}>
              <Link to={`${data.path}`}>{data.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <div className="flex">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Header />
        </div>
        <Content
          style={{
            // margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
