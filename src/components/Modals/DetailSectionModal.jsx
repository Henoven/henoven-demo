import React, { useState, useEffect } from 'react';
import { Badge, Button, Col, Divider, Input, Modal, message, Row, List, Select, Switch,  Typography, Popconfirm, Tooltip } from "antd";
import Icon from '@mdi/react'
import { mdiThermometerChevronDown, mdiThermometerChevronUp } from '@mdi/js';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from "../../axios";

import ItemSensor from "../../components/ItemSensor";
import { Avatar } from '@material-ui/core';
import ItemProduct from '../ItemProduct';

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

const TemperatureOptions = () => {
    const minTemperature = -40;
    const maxTemperature = 100;
    let temperatureOptions = [];
    for(var i= minTemperature; i <= maxTemperature; i++){
        temperatureOptions.push({
            Label: `${i} °C`,
            Value:i
        });
    }
    return temperatureOptions;
};

const DetailSectionModal = ({ 
    onClose,
    section,
    userId,
    updateSection
}) =>{

    const [motherBoardName, setMotherBoardName] = useState(null);
    const [senseFrequency, setSenseFrequency] = useState();
    const [positionSensor, setPositionSensor] = useState();
    const [sensorSerialNumber, setSensorSerialNumber] = useState();
    const [sensors, setSensors] = useState([]);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const Status = {
        on: "processing",
        off: "default"
    };
    
    // const getDetailMotherBoard = () =>{
    //     const params = new URLSearchParams();
    //     params.append("func", "MB-gmbd");
    //     params.append("args", JSON.stringify({ IdMotherBoard: motherBoard.IdMotherBoard }));
    //     params.append("IdUserIS", userId);
    //     axios.post("", params)
    //     .then((response) => {
    //         let validate = JSON.stringify(response);
    //         if (validate.includes("User|Error")) {
    //             const messageToShow = response.data.Echo.split(":")[1];
    //             message.error(messageToShow);
    //             return;
    //         }
    //         else{
    //             const { MotherBoard } = response.data;
    //             setMotherBoardDetail(MotherBoard);
    //             setSenseFrequency(MotherBoard.MotherBoardConfiguration.SenseFrecuency);
    //             setSensors(MotherBoard.MotherBoardSensors);
    //         }
    //     })
    //     .catch((error) => {
    //       console.log("Error", error);
    //     })
    // };
    console.log(section);

    return(
        <Modal
            width="60%"
            title={section ? section.Name : ""}
            visible
            onCancel={onClose}
            footer={[
                <Popconfirm 
                    key={2}
                    placement="topLeft"
                    title="¿Seguro que quieres eliminar esta sección?"
                    okText="Sí"
                    onConfirm={()=> console.log("eliminar sección de almacén")}
                    cancelText="No"
                    >
                    <Button type="primary" danger>
                        Eliminar sección de almacén
                    </Button>
                </Popconfirm>,
                <Button 
                    key={0}
                    onClick={onClose}>
                    Cancelar
                </Button>,
                <Button 
                    key={1}
                    type="primary" 
                    onClick={()=> console.log("guardar")}>
                    Guardar
                </Button>,
            ]}
        >
            {section &&   
                <>
                    <Title 
                        level={5}
                        style={{marginTop:20}}
                    >
                        Productos
                    </Title>
                    <Row
                        justify="space-between"
                    >
                       <Input 
                            placeholder="Nombre"
                            style={{ width: 300 }}
                            onChange={(e) => setSensorSerialNumber(e.target.value)}
                        />
                        <Row>
                            <Icon path={mdiThermometerChevronDown}
                                size={1}
                                color="gray"
                            />
                            <Select 
                                allowClear
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Temperatura máxima"
                                optionFilterProp="children"
                                onChange={(value) => setPositionSensor(value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    TemperatureOptions().map((option, index) =>
                                    <Select.Option 
                                        key={index} 
                                        value={option.Value}
                                    >
                                        {option.Label}
                                    </Select.Option>
                                    )
                                }
                            </Select>
                        </Row>
                        <Row>
                            <Icon path={mdiThermometerChevronUp}
                                size={1}
                                color="gray"
                            />
                            <Select 
                                allowClear
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Temperatura máxima"
                                optionFilterProp="children"
                                onChange={(value) => setPositionSensor(value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    TemperatureOptions().map((option, index) =>
                                    <Select.Option 
                                        key={index} 
                                        value={option.Value}
                                    >
                                        {option.Label}
                                    </Select.Option>
                                    )
                                }
                            </Select>
                        </Row>
                        <Tooltip title="Agregar producto">
                            <Button   
                                style={{marginRight:10}}
                                shape="circle" 
                                icon={<PlusCircleOutlined style={{color:"#3498db", fontSize:25}}/>}
                                onClick={()=> console.log("agregar")} 
                            />
                        </Tooltip>
                    </Row>
                    <List
                        itemLayout="horizontal"
                        dataSource={section.products}
                        key={(section) => section.IdSection}
                        renderItem={item => (
                            <List.Item style={{paddingBottom:1}}>
                                <ItemProduct
                                    data={item}
                                    onSave={()=> console.log("guardar producto")}
                                    onUnlink={()=> console.log("desvincular")}
                                />
                            </List.Item>
                        )}
                    />
                </>
            }
        </Modal>
    );
};

export default DetailSectionModal;