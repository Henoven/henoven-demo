import React, {useState, useEffect} from 'react';
import { Modal, Input, Button, message, Select, Typography } from "antd";
import axios from "../../axios";

const { Option } = Select;
const { Title } = Typography;
 
const RegisterDeviceModal = ({ 
    onClose, 
    userId, 
    IdWarehouse,
    loadSections
}) =>{
    
    const [Loading, setLoading] = useState(false);
    const [name, setName] = useState();
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
        // return name && idTeamSelected;
        return name ? true : false;
    };

    const handleCreateNewSection = () =>{
        if(!areFieldsCompleted()) {
            message.error("Faltan campos por llenar");
            return;
        }
        setLoading(true);
        const params = new URLSearchParams();
        params.append("func", "WH-cs");
        params.append("IdUserIS", userId);
        params.append("args", JSON.stringify(
            {
                 IdWarehouse, 
                 Name: name,
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
            setLoading(false);
            setName("");
            loadSections();
            onClose(); 
        })
        .catch((error) => {
            console.log("Error", error);
        })
    };

    return(
        <Modal
            title="Crear nueva sección de almacén"
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
                    onClick={handleCreateNewSection}>
                    Crear
                </Button>,
            ]}
        >
            {/* <Title level={5}>
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
            </Select> */}
            <Title level={5}>
                Nombre de sección
            </Title>
            <Input 
                placeholder="Nombre de la nueva sección" 
                onChange={(e) => setName(e.target.value)}
                value={name}/>
        </Modal>
        );
}

export default RegisterDeviceModal;