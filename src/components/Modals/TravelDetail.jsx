import React, {useState, useEffect, useCallback} from 'react';
import { Button, message,Typography, Col, Row, Popconfirm, Tooltip, Progress, Spin, Divider} from "antd";
import axios from "../../axios";
import AppChar from '../AppChar';
import { IconButton } from '@material-ui/core';
import { CompassOutlined} from '@ant-design/icons';
import Geocode from "react-geocode";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import Modal from "../../components/Modals/Modal";
import {KeyGeocoding} from "../../constants";
import {getDateFiltered} from "../../api/dateService";

const { Title } = Typography;
const containerStyle = {
width: '600px',
height: '400px'
};

const CurrentDataInfoFromTravel = ({
    travelDetail,
    address,
    onLoad, 
    onUnmount,
    isLoaded, 
    position
}) =>{

    const handleOpenMap = () =>{
        const location = `http://www.google.com/maps/place/${travelDetail?.LastMeasurement?.Location}/@${travelDetail?.LastMeasurement?.Location},20z`;
        if(location){
            window.open(location);
        }
    };

    return(
        <>
            {travelDetail &&
                <Row gutter={{ xs: 8, sm: 16, md: 24}}>
                    <Col flex={0.7}>
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
                            {getDateFiltered(travelDetail?.StartTime)}
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
                            {getDateFiltered(travelDetail?.LastMeasurement?.Time)}
                        </div>
                        <Title level={5} style={{color:"#3498db"}}>
                            Última Ubicación
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
                            <span style={{flex:1}}>{address ? address : "Sin dirección"}</span>
                            {address &&
                                <Tooltip title="Abrir en Google Maps">
                                    <IconButton onClick={()=> handleOpenMap()}>
                                        <CompassOutlined />
                                    </IconButton>
                                </Tooltip>
                            }
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
                                <div>{ travelDetail?.LastMeasurement?.Sensor1Temp }</div>
                                <div>{ travelDetail?.LastMeasurement?.Sensor1Hum }</div>
                            </Col>
                            <Col flex={1} style={{
                                borderRightStyle:"solid",
                                borderRightWidth:1,
                                borderRightColor:"#a0a0a0",
                            }}>
                                <div>Sensor 2</div>
                                <div>{ travelDetail?.LastMeasurement?.Sensor2Temp }</div>
                                <div>{ travelDetail?.LastMeasurement?.Sensor2Hum }</div>
                            </Col>
                            <Col flex={1} >
                                <div>Sensor 3</div>
                                <div>{ travelDetail?.LastMeasurement?.Sensor3Temp }</div>
                                <div>{ travelDetail?.LastMeasurement?.Sensor3Hum }</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col flex={1}>
                        {isLoaded && position &&
                        <Row justify="end" >
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{
                                    lat:20.668,
                                    lng:-103.399
                                }}
                                zoom={20}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                <>
                                    <Marker
                                        position={position}
                                    />
                                </>
                            </GoogleMap>
                        </Row>
                        }
                    </Col>
                </Row>
            }
        </> 
    );
};

