import React from 'react';
import {Row, Col, Button, Tooltip, Popconfirm, Checkbox} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import styles from "./cardTeam.module.css"

const CardUser = ({title, onChange, onDeleteTeammate, user, canUserSeeDetailTravel}) =>{
    
    return(
        <Row style={{backgroundColor: "white", width:"100%", height:"40px", fontSize:15, color:"#606060"}} align="middle">
            <Col flex={4}>
                <span style={{marginLeft:25, textAlign:"center"}}>{title}</span>
            </Col>
            <Col flex="auto">
                <Checkbox onChange={(e)=> onChange(e, user.IdUser)}
                        checked={canUserSeeDetailTravel}>Ver detalle de viaje</Checkbox>
            </Col>
            <Col flex={1}>
                <Row align="middle" justify="space-around">
                    <Tooltip title="Eliminar">
                        <Popconfirm 
                        placement="top"
                        title="¿Seguro que quieres eliminarlo del equipo?"
                        okText="Sí"
                        onConfirm={() => onDeleteTeammate(user)}
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