import React, {useState, useEffect} from 'react';
import { Input, Button, message, Select, Typography } from "antd";
import axios from "../../axios";

import Modal from "../../components/Modals/Modal";

const { Option } = Select;
const { Title } = Typography;
 
const RegisterDeviceModal = ({ 
    onClose, 
    userId, 
    loadDevices
}) =>{
    
    const [Loading, setLoading] = useState(false);
    const [serialNumber, setSerialNumber] = useState();
    const [idTeamSelected, setIdTeamSelected] = useState();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams();
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

    const areFieldsCompleted = () => {
        return serialNumber && idTeamSelected;
    };

    const handleRegisterNewDevice = () =>{
        if(!areFieldsCompleted()) {
            message.error("Faltan campos por llenar");
            return;
        }
        setLoading(true);
        const params = new URLSearchParams();
        params.append("func", "MB-raumb");
        params.append("IdUserIS", userId);
        params.append("args", JSON.stringify(
            {
                 IdTeam: idTeamSelected, 
                 SerialNumber: serialNumber,
            }));
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response)
            if (validate.includes("User|Error")) {
                const messageToShow = response.data.Echo.split(":")[1];
                message.error(messageToShow);
                setLoading(false);
                return;
            }
            const messageToShow = response.data.Echo.split(":")[1];
            message.success(messageToShow);
            setLoading(false);
            setSerialNumber("");
            loadDevices();
            onClose(); 
        })
        .catch((error) => {
            console.log("Error", error);
        })
    };

    return(
        <Modal
            title="Registrar nuevo dispositivo"
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
                    loading={Loading}
                    type="primary" 
                    onClick={handleRegisterNewDevice}>
                    Registrar
                </Button>,
            ]}
        >
            <Title level={5}>
                Equipo
            </Title>
            <Select
                allowClear
                showSearch
                style={{ width: 200 }}
                placeholder="Selecciona un equipo"
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
            <Title level={5}>
                Número de serie
            </Title>
            <Input 
                placeholder="Número de serie del dispositivo" 
                onChange={(e) => setSerialNumber(e.target.value)}
                value={serialNumber}/>
        </Modal>
        );
}

export default RegisterDeviceModal;