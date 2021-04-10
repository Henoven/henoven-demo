import React, {useState, useEffect} from 'react';
import { Modal, Button, message, Select, Typography, Col, Row, Popconfirm, Tooltip} from "antd";
import axios from "../../axios";
import AppChar from '../AppChar';
import { IconButton } from '@material-ui/core';
import { CompassOutlined} from '@ant-design/icons';

const { Title } = Typography;
 
const TravelDetail = ({ 
    onClose, 
    userId, 
    travel,
    setTravels
}) =>{
    const [travelDetail, setTravelDetail] = useState(null);
    const [travelData, setTravelData] = useState(null);

    useEffect(() => {
        getTravelDetail();
    }, []);

    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    const getTravelDetail = () =>{
        if(!travel){return;}
        const params = new URLSearchParams();
        const args = JSON.stringify({
            IdTravel:travel.IdTravel
        });
        params.append("func", "Travel-gtd");
        params.append("IdUserIS", userId);
        params.append("args", args);
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                const { TravelData } = response.data;
                setTravelDetail(response.data);
                setTravelData(TravelData);
            }
        })
        .catch((error) => {
        console.log("Error", error);
        })
    };

    const handleCancelTravel = () =>{
        const params = new URLSearchParams();
        const args = JSON.stringify({
            IdTravel:travel.IdTravel
        });
        params.append("func", "Travel-ctt");
        params.append("IdUserIS", userId);
        params.append("args", args);
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                const { Travels } = response.data;
                setTravels(Travels);
                onClose();
            }
        })
        .catch((error) => {
        console.log("Error", error);
        })
    };

    const handleOpenMap = () =>{
        const location = travelDetail.LastMeasurement.Location ? `http://www.google.com/maps/place/${travelDetail.LastMeasurement.Location}/@${travelDetail.LastMeasurement.Location},20z` : 
        null;
        if(location){
            window.open(location);
        }
    };

    return(
        <Modal
            width="80%"
            title={`Detalle de viaje: ${travel.TravelExecution}`}
            visible
            onCancel={onClose}
            footer={[
                <Popconfirm 
                    key={0}
                    placement="topLeft"
                    title="¿Seguro que quieres cancelar el viaje?"
                    okText="Sí"
                    onConfirm={handleCancelTravel}
                    cancelText="No"
                    >
                    <Button type="primary" danger>
                        Cancelar viaje
                    </Button>
                </Popconfirm>,
                <Button 
                    key={1}
                    type="primary" 
                    onClick={()=> getTravelDetail()}
                    >
                    Refrescar
                </Button>,

            ]}
        >
         <>
            {travelDetail &&
                <Row gutter={{ xs: 8, sm: 16, md: 24}}>
                    <Col flex={2}>
                        <Title level={5} style={{color:"#3498db"}}>
                            Fecha de inicio
                        </Title>
                        <div style={{
                            borderRadius:10,
                            borderWidth:1,
                            borderColor:"#a0a0a0",
                            borderStyle:"solid",
                            textAlign:"center",
                            padding:5,
                            marginBottom:10
                        }}>
                            {travelDetail.StartTime}
                        </div>
                        <Title level={5} style={{color:"#3498db"}}>
                            Última conexión
                        </Title>
                        <div style={{
                            borderRadius:10,
                            borderWidth:1,
                            borderColor:"#a0a0a0",
                            borderStyle:"solid",
                            textAlign:"center",
                            padding:5,
                            marginBottom:10
                        }}>
                            {travelDetail.LastMeasurement.Time}
                        </div>
                        <Title level={5} style={{color:"#3498db"}}>
                            Ubicación
                        </Title>
                        <Row style={{
                            borderRadius:10,
                            borderWidth:1,
                            borderColor:"#a0a0a0",
                            borderStyle:"solid",
                            textAlign:"center",
                            padding:5,
                            marginBottom:10,
                        }}
                            justify="space-between"
                            align="middle"
                        >
                            <span style={{flex:1}}>Bosues de la Cascada, 280, Zapopan, Jalisco</span>
                            <Tooltip title="Abrir en Google Maps">
                                <IconButton onClick={()=> handleOpenMap()}>
                                    <CompassOutlined />
                                </IconButton>
                            </Tooltip>
                        </Row>
                        <Title level={5} style={{color:"#3498db"}}>
                            Última medición
                        </Title>
                        <Row style={{
                            borderRadius:10,
                            borderWidth:1,
                            borderColor:"#a0a0a0",
                            borderStyle:"solid",
                            padding:5,
                            marginBottom:10,
                            textAlign:"center"
                        }}>
                            <Col flex={1} style={{
                                borderRightStyle:"solid",
                                borderRightWidth:1,
                                borderRightColor:"#a0a0a0",
                            }}>
                                <div>Sensores</div>
                                <div>Temperatura (°C)</div>
                                <div>Humedad (%)</div>
                            </Col>
                            <Col flex={1} style={{
                                borderRightStyle:"solid",
                                borderRightWidth:1,
                                borderRightColor:"#a0a0a0",
                            }}>
                                <div>Sensor 1</div>
                                <div>{ travelDetail.LastMeasurement.Sensor1Temp + "°C"}</div>
                                <div>{ travelDetail.LastMeasurement.Sensor1Hum + "%"}</div>
                            </Col>
                            <Col flex={1} style={{
                                borderRightStyle:"solid",
                                borderRightWidth:1,
                                borderRightColor:"#a0a0a0",
                            }}>
                                <div>Sensor 2</div>
                                <div>{ travelDetail.LastMeasurement.Sensor2Temp + "°C"}</div>
                                <div>{ travelDetail.LastMeasurement.Sensor2Hum + "%"}</div>
                            </Col>
                            <Col flex={1} >
                                <div>Sensor 3</div>
                                <div>{ travelDetail.LastMeasurement.Sensor3Temp + "°C"}</div>
                                <div>{ travelDetail.LastMeasurement.Sensor3Hum + "%"}</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col flex={1}>
                        {travelData &&
                            <div style={styles}>
                                    <AppChar
                                        travelData={travelData}
                                    />
                            </div>
                        }
                        <Title 
                            level={5}
                        style={
                            {
                                textAlign:"end"
                            }
                        }>
                            Módulo: 265461Sda54d
                        </Title>
                    </Col>
                </Row>
            }
         </>   
        </Modal>
        );
}

export default TravelDetail;