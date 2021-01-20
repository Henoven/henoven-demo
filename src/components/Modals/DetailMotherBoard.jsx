import React, { useState } from 'react';
import { Badge, Button, Col, Divider, Input, Modal, Row, Typography, List, Select, Switch } from "antd";

import ItemSensor from "../../components/ItemSensor";

const { Title } = Typography;

const DetailMotherBoard = ({ 
    onClose,
    motherBoard
}) =>{

    const [motherBoardName, setMotherBoardName] = useState(motherBoard.Name);
    const [isMotherBoardTurnedOn, setIsMotherBoardTurnedOn] = useState(motherBoard.Status.Value === "on" ? true : false);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const maxSampleTime=60;
    const Status = {
        on: "processing",
        off: "default"
    };

    const OptionsSample = () =>{
        let options = [];
        for(let i=1; i<=maxSampleTime; i++){
            options.push({
                Label: i.toString() + (i <=1 ? " minuto" : " minutos"),
                Value:i
            });
        }
        return options;
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
                    onClick={()=> console.log("Guardar")}>
                    Guardar
                </Button>,
            ]}
        >
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
                        <Select placeholder="Selecciona tiempo de muestreo">
                            {OptionsSample().map((option, index)=>
                                <Select.Option key={index}>{option.Label}</Select.Option>
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
        </Modal>
    );
};

export default DetailMotherBoard;