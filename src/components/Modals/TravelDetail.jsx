import React, {useState, useEffect} from 'react';
import { Modal, Button, message, Select, Typography, Col, Row, Popconfirm, Tooltip} from "antd";
import axios from "../../axios";
import AppChar from '../AppChar';
import { IconButton } from '@material-ui/core';
import { CompassOutlined} from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;
 
const TravelDetail = ({ 
    onClose, 
    userId, 
    travel,
    setTravels
}) =>{
    const [travelDetail, setTravelDetail] = useState(null);

    useEffect(() => {
        getTravelDetail();
    }, []);

    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
    };
    
    // const data = [];
    // const launchDate = 2004;

    // const rand = 300;
    // for (let i = 0; i < 7; i++) {
    // const year = 2000 + i;
    // const value = Math.random() * (rand + 50) + 100;
    // let d = {
    //     year: year,
    //     value: value,
    //     beforeLaunch: year <= launchDate ? value : undefined
    // };

    // data.push(d);
    // }

    // // change type to see that the overlap might not be appropriate towards the
    // // end of the shorter chart
    // const type = "monotone";

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
                setTravelDetail(response.data);
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
        window.open(`http://www.google.com/maps/place/20.774444763426768, -103.37235404186643/@20.774444763426768, -103.37235404186643,17z`);
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
                            <span style={{flex:1}}>México 200, Nogales Sonora</span>
                            <Tooltip title="Abrir en Google Maps">
                                <IconButton onClick={()=> handleOpenMap()}>
                                    <CompassOutlined />
                                </IconButton>
                            </Tooltip>
                        </Row>
                        <div style={{
                            borderRadius:10,
                            borderWidth:1,
                            borderColor:"#a0a0a0",
                            borderStyle:"solid",
                            textAlign:"center",
                            padding:5,
                            marginBottom:10,
                        }}>
                            21.135220, -150.166267
                        </div>
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
                                <div>{ travelDetail.LastMeasurement.Sensor1 + "°C"}</div>
                                <div>{ travelDetail.LastMeasurement.Humidity + "%"}</div>
                            </Col>
                            <Col flex={1} style={{
                                borderRightStyle:"solid",
                                borderRightWidth:1,
                                borderRightColor:"#a0a0a0",
                            }}>
                                <div>Sensor 2</div>
                                <div>{ travelDetail.LastMeasurement.Sensor2 + "°C"}</div>
                                <div>{ travelDetail.LastMeasurement.Humidity + "%"}</div>
                            </Col>
                            <Col flex={1} >
                                <div>Sensor 3</div>
                                <div>{ travelDetail.LastMeasurement.Sensor3  + "°C"}</div>
                                <div>{ travelDetail.LastMeasurement.Humidity + "%"}</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col flex={1}>
                        <div style={styles}>
                            <AppChar/>
                        </div>
                        <Title 
                            level={5}
                        style={
                            {
                                textAlign:"end"
                            }
                        }>
                            Módulo: 265461Sda54d
                        </Title>
                        {/* <div style={styles}>
                            <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                            >
                            <Line type={type} dataKey="value" stroke="#8884d8" dot={false} />
                            <Line type={type} dataKey="beforeLaunch" stroke="red" dot={false} />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <ReferenceLine x={launchDate} label="Temperatura" />
                            </LineChart>
                        </div> */}
                    </Col>
                </Row>
            }
         </>   
        </Modal>
        );
}

export default TravelDetail;