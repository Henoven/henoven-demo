import React, {useState} from 'react';
import { Layout, Menu, Image } from 'antd';
import styles from "./mainPage.module.css";
//import {withRouther, Route, Redirect, Switch} from "react-router-dom";

import {
    HomeOutlined,
    GlobalOutlined,
    TeamOutlined,
    MobileOutlined,
    SettingOutlined
  } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
  
const MainPage = () =>{
    
    const [Collapsed, setCollapsed] = useState(false);

    return (
    <Layout className={styles.layout}>
        <Sider collapsible collapsed={Collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)} theme="light" className={styles.sider}>
          <Image src="http://henovenalfa.000webhostapp.com/resources/logo_henoven.png" preview={false} className={styles.logo}/>
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined style={{fontSize: "18px"}} />} className={styles.icon}>
              Inicio
            </Menu.Item>
            <Menu.Item key="2" icon={<GlobalOutlined style={{fontSize: "18px"}} />} className={styles.icon}>
              Mis Viajes
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined style={{fontSize: "18px"}} />} className={styles.icon}>
              Equipos
            </Menu.Item>
            <Menu.Item key="4" icon={<MobileOutlined style={{fontSize: "18px"}}/>} className={styles.icon}>
              Dispositivos
            </Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined style={{fontSize: "18px"}}/>} className={styles.icon}>
              Cuenta
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={styles.contentLayout}>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div>Holis</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Henoven ©2020 Created by Henoven</Footer>
        </Layout>
      </Layout>
    );
}

export default MainPage;