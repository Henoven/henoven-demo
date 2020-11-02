import React, {useState, useEffect} from 'react';
import { Layout, Menu, Image } from 'antd';
import styles from "./mainPage.module.css";
import { useHistory } from 'react-router-dom';

import {
    HomeOutlined,
    GlobalOutlined,
    TeamOutlined,
    MobileOutlined,
    SettingOutlined
  } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
  {/* <Menu.Item key="1" icon={<HomeOutlined style={{fontSize: "18px"}} />} className={styles.icon}>
              Inicio
            </Menu.Item>
            <Menu.Item key="2" icon={<GlobalOutlined style={{fontSize: "18px"}} />} className={styles.icon}
            onClick = {()=> handleOnNavigate("travels")}>
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
            </Menu.Item> */}
const MainPage = ({children}) =>{
    const menu = [
        // {name: "inicio", route: "teams"},
        {name: "mis viajes", route: "travels", iconComponent:"global_outlined"},
        {name: "equipos", route: "teams", iconComponent:"team_outlined"},
        {name: "dispositivos", route: "devices", iconComponent:"mobile_outlined"},
        {name: "cuenta", route: "settings", iconComponent:"setting_outlined"},
    ];
    const history = useHistory();
    const [Collapsed, setCollapsed] = useState(false);
    const handleOnNavigate = (link) => {
      console.log(link);
      history.push(`/${link}`);
    };
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function getIconComponent(icon){
      switch(icon){
        case "global_outlined":
            return <GlobalOutlined style={{fontSize: "18px"}} />;
        case "team_outlined":
            return <TeamOutlined style={{fontSize: "18px"}} />;
        case "mobile_outlined":
            return <MobileOutlined style={{fontSize: "18px"}} />;
        case "setting_outlined": 
            return <SettingOutlined style={{fontSize: "18px"}} />;
        default:
          break;
      }
    }

    return (
    <Layout className={styles.layout}>
        <Sider collapsible collapsed={Collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)} theme="light" className={styles.sider}>
          <Image src="http://henovenalfa.000webhostapp.com/resources/logo_henoven.png" preview={false} className={styles.logo}/>
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {menu.map((menuItem, index)=> 
            <Menu.Item key={index} icon ={getIconComponent(menuItem.iconComponent)} onClick={()=> handleOnNavigate(menuItem.route)}>{capitalizeFirstLetter(menuItem.name)}</Menu.Item>)}
          </Menu>
        </Sider>
        <Layout className={styles.contentLayout}>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
              <div>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Henoven ©2020 Created by Henoven</Footer>
        </Layout>
      </Layout>
    );
}

export default MainPage;