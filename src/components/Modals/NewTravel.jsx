import React, { useState, useEffect} from 'react';
import { Modal, Input, Button, message, Select, Row } from "antd";
import axios from "../../axios";
import Title from 'antd/lib/typography/Title';
import TextArea from 'antd/lib/input/TextArea';
import TitleComponent from '../TitleComponent';

const {Option} = Select;

const NewTravel = ({ 
    onClose, 
    userId, 
    setTravels
}) =>{
    
    const [Loading, setLoading] = useState(false);
    const [idTeamSelected, setIdTeamSelected] = useState(null);
    const [idDeviceSelected, setIdDeviceSelected] = useState(null);
    const [startPoint, setStartPoint] = useState(null);
    const [destiny, setDestiny] = useState(null);
    const [products, setProducts] = useState(null);
    const [teams, setTeams] = useState([]);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        getTeams();
        getDevices();
    },[]);

    const getTeams = () =>{
        const params = new URLSearchParams();
        params.append("func", "Team-gutai");
        params.append("IdUserIS", userId);
        axios.post("", params)
        .then((response) => {
            setLoading(false);
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                const { Teams } = response.data;
                if(response.data) {
                    setTeams(Teams);
                }
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const getDevices = () =>{
        const params = new URLSearchParams();
        params.append("func", "MB-gumbs");
        params.append("IdUserIS", userId);
        axios.post("", params)
        .then((response) => {
            setLoading(false);
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                const { UserMotherBoards } = response.data;
                if(response.data) {
                    setDevices(UserMotherBoards);
                }
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleStartTravel = () =>{
        if(!areRequiredValuesFilled()){
            message.error("Faltan campos por llenar");
            return;
        }
        const args = JSON.stringify({
            IdTeam: idTeamSelected,
            IdMotherBoard: idDeviceSelected,
            StartPoint: startPoint,
            Destiny: destiny,
            Products: products
        });
        const params = new URLSearchParams();
        params.append("func", "Travel-ct");
        params.append("IdUserIS", userId);
        params.append("args", args);
        axios.post("", params)
        .then((response) => {
            setLoading(false);
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB.includes("Error")){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                const { Travels, Echo } = response.data;
                if(response.data) {
                    setTravels(Travels);
                    message.success(Echo);
                    onClose();
                }
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const areRequiredValuesFilled = () =>{
        console.log(idTeamSelected, idDeviceSelected, startPoint, destiny);
        return idTeamSelected !== null && idDeviceSelected !== null && startPoint !== null && destiny !== null;
    };

    return(
        <Modal
            title="Nuevo viaje"
            visible
            onCancel={onClose}
            footer={[
                <Button onClick={onClose}>
                    Cancelar
                </Button>,
                <Button loading={Loading}
                type="primary" 
                onClick={()=> handleStartTravel()}>
                    Iniciar
                </Button>,
            ]}
        >   
            <>
                <TitleComponent required={true}>
                    Equipos
                </TitleComponent>
                <Select
                    allowClear
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Seleccionar un equipo"
                    optionFilterProp="children"
                    onChange={(value) => setIdTeamSelected(value)}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        teams.map((team) =>
                            <Option 
                                key={team.IdTeam}
                                value={team.IdTeam}>
                                    {team.TeamName}
                            </Option>
                        )
                    }
                </Select>
                <TitleComponent required={true}>
                    Dispositivos
                </TitleComponent>
                <Select
                    allowClear
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Seleccionar un dispositivo"
                    optionFilterProp="children"
                    onChange={(value) => setIdDeviceSelected(value)}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        devices.map((device) =>
                            <Option 
                                key={device.IdMotherBoard}
                                value={device.IdMotherBoard}>
                                    {device.Name}
                            </Option>
                        )
                    }
                </Select>
                <TitleComponent required={true}>
                    Punto de partida
                </TitleComponent>
                <Input
                    placeholder="Ingresar el domicilio del punto de partida"
                    onChange={(e) => setStartPoint(e.target.value)}
                />
                <TitleComponent required={true}>
                    Destino
                </TitleComponent>
                <Input
                    placeholder="Ingresar el domicilio del destino"
                    onChange={(e) => setDestiny(e.target.value)}
                />
                <TitleComponent >
                    Productos
                </TitleComponent>
                <TextArea
                    rows={5}
                    placeholder="Ingresar productos"
                    onChange={(e) => setProducts(e.target.value)}
                />
            </>
        </Modal>
        );
}

export default NewTravel;