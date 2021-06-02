import React, {useEffect, useState} from 'react';
import { Layout, Menu, Image, Row } from 'antd';
import styles from "./mainPage.module.css";
import { useHistory } from 'react-router-dom';
import {
    GlobalOutlined,
    TeamOutlined,
    MobileOutlined,
    SettingOutlined,
    ImportOutlined,
    UserOutlined,
    ShopOutlined
  } from '@ant-design/icons';

import { doLogOut } from "../../redux/actions/sesion";
import Title from 'antd/lib/typography/Title';

const {SubMenu} = Menu;

const { Header, Content, Footer, Sider } = Layout;

const MainPage = ({children}) =>{
    const history = useHistory();
    const [Collapsed, setCollapsed] = useState(false);
    const [nameHeader, setNameHeader] = useState(null);
    const [route, setRoute] = useState(null);

    const menu = [
      {name: "mis viajes", route: "travels", iconComponent:"global_outlined"},
      {name: "equipos", route: "teams", iconComponent:"team_outlined"},
      {name: "dispositivos", route: "devices", iconComponent:"mobile_outlined"},
      {name: "almacen", route: "storage", iconComponent:"shop-outlined"},
    ];

    useEffect(()=>{
      const route = history?.location.pathname.slice(1);
      const newName = menu.find((item)=> item.route === route).name;
      setNameHeader(capitalizeFirstLetter(newName));
    }, [route]);
    
    
    const handleOnNavigate = (link) => {
      setRoute(link);
      history.push(`/${link}`);
    };

    function handleLogout(){
      doLogOut();
      handleOnNavigate("");
    }

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
        case "import-outlined":
            return <ImportOutlined style={{fontSize: "18px", color:"red"}} />  
        case "user-outlined":
            return <UserOutlined style={{fontSize: "18px"}} />  
        case "shop-outlined":
            return <ShopOutlined style={{fontSize: "18px"}} />  
        default:
          break;
      }
    }

    return (
    <Layout className={styles.layout}>
        <Sider 
          collapsible 
          collapsed={Collapsed} 
          onCollapse={(collapsed) => setCollapsed(collapsed)} 
          theme="light" 
          className={styles.sider}>
          {!Collapsed ? 
            <Image 
              src="http://henovenalfa.000webhostapp.com/resources/logo_henoven.png" 
              preview={false} 
              className={styles.logo}/> 
            :  
            <Image 
              src="http://henovenalfa.000webhostapp.com/resources/logo.png" 
              preview={false} 
              className={styles.logo}/> 
          }
          <Menu theme="light" mode="inline">
            {menu.map((menuItem, index)=> 
              <>
                <Menu.Item 
                  key={index} 
                  icon ={getIconComponent(menuItem.iconComponent)} 
                  onClick={()=> handleOnNavigate(menuItem.route)}>
                    {capitalizeFirstLetter(menuItem.name)}
                </Menu.Item>
                <Menu.Divider />
              </>  
            )}
          </Menu>
          <Menu >
            <SubMenu 
              title="Ajustes"
              icon={getIconComponent("setting_outlined")}>
                {/* When settings needed uncomment this lines */}
              {/* <Menu.Item 
                onClick={()=> handleOnNavigate("settings")}
                icon={getIconComponent("user-outlined")}>
                Cuenta
              </Menu.Item>
              <Menu.Divider/> */}
              <Menu.Item
                icon={getIconComponent("import-outlined")}
                onClick={()=> handleLogout()}>
                Cerrar sesión
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className={styles.contentLayout}>
          <Header style={{ padding: 0 }} >
            <Row justify="end" style={{padding:20}}>
              <Title level={3} style={{color:"white"}}>{nameHeader}</Title>
            </Row>
          </Header>
          <Content style={{ margin: '0 16px' }}>
              <div>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Henoven ©2020 Created by Henoven</Footer>
        </Layout>
      </Layout>
    );
}

export default MainPage;