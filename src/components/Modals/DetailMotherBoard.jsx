import React, { useState } from 'react';
import { Badge, Button, Col, Divider, Input, Modal, Row, Typography, List, Select, Switch } from "antd";

import ItemSensor from "../../components/ItemSensor";

const { Title } = Typography;

const DetailMotherBoard = ({ onClose }) =>{

    const [motherBoardName, setMotherBoardName] = useState("Nombre dispositivo");

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
                            Prender/Apagar
                        </Title>
                        <Switch />
                    </Col>
                    <Col>
                        <Badge text="Status" status="processing"/>  
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
                        </Select>
                    </Col>
                    <Col>
                        <Title 
                            level={5}
                            style={{marginTop:20}}
                        >
                            Decimales en muestras
                        </Title>
                        <Select placeholder="Selecciona cantidad de decimales">
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