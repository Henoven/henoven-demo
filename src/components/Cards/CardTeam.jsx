import React from 'react';
import {Row, Col, Button, Tooltip, Popconfirm} from "antd";
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';

const CardTeam = ({title, onEdit, onExit, idTeam,...rest}) =>{
    return(
        <Row 
            style={{
                backgroundColor:"white",
                width:"95%",  
                height:"40px", 
                borderRadius:10, 
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
                fontSize:15, 
                color:"#606060"
            }} 
            align="middle">
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
                        <Popconfirm 
                        placement="topLeft"
                        title="¿Seguro que quieres salir del equipo?"
                        onConfirm={()=>onExit(idTeam)}
                        okText="Sí"
                        cancelText="No"
                        >
                            <Button shape="circle" icon={<LogoutOutlined style={{color:"#e74d3d"}}/>} />
                        </Popconfirm>
                    </Tooltip>
                </Row>
            </Col>            
        </Row>
    );
}

export default CardTeam;