import React, {useEffect, useState} from 'react';
import { Row, Tooltip, Button, List, message } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons';
import axios from "../../axios";

import functions from '../../api/functions';
import CardDeviceHeader from '../../components/Cards/CardDeviceHeader';
import CardDevice from '../../components/Cards/CardDevice';
import RegisterDeviceModal from '../../components/Modals/RegisterDeviceModal';
import DetailMotherBoard from "../../components/Modals/DetailMotherBoard";

const Devices = ({history, user}) =>{

    const [devices, setDevices] = useState([]);
    const [Modal, setModal] = useState(null);
    const [motherBoardSelected, setMotherBoardSelected] = useState();

    const Modals = {
        "registerDevice": (
            <RegisterDeviceModal  
                onOk={() => console.log("Ok")}
                onClose={()=> setModal(null)}
                userId={user.IdUser}
                disabled={false}/>
        ),
        "detailMotherBoard": (
            <DetailMotherBoard
                onOk={() => console.log("Ok")}
                onClose={()=> setModal(null)}
                userId={user.IdUser}
                motherBoard={motherBoardSelected}
                disabled={false}/>    
        )
        
    };

    useEffect(() => {
        handleLoadDevices();
    }, []);

    const handleLoadDevices = () =>{
        const params = new URLSearchParams();
        params.append("func", functions.getUserMBs);
        params.append("IdUserIS", user.IdUser);
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            if (validate.includes("Error|")) {
                message.error(response.data);
                return;
            }
            else{
                setDevices(response.data);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleEditModal = (motherBoard) =>{
        setModal("detailMotherBoard");
        setMotherBoardSelected(motherBoard);
    };
    
    return(
        <>
            { Modals[Modal] }
            <Row align="middle" justify="end" style={{marginTop:10}}>
                <Tooltip title="Vincular nuevo dispositivo">
                    <Button 
                        shape="circle" 
                        icon={
                            <PlusCircleOutlined 
                                style={{color:"#3498db", fontSize:25}}
                            />} 
                        onClick={() => setModal("registerDevice")}
                    />
                </Tooltip>
            </Row>
            <CardDeviceHeader
                code="Código"
                name="Nombre"
                teamName="Equipo"
                status="Estatus"/>
            <List
                itemLayout="horizontal"
                dataSource={devices.UserMotherBoards}
                renderItem={item => (
                    <List.Item style={{paddingBottom:1}}>
                        <CardDevice
                            key={item.IdSN} 
                            code="No hay número de serie"
                            name={item.Name}
                            teamName="Pedir a back que envíe nombre"
                            status={item.Status}
                            onClick={() => handleEditModal(item)}/>
                    </List.Item>
                )}
            />
        </>
    );
}
export default Devices;