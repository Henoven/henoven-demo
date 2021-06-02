import React, {useState, useEffect} from 'react';
import {Input, Button, Row, Divider, Typography, List, Popconfirm, message} from "antd";
import axios from "../../../axios";

import CardUser from '../../../components/Cards/CardUser';
import Modal from '../../../components/Modals/Modal';

const {Search} = Input;
const {Title} = Typography;

const EditTeamModal = ({ onClose, IdUser, IdTeam, refreshTeams}) =>{
    
    const [Loading] = useState(false);
    const [Team, setTeam] = useState({});
    const [teamName, setTeamName] = useState();
    const [newTeammate, setNewTeammate] = useState();
    const [isLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getTeamInfo();
    },[IdUser, IdTeam]);

    const getTeamInfo = () =>{
        if(!IdTeam) return;
        const params = new URLSearchParams();
        params.append("func", "Team-gti");
        params.append("args", JSON.stringify({ IdTeam: IdTeam }));
        params.append("IdUserIS", IdUser);
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            if (validate.includes("User|Error")) {
                const messageToShow = response.data.Echo.split(":")[1];
                message.error(messageToShow);
                return;
            }
            else{
                const {TeamInfo, TeamMembers} = response.data;
                setTeam(TeamInfo);
                setTeamName(TeamInfo.TeamName);
                setUsers(TeamMembers);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    }

    const handlePermission = (e, userId) =>{
        console.log(`checked = ${e.target.checked}`);
        console.log(`user = ${userId}`);
    }
    const handleAddTeammate = () =>{
        if(!newTeammate) return;
        const params = new URLSearchParams();
        params.append("func", "Team-iu");
        params.append("IdUserIS", IdUser);
        params.append("args", JSON.stringify(
            {
                 IdTeam: IdTeam,
                 Email: newTeammate 
            }));
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            const messageToShow = response.data.Echo.split(":")[1];
            if (validate.includes("User|")) {
                if(validate.includes("Error")){
                    message.error(messageToShow);
                }
                else{
                    message.success(messageToShow);
                }
                return;
            }
            else{
                message.error("No se encontró el usuario");
            }
        })
        .catch((error) => {
            console.log("Error", error);
        })
        setNewTeammate("");
        console.log(users);
    }
    const handleOnDeleteTeammate = (userToExpell) =>{
        if(!userToExpell) return;
        const params = new URLSearchParams();
        params.append("func", "Team-euft");
        params.append("IdUserIS", IdUser);
        params.append("args", JSON.stringify(
            {
                IdUserToExpell: userToExpell.IdUser,
                IdTeam, 
            }));
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            const messageToShow = response.data.Echo.split(":")[1];
            if (validate.includes("User")) {
                if(validate.includes("Error")){
                    message.error(messageToShow);
                    return;
                }
                else{
                    message.success(messageToShow);
                }
            }
            let teamMembers = users.filter( user => user.IdUser !== userToExpell.IdUser);
            setUsers(teamMembers);
        })
        .catch((error) => {
            console.log("Error", error);
        })
    }
    const handleDeleteTeam = () =>{
        if(!IdTeam) return;
        const params = new URLSearchParams();
        params.append("func", "Team-dt");
        params.append("IdUserIS", IdUser);
        params.append("args", JSON.stringify(
            {
                IdTeam, 
            }));
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            if (validate.includes("User|Error")) {
                const messageToShow = response.data.Echo.split(":")[1];
                message.error(messageToShow);
                return;
            }
            onClose();
            refreshTeams(true);
        })
        .catch((error) => {
            console.log("Error", error);
        })
    }
    function handleChangeNameTeam(){
        const params = new URLSearchParams();
        params.append("func", "Team-raut");
        params.append("IdUserIS", IdUser);
        params.append("args", JSON.stringify(
            {
                IdTeam,
                TeamName: teamName, 
            }));
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            const messageToShow = response.data.Echo.split(":")[1];
            if (validate.includes("User")) {
                if(validate.includes("Error")){
                    message.error(messageToShow);
                    return;
                }
                else{
                    message.success(messageToShow);
                }
            }
            onClose();
            refreshTeams(true);
        })
        .catch((error) => {
            console.log("Error", error);
        })
    }

    return(
        <Modal
            width="60%"
            visible
            onCancel={onClose}
            title={"Información de equipo: "+ teamName}
            footer={[
                <Popconfirm 
                    key={0}
                    placement="topLeft"
                    title="¿Seguro que quieres eliminar el equipo?"
                    okText="Sí"
                    onConfirm={handleDeleteTeam}
                    cancelText="No"
                    >
                    <Button type="primary" danger>
                        Eliminar equipo
                    </Button>
                </Popconfirm>,
                <Button key={1} onClick={onClose}>
                    Cancelar
                </Button>,
                <Button 
                    key={2}
                    loading={Loading}
                    type="primary" 
                    onClick={() => handleChangeNameTeam()}>
                    Guardar
                </Button>,
            ]}
        >
            <>
                <Input  
                    placeholder="Escriba el nombre del equipo" 
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    size="large" 
                    style={{
                        marginLeft:0,
                        marginTop:30, 
                        marginBottom:10, 
                        placeholderColor:"black"
                }}/>
                <Row  align="middle">
                    <Search
                        size="middle"
                        placeholder="Ingresa un correo para añadirlo a tu equipo"
                        enterButton="Agregar" 
                        onChange={(e) => setNewTeammate(e.target.value)}
                        onSearch={handleAddTeammate}
                        value={newTeammate}/>
                </Row>
                <Row style={{marginTop:20}}>
                    <Title 
                        type="secondary"
                        level={5}>Usuarios</Title>
                </Row>
                <Divider style={{marginTop:0}}></Divider>
                <List
                    itemLayout="horizontal"
                    loading = {isLoading}
                    dataSource={users}
                    key={(user) => user.IdUser.toString()}
                    renderItem={item => (
                    <List.Item 
                        style={{paddingBottom:1}}>
                       <CardUser 
                            title={item.FirstName + " " +item.LastName} 
                            user={item}
                            canUserSeeDetailTravel={item.Permissions}
                            onChange={()=>handlePermission}
                            onDeleteTeammate={(value)=>handleOnDeleteTeammate(value)}/>
                    </List.Item>
                    )}
                />
            </>
        </Modal>
        );
}

export default EditTeamModal;