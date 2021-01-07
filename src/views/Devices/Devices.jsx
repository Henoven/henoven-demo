import React from 'react';
import {Divider, Row, Tooltip, Button, List } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons';

import CardDeviceHeader from '../../components/Cards/CardDeviceHeader';
import CardDevice from '../../components/Cards/CardDevice';

const data = [
    {
        id:"1",
        code:"3Sf3d21f",
        name:"Camión 1",
        teamName:"Efímero",
        status:"Conectado",
    },
    {
        id:"2",
        code:"3Sf3d21f",
        name:"Camión 2",
        teamName:"Efímero",
        status:"Conectado",
    },
    {
        id:"3",
        code:"3Sf3d21f",
        name:"Camión 3",
        teamName:"Efímero",
        status:"Desconectado",
    },
];

const Devices = ({history, user}) =>{
    return(
        <>
            <Row align="middle" justify="end" style={{marginTop:10}}>
                <Tooltip title="Vincular nuevo dispositivo">
                    <Button shape="circle" icon={<PlusCircleOutlined style={{color:"#3498db", fontSize:25}}/>} />
                </Tooltip>
            </Row>
            <CardDeviceHeader
                code="Código"
                name="Nombre"
                teamName="Equipo"
                status="Estatus"/>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item style={{paddingBottom:1}}>
                        <CardDevice 
                            code={item.code} 
                            name={item.name}
                            teamName={item.teamName}
                            status={item.status}/>
                    </List.Item>
                    )}
            />
        </>
    );
}
export default Devices;