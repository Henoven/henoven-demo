import React, {useState} from 'react';
import { Modal, Input, Button, message } from "antd";
import axios from "../../axios";

const NewTravel = ({ onClose, userId, refreshTeams}) =>{
    
    const [Loading, setLoading] = useState(false);
    const [TeamName, setTeamName] = useState();

    const handleCreateNewTeam = () =>{
        if(!TeamName) {
            message.error("Falta nombre de equipo");
            return;
        }
        setLoading(true);
        const params = new URLSearchParams();
        params.append("func", "Team-raut");
        params.append("IdUserIS", userId);
        params.append("args", JSON.stringify(
            {
                 IdTeam: 0, 
                 TeamName: TeamName,
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
            refreshTeams(true);
            setTeamName("");
            onClose(); 
        })
        .catch((error) => {
            console.log("Error", error);
        })
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
                onClick={handleCreateNewTeam}>
                    Iniciar
                </Button>,
            ]}
        >
            <Input 
            placeholder="Nombre de equipo" 
            onChange={(e) => setTeamName(e.target.value)}
            value={TeamName}/>
        </Modal>
        );
}

export default NewTravel;