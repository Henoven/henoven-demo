import React from 'react';
import {Row, Col, Button, Tooltip, Popconfirm, Checkbox} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import styles from "./cardTeam.module.css"

const CardUser = ({title, onEdit, onExit, user,...rest}) =>{

    
    function onChange(e) {
        console.log(e.target.value);
    }
    return(
        <Row style={{backgroundColor: "white", width:"100%", height:"40px", fontSize:15, color:"#606060"}} align="middle">
            <Col flex="auto">
                <span style={{marginLeft:25, textAlign:"center"}}
                        onClick={onChange}
                        value={title}>{title}</span>
            </Col>
            <Col flex="end">
                <Row align="middle" justify="space-between">
                    <Tooltip title="Eliminar">
                        <Popconfirm 
                        placement="top"
                        title="¿Seguro que quieres eliminarlo del equipo?"
                        okText="Sí"
                        cancelText="No"
                        >
                            <Button shape="circle" icon={<DeleteOutlined style={{color:"#e74d3d"}}/>} />
                        </Popconfirm>
                    </Tooltip>
                </Row>
            </Col>            
        </Row>
    );
}

export default CardUser;