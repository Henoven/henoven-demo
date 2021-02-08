import React, { useState, useEffect } from 'react';
import { Badge, Button, Col, Divider, Input, Modal, message, Row, List, Select, Switch,  Typography, Popconfirm } from "antd";
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

const PositionOptions = [
    {Label:"Atras", Value:"back"},
    {Label:"Centro", Value:"middle"},
    {Label:"Adelante", Value:"front"}
];

const DetailMotherBoard = ({ 
    onClose,
    motherBoard,
    userId,
    setUserMotherBoards
}) =>{

    const [motherBoardName, setMotherBoardName] = useState(motherBoard.Name);
    const [isMotherBoardTurnedOn, setIsMotherBoardTurnedOn] = useState(motherBoard.Status.Value === "on" ? true : false);
    const [senseFrequency, setSenseFrequency] = useState();
    const [motherBoardDetail, setMotherBoardDetail] = useState();
    const [positionSensor, setPositionSensor] = useState();
    const [sensorSerialNumber, setSensorSerialNumber] = useState();
    const [sensors, setSensors] = useState([]);
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
                setSenseFrequency(MotherBoard.MotherBoardConfiguration.SenseFrecuency);
                setSensors(MotherBoard.MotherBoardSensors);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleDeleteMotherBoard = () =>{
        const params = new URLSearchParams();
        params.append("func", "MB-dmb");
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
                setUserMotherBoards(response.data);
                onClose();
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
            updateMotherBoardConfigurations();
        }
        //If you want to close the modal when saving details.
        //onClose(); 
    };

    const handleTurnOnOffMotherboard = (isTurnOn) =>{
        setIsMotherBoardTurnedOn(!isTurnOn);
        const params = new URLSearchParams();
        params.append("func", isTurnOn ? "MB-tmbof" : "MB-tmbo");
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
                setSenseFrequency(MotherBoard.MotherBoardConfiguration.SenseFrecuency);
                setSensors(MotherBoard.MotherBoardSensors);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleAddSensor = () =>{
        const args =  JSON.stringify({
            IdMotherBoard: motherBoard.IdMotherBoard, 
            SerialNumber: sensorSerialNumber,
            Position: positionSensor
        });
        setSensorSerialNumber("");
        setPositionSensor("");
        const params = new URLSearchParams();
        params.append("func", "MB-lstmb");
        params.append("args", args);
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
                setSenseFrequency(MotherBoard.MotherBoardConfiguration.SenseFrecuency);
                setSensors(MotherBoard.MotherBoardSensors);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleOnSaveSensor = (IdSensor, Name, Position) =>{
        const args =  JSON.stringify({
            IdSensor,
            Name,
            Position
        });
        const params = new URLSearchParams();
        params.append("func", "MB-us");
        params.append("args", args);
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
                setSenseFrequency(MotherBoard.MotherBoardConfiguration.SenseFrecuency);
                setSensors(MotherBoard.MotherBoardSensors);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleOnUnlikSensor = (IdSensor) =>{
        const args = JSON.stringify({ 
            IdMotherBoard: motherBoard.IdMotherBoard,
            IdSensor
        });
        const params = new URLSearchParams();
        params.append("func", "MB-ustmb");
        params.append("args", args);
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
                const { MotherBoard, Echo } = response.data;
                setMotherBoardDetail(MotherBoard);
                setSenseFrequency(MotherBoard.MotherBoardConfiguration.SenseFrecuency);
                setSensors(MotherBoard.MotherBoardSensors);
                message.success(Echo.split(':')[1]);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const updateMotherBoardConfigurations = () =>{
        const args = JSON.stringify({ 
            IdMotherBoard: motherBoard.IdMotherBoard,
            MotherBoardConfiguration: {
                SenseFrecuency: senseFrequency,
                Decimals: "2"
            }
        });
        const params = new URLSearchParams();
        params.append("func", "MB-umbc");
        params.append("args", args);
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
                const { MotherBoard, Echo } = response.data;
                setMotherBoardDetail(MotherBoard);
                setSenseFrequency(MotherBoard.MotherBoardConfiguration.SenseFrecuency);
                setSensors(MotherBoard.MotherBoardSensors);
                message.success(Echo.split(':')[1]);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const updateName = () =>{
        const args = JSON.stringify({ 
            IdMotherBoard: motherBoard.IdMotherBoard,
            Name: motherBoardName
        });
        const params = new URLSearchParams();
        params.append("func", "MB-umb");
        params.append("args", args);
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
                setUserMotherBoards(response.data);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };   

    return(
        <Modal
            width="60%"
            title="Configurar dispositivo"
            visible
            onCancel={onClose}
            footer={[
                <Popconfirm 
                    key={2}
                    placement="topLeft"
                    title="¿Seguro que quieres eliminar el dispositivo?"
                    okText="Sí"
                    onConfirm={handleDeleteMotherBoard}
                    cancelText="No"
                    >
                    <Button type="primary" danger>
                        Eliminar dispositivo
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
                                onClick={()=> handleTurnOnOffMotherboard(isMotherBoardTurnedOn)}
                            />
                        </Col>
                        <Col>
                            <Badge text={motherBoardDetail.Status.Label} status={Status[motherBoardDetail.Status.Value]}/>  
                        </Col>

                    </Row>
                    <Title 
                                level={5}
                                style={{marginTop:20}}
                            >
                               Nombre
                    </Title>
                    <Input
                        placeholder="Escriba el nombre del dispositivo" 
                        value={motherBoardName}
                        onChange={(e) => setMotherBoardName(e.target.value)}
                        size="large" 
                        style={{
                            marginLeft:0,
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
                                onChange={(e) => setSensorSerialNumber(e.target.value)}
                            />
                        </Col>
                        <Col flex={1}>
                        <Select 
                            placeholder="Posición"
                            onChange={(value) => setPositionSensor(value)}
                        >
                            {
                                PositionOptions.map((option, index) =>
                                <Select.Option 
                                    key={index} 
                                    value={option.Value}
                                >
                                    {option.Label}
                                </Select.Option>
                                )
                            }
                        </Select>
                        </Col>
                        <Col>
                            <Button onClick={handleAddSensor}>
                                Agregar dispositivo
                            </Button>
                        </Col>
                    </Row>
                    <List
                        itemLayout="horizontal"
                        // loading = {isLoading}
                        dataSource={sensors}
                        key={(sensor) => sensor.IdSensor}
                        renderItem={item => (
                            <List.Item style={{paddingBottom:1}}>
                                <ItemSensor
                                    data={item}
                                    onSave={handleOnSaveSensor}
                                    onUnlink={handleOnUnlikSensor}
                                />
                            </List.Item>
                            )}
                    />
                </>
            }
        </Modal>
    );
};

export default DetailMotherBoard;