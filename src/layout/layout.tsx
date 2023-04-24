import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Header from "./header/header";
import { sidebarData } from "./sidebar/sidebar-mock-data";
import { logoIcon } from "../assets/icons";
import sidebar_icon from '../assets/icons/layout/sidebar_icon.png';
import { Link, Outlet, useLocation } from "react-router-dom";
const { Sider, Content } = Layout;

const MainLayout: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const defaultSelectedIndex = sidebarData.findIndex(
    (item) => '/'+item.path === currentPath
  );

  

  return (
    <div className="_login_wrap">
      <Layout>
        <Sider
        className="xs:hidden md:block"

        // className="hidden md:flex"
        // className='${}'
        // width={collapsed ? 0 : 0}

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
            <img className="w-16 h-16" src={logoIcon} alt="logo" />
            {!collapsed && (
              <span className="_easyology_sidebar text-3xl _primary-color">
                Easyology
              </span>
            )}
          </div>
          <Menu

            className="font-semibold mt-3"
            theme="light"
            mode="inline"
            defaultSelectedKeys={[defaultSelectedIndex.toString()]}
          >
            {sidebarData.map((data) => (
              <Menu.Item key={data.key} icon={data.icon}>
                <Link to={`${data.path}`}>{data.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <div className="flex">
            {React.createElement(


              collapsed ? 'img' : 'img',
              {
                src: sidebar_icon,
                className: "trigger _logo_menu",
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
    </div>
  );
};

export default MainLayout;
