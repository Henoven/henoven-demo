import React, { useState, useEffect } from 'react';
import {Col, Row, Button, Badge, Switch, message } from "antd";
import { EditOutlined} from '@ant-design/icons';
import axios from "../../axios";

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
    IdMotherBoard
}) =>{

    const [isMotherBoardTurnedOn, setIsMotherBoardTurnedOn] = useState(status.Value === "on" ? true : false);

    useEffect(() => {
        setIsMotherBoardTurnedOn(status.Value === "on" ? true : false);
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
                    borderWidth:1, 
                    borderColor:"#a0a0a0",
                    borderStyle:"solid",
                    fontSize:15, 
                    color:"#606060"
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
                        <Badge status={Statuses[status.Value]} text={status.Label}/>
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