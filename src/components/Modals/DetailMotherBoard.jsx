import React, { useState, useEffect } from 'react';
import { Badge, Button, Col, Divider, Input, Modal, message, Row, Typography, List, Select, Switch } from "antd";
import axios from "../../axios";

import ItemSensor from "../../components/ItemSensor";

const { Title } = Typography;

const OptionsSample = () =>{
    const maxSampleTime=60;
    let options = [];
    for(let i=1; i<=maxSampleTime; i++){
        options.push({
            Label: i.toString() + (i <=1 ? " minuto" : " minutos"),
            Value:i
        });
    }
    return options;
};

const DetailMotherBoard = ({ 
    onClose,
    motherBoard,
    userId
}) =>{

    const [motherBoardName, setMotherBoardName] = useState(motherBoard.Name);
    const [isMotherBoardTurnedOn, setIsMotherBoardTurnedOn] = useState(motherBoard.Status.Value === "on" ? true : false);
    const [senseFrequency, setSenseFrequency] = useState();
    const [motherBoardDetail, setMotherBoardDetail] = useState();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const Status = {
        on: "processing",
        off: "default"
    };

    useEffect(() => {
        getDetailMotherBoard();
    }, [motherBoard]);

    const getFilterValue = (value) =>{
        return value <= 1 ? value +" minuto" : value + " minutos";
    };
    
    const getDetailMotherBoard = () =>{
        const params = new URLSearchParams();
        params.append("func", "MB-gmbd");
        params.append("args", JSON.stringify({ IdMotherBoard: motherBoard.IdMotherBoard }));
        params.append("IdUserIS", userId);
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            if (validate.includes("User|Error")) {
                const messageToShow = response.data.Echo.split(":")[1];
                message.error(messageToShow);
                return;
            }
            else{
                const { MotherBoard } = response.data;
                setMotherBoardDetail(MotherBoard);
                console.log(MotherBoard.MotherBoardConfiguration.SenseFrecuency);
                setSenseFrequency(MotherBoard.MotherBoardConfiguration.SenseFrecuency);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleUpdateMotherBoardConfigurations = () =>{
        if(motherBoardName !== motherBoard.Name){
            updateName();
        }
        if(senseFrequency){

        }

    };

    const updateName = () =>{
        console.log("update name");
    };   

    return(
        <Modal
            width="60%"
            title="Configurar dispositivo"
            visible
            onCancel={onClose}
            footer={[
                <Button 
                    key={0}
                    onClick={onClose}>
                    Cancelar
                </Button>,
                <Button 
                    key={1}
                    type="primary" 
                    onClick={()=> handleUpdateMotherBoardConfigurations()}>
                    Guardar
                </Button>,
            ]}
        >
            {
                motherBoardDetail &&
                <>
                    <Row align="top">
                        <Col flex={1}>
                            <Title 
                                level={5}
                                style={{marginTop:20}}
                            >
                                Apagar/Prender
                            </Title>
                            <Switch 
                                checked={isMotherBoardTurnedOn}
                                onClick={()=> setIsMotherBoardTurnedOn(!isMotherBoardTurnedOn)}
                            />
                        </Col>
                        <Col>
                            <Badge text={motherBoard.Status.Label} status={Status[motherBoard.Status.Value]}/>  
                        </Col>

                    </Row>
                    <Input
                        placeholder="Escriba el nombre del dispositivo" 
                        value={motherBoardName}
                        onChange={(e) => setMotherBoardName(e.target.value)}
                        size="large" 
                        style={{
                            marginLeft:0,
                            marginTop:30, 
                            marginBottom:10, 
                            placeholderColor:"black",
                        }}
                    />
                    <Row 
                        gutter={50}>
                        <Col>
                            <Title 
                                level={5}
                                style={{marginTop:20}}
                            >
                                Tiempo de muestreo
                            </Title>
                            <Select 
                                placeholder="Selecciona tiempo de muestreo"
                                defaultValue={()=> getFilterValue(motherBoardDetail.MotherBoardConfiguration.SenseFrecuency)}
                                onChange={(value)=> setSenseFrequency(value)}>
                                {OptionsSample().map((option, index)=>
                                    <Select.Option 
                                        key={index} 
                                        value={option.Value}
                                    >
                                        {option.Label}
                                    </Select.Option>
                                )}
                            </Select>
                        </Col>
                    </Row>
                    <Divider style={{marginTop:10}}/>
                    <Title 
                        level={5}
                        style={{marginTop:20}}
                    >
                        Sensores
                    </Title>
                    <Row
                        gutter={[16, 16]}
                    >
                        <Col span={16}>
                            <Input 
                                placeholder="Número de serie del sensor"
                            />
                        </Col>
                        <Col flex={1}>
                            <Select
                                placeholder="Posición"
                            >

                            </Select>
                        </Col>
                        <Col>
                            <Button>
                                Agregar
                            </Button>
                        </Col>
                    </Row>
                    <ItemSensor/>
                    <ItemSensor/>
                    <ItemSensor/>
                    <ItemSensor/>
                </>
            }
        </Modal>
    );
};

export default DetailMotherBoard;