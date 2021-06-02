import React, { useState, useEffect } from 'react';
import {Col, Row, Button, Badge, Switch } from "antd";
import { EditOutlined} from '@ant-design/icons';

const Statuses = {
    on: "processing",
    off: "default"
};

const CardDevice = ({
    code, 
    name, 
    status, 
    teamName, 
    onClick,
    onTurnOnOff,
    IdMotherBoard,
}) =>{
    const [isMotherBoardTurnedOn, setIsMotherBoardTurnedOn] = useState();

    useEffect(() => {
        setIsMotherBoardTurnedOn(status ? (status.Value === "on" ? true : false): false);
    }, [status]);

    const handleTurnOnOffMotherboard = (isTurnOn) =>{
        onTurnOnOff(isTurnOn, IdMotherBoard);
        setIsMotherBoardTurnedOn(!isTurnOn);
    }

    return(
        <>
            <Row 
                style={{
                    backgroundColor: "white", 
                    width:"95%", 
                    height:"40px", 
                    borderRadius:10,
                    fontSize:15, 
                    color:"#606060",
                    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
                }}
                align="middle"
                justify="space-around">
                    <Col span={4}>
                        <span style={{marginLeft:25, textAlign:"center", fontWeight:"bold"}}>{code}</span>
                    </Col>
                    <Col span={4}>
                        <span>{name}</span>
                    </Col>
                    <Col span={4}>
                        <span>{teamName}</span>
                    </Col>
                    <Col span={4}>
                        <Badge status={Statuses[status ? status.Value : "off"]} text={status ? status.Label : "Apagado"}/>
                    </Col>
                    <Col span={4}>
                        <Row justify="end" align="middle">
                            <Button   
                                style={{marginRight:10}}
                                shape="circle" 
                                icon={<EditOutlined style={{color:"#3498db"}}/>}
                                onClick={onClick} />
                            <Switch
                                checked={isMotherBoardTurnedOn}
                                onClick={() => handleTurnOnOffMotherboard(isMotherBoardTurnedOn)}
                            />
                        </Row>
                    </Col>
            </Row>
        </>
    );
}

export default CardDevice;