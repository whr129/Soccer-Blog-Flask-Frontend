import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, UnorderedListOutlined, BookOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import styles from './index.module.scss';
import { Navigate } from "react-router-dom";
import { getRoles } from "../utils/token";
import type { MenuProps } from "antd";

const Layouts = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const [ roleList, setRoleList ] = useState<Array<string>>()
    const [ isOwner, setIsOwner ]= useState<boolean | undefined>(false);
    const navigate = useNavigate();
    useEffect(() => {
      const roles: string | undefined = getRoles();
      setRoleList(roles?.split(','));
      const owner: boolean | undefined = roles?.split(',').some(element => element.includes('-A'));
      setIsOwner(owner);
    }, [])
    const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
        (icon, index) => ({
          key: String(index + 1),
          icon: React.createElement(icon),
          label: `nav ${index + 1}`,
        }),
      );
    const menuList_all_admin = [
      {
        key: '/user-info',
        icon: <UserOutlined />,
        label: 'User Info',
      },
      {
        key: '/user-management',
        icon: <UnorderedListOutlined />,
        label: 'User Management',
      },
      {
        key: '/group-management',
        icon: <BookOutlined />,
        label: 'Group Management'
      },
      {
        key: '/group',
        icon: <BookOutlined />,
        label: 'Groups'
      },
    ];
    const menuList_group_owner = [
      {
        key: '/user-info',
        icon: <UserOutlined />,
        label: 'User Info',
      },
      {
        key: '/group-management',
        icon: <BookOutlined />,
        label: 'Group Management'
      },
      {
        key: '/group',
        icon: <BookOutlined />,
        label: 'Groups'
      },
    ];
    const menuList_user = [
      {
        key: '/user-info',
        icon: <UserOutlined />,
        label: 'User Info',
      },
      {
        key: '/group',
        icon: <BookOutlined />,
        label: 'Groups'
      },
    ];
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const onMenuChange : MenuProps['onClick'] = (e) => {
      navigate('/personal-center' + e.key)
    };
    return (
            <Layout className={styles.wrapPage}>
                 <Sider
                    collapsible
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                    console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                    }}
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
                >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={roleList?.includes('ALL-ADMIN') ? menuList_all_admin : isOwner? menuList_group_owner : menuList_user} onClick={onMenuChange}/>
                </Sider>
            <Layout style={{marginLeft: 200}}>
                {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}> 
                    <Outlet />
                </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
            </Layout>
            </Layout>
    )
}

export default Layouts