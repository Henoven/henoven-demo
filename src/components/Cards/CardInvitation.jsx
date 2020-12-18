import React from 'react';
import {Row, Col, Button, Tooltip, Popconfirm, Badge} from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styles from "./cardTeam.module.css"

const CardInvitation = ({title, onConfirm, onReject, idTeam, status, userWhoSendInvitationName}) =>{
    return(
        <Row style={{backgroundColor: "white", width:"100%", height:"40px", borderRadius:10, fontSize:15, color:"#606060"}} align="middle">
            <Col flex="5">
                <span style={{marginLeft:25, textAlign:"center"}}>{title}</span>
            </Col>
            <Col flex="1">
                <span>{"Invitación de: "+ userWhoSendInvitationName}</span>
            </Col>
            <Col flex=".5">
                <Badge status="processing" text={status.Label}/>
            </Col>
            <Col flex="80px">
                <Row align="middle" justify="space-around">
                    <Tooltip title="Aceptar">
                        <Button shape="circle" icon={<CheckCircleOutlined style={{color:"#52c41a", fontSize:25}}
                        onClick={()=> onConfirm(idTeam)}/>} />
                    </Tooltip>
                    <Tooltip title="Rechazar">
                        <Popconfirm 
                        placement="topLeft"
                        title="¿Seguro que quieres rechazar la invitación?"
                        onConfirm={()=> onReject(idTeam)}
                        okText="Sí"
                        cancelText="No"
                        >
                            <Button shape="circle" icon={<CloseCircleOutlined style={{color:"#e74d3d", fontSize:25}}/>} />
                        </Popconfirm>
                    </Tooltip>
                </Row>
            </Col>            
        </Row>
    );
}

export default CardInvitation;