const StochasticDataFromTravel = ({
    travelData,
    travelDetail
}) =>{

    useEffect(()=>{
        console.log(travelDetail);
    }, [travelData])

    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    const getAverageHumidity = () =>{
        if(! travelData?.Humidity?.Data) return 0;
        const elmt = travelData.Humidity.Data;
        var sum = 0;
        for( var i = 0; i < elmt.length; i++ ){
            sum += parseInt( elmt[i], 10 ); //don't forget to add the base
        }
        var avg = sum/elmt.length;
        return Math.round(avg);
    };

    return(
        <>
            {travelData &&
            <Row>
                <Col>
                    <div style={styles}>
                            <AppChar
                                travelData={travelData}
                                minTemp={travelDetail.TravelLimits?.MinTemperatureLimit}
                                maxTemp={travelDetail.TravelLimits?.MaxTemperatureLimit}
                            />
                    </div>
                </Col>
                <Divider type="vertical" style={{height: "100%", width:5}}/>
                <Col flex={1}>
                    <Title level={5} style={{color:"#3498db"}}>
                        Humedad promedio
                    </Title>
                    <Progress
                        percent={getAverageHumidity()}
                        strokeWidth={30}
                        status="active"
                        strokeColor="#3c5c9e"
                    />
                    <Title level={5} style={{color:"#3498db"}}>
                        Rango de temperatura aceptable
                    </Title>
                    <div>{`${travelDetail.TravelLimits?.MinTemperatureLimit?.slice(0, -13)}°C a ${travelDetail.TravelLimits?.MaxTemperatureLimit?.slice(0, -13)}°C`}</div>
                </Col>
            </Row>
            }
        </>
    );
};

 
const TravelDetail = ({ 
    onClose, 
    userId, 
    travel,
    setTravels
}) =>{
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: KeyGeocoding
    });
    const [travelDetail, setTravelDetail] = useState(null);
    const [travelData, setTravelData] = useState(null);
    const [map, setMap] = useState(null);
    const [address, setAddress] = useState(null);
    const [lastMeasurementSelected, setLastMeasurementSelected] = useState(true);
    const [position, setPosition] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, []);


    useEffect(() => {
        getTravelDetail();

        // eslint-disable-line react-hooks/exhaustive-deps
    }, []);

    const getTravelDetail = () =>{
        if(!travel){return;}
        const params = new URLSearchParams();
        const args = JSON.stringify({
            IdTravel: travel.IdTravel
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
                setAddress(getAddressFromLatLong(response.data.LastMeasurement.Location));
                setPosition(getPosition(response.data.LastMeasurement.Location));
            }
        })
        .catch((error) => {
        console.log("Error", error);
        })
    };
    
    const getPosition = (location) =>{
        if(!location) return;
        const latlong = location?.split(",");
        const coords = {
            lat: parseFloat(latlong[0].slice(0,-4)),
            lng: parseFloat(latlong[1].slice(0,-4)),
        };
        return coords;
    }

    const getAddressFromLatLong = ( location )=>{
        if(!location) return;
        const latlong = location?.split(",");
        Geocode.setApiKey(KeyGeocoding);
        Geocode.setLanguage("es");
        Geocode.fromLatLng(latlong[0], latlong[1]).then(
            (response) => {
              const address = response.results[0].formatted_address;
              setAddress(address);
            },
            (error) => {
              console.error(error);
            }
          )
          .catch();
    };

    const handleCancelTravel = () =>{
        const params = new URLSearchParams();
        const args = JSON.stringify({
            IdTravel: travel.IdTravel
        });
        params.append("func", "Travel-ctt");
        params.append("IdUserIS", userId);
        params.append("args", args);
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB?.split(":").includes("Error")){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                const { Update } = response.data;
                setTravels(Update);
                onClose();
            }
        })
        .catch((error) => {
        console.log("Error", error);
        })
    };

    return(
        <Modal
            width="80%"
            title={`Información de viaje: ${travel?.TravelExecution}`}
            visible
            overflow="hidden"
            onCancel={onClose}
            footer={ !["finished"].includes(travel?.Status) ? [
                <Popconfirm 
                    key={0}
                    placement="topLeft"
                    title="¿Seguro que quieres terminar el viaje?"
                    okText="Sí"
                    onConfirm={handleCancelTravel}
                    cancelText="No"
                >
                    <Button type="primary" danger>
                        Terminar viaje
                    </Button>
                </Popconfirm>,
                <Button 
                    key={1}            
                    type="primary" 
                    onClick={()=> getTravelDetail()}
                >
                    Refrescar
                </Button>,
            ] : null}
        >
            <Row justify="end" style={{margin:10}}>
                <Button  
                    type={lastMeasurementSelected ? "primary" : "default"}
                    onClick={()=> setLastMeasurementSelected(true)}
                >
                    Ultimas mediciones
                </Button>
                <Button  
                    type={!lastMeasurementSelected ? "primary" : "default"}
                    onClick={()=> setLastMeasurementSelected(false)}
                >
                    Estadísticas
                </Button>
            </Row>
            {lastMeasurementSelected ? 
                <CurrentDataInfoFromTravel
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    isLoaded={isLoaded}
                    travelDetail={travelDetail}
                    address={address}
                    position={position}
                />
                :
                <>
                <StochasticDataFromTravel
                    travelData={travelData}
                    travelDetail={travelDetail}
                />
            </>

            }
        </Modal>
        );
}

export default TravelDetail;

