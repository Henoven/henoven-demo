import React from 'react';
import {Col, Row, Badge} from "antd";

const CardDeviceHeader = ({code, name, status, teamName}) =>{
    return(
        <Row 
            style={{
                backgroundColor: "#15497d", 
                width:"95%", 
                height:"40px", 
                borderRadius:10,
                borderWidth:3, 
                borderColor:"black",
                fontSize:15, 
                color:"white"
            }} 
            align="middle"
            justify="space-around">
                <Col span={4}>
                    <span style={{marginLeft:25, textAlign:"center"}}>{code}</span>
                </Col>
                <Col span={4}>
                    <span>{name}</span>
                </Col>
                <Col span={4}>
                    <span>{teamName}</span>
                </Col>
                <Col span={4}>
                    <Badge style={{color:"white"}} status="processing" text={status} color="green" />
                </Col>
                <Col span={4}>
                </Col>
        </Row>
    );
}

export default CardDeviceHeader;