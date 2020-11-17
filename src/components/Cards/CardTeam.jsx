import React from 'react';
import {Row, Col, Button, Tooltip} from "antd";
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import styles from "./cardTeam.module.css"

const CardTeam = ({title, onEdit, onExit, idTeam,...rest}) =>{
    return(
        <Row style={{backgroundColor: "white", width:"100%", height:"40px", borderRadius:10, fontSize:15, color:"#606060"}} align="middle">
            <Col flex="auto">
                <span style={{marginLeft:25, textAlign:"center"}}>{title}</span>
            </Col>
            <Col flex="80px">
                <Row align="middle" justify="space-around">
                    <Tooltip title="Editar">
                        <Button shape="circle" icon={<EditOutlined style={{color:"#3498db"}}
                        onClick={()=> onEdit(idTeam)}/>} />
                    </Tooltip>
                    <Tooltip title="Salir">
                        <Button shape="circle" icon={<LogoutOutlined style={{color:"#e74d3d"}}
                        onClick={()=> onExit(idTeam)}/>} />
                    </Tooltip>
                </Row>
            </Col>            
        </Row>
    );
}

export default CardTeam;