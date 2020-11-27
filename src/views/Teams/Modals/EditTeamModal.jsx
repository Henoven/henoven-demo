import React, {useState, useEffect} from 'react';
import { Modal, Input, Button, Row, Divider, Typography, List, Popconfirm, message} from "antd";
import axios from "../../../axios";

import CardUser from '../../../components/Cards/CardUser';

const {Search} = Input;
const {Title} = Typography;

const initUsers = [
    {id:1, name:"Sebastián Rodríguez Maldonado", permissions:false},
    {id:2, name:"Santiago Angelini Wintergerst", permissions:true},
    {id:3, name:"Luis Daniel Guerra Rosales", permissions:true},
];

const EditTeamModal = ({ onClose, IdUser, IdTeam, refreshTeams}) =>{
    
    const [Loading, setLoading] = useState(false);
    const [TeamName, setTeamName] = useState();
    const [newTeammate, setNewTeammate] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [Team, setTeam] = useState({TeamName:"", TeamId:"", IdOwner:""});

    useEffect(() => {
        if(!IdTeam) return;
        const params = new URLSearchParams();
        params.append("func", "Team-gti");
        params.append("args", JSON.stringify({ IdTeam: IdTeam }));
        params.append("IdUserIS", IdUser);
        axios.post("", params)
        .then((response) => {
            console.log("response");
            let validate = JSON.stringify(response);
            if (validate.includes("User|Error")) {
                const messageToShow = response.data.Echo.split(":")[1];
                message.error(messageToShow);
                return;
            }
            else{
                console.log(response.data.TeamInfo);
                const {TeamInfo} = response.data;
                setTeam({TeamId: TeamInfo.TeamId, TeamName: TeamInfo.TeamName, IdOwner: TeamInfo.IdOwner});
                console.log(Team);
                setUsers(response.data.TeamMembers);
            }
            
        })
        .catch((error) => {
          console.log("Error", error);
        })
      },[IdUser, IdTeam]);

    const handlePermission = (e, userId) =>{
        console.log(`checked = ${e.target.checked}`);
        console.log(`user = ${userId}`);
    }
    const handleAddTeammate = () =>{
        const usersTeam = users;
        usersTeam.push({id:4, name: newTeammate, permissions:true })
        setUsers(usersTeam);
        setNewTeammate("");
        console.log(users);
    }
    const handleOnDeleteTeammate = (idUser) =>{
        if(!idUser) return;
        console.log(idUser);
    }
    const handleDeleteTeam = () =>{
        if(!IdTeam) return;
        const params = new URLSearchParams();
        params.append("func", "Team-dt");
        params.append("IdUserIS", IdUser);
        params.append("args", JSON.stringify(
            {
                 IdTeam: IdTeam, 
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

    return(
        <Modal
            width="60%"
            title={Team.TeamName}
            visible
            onCancel={onClose}
            footer={[
                <Popconfirm 
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
                <Button onClick={onClose}>
                Cancelar
                </Button>,
                <Button loading={Loading}
                type="primary" >
                Guardar
                </Button>,
            ]}
        >
            <>
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
                    <Title type="secondary"
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
                                onChange={handlePermission}
                                onDeleteTeammate={handleOnDeleteTeammate}/>
                    </List.Item>
                    )}
                />
            </>
        </Modal>
        );
}

export default EditTeamModal;