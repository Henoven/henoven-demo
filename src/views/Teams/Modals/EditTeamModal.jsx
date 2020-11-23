import React, {useState} from 'react';
import { Modal, Input, Button, Row, Divider, Typography, List} from "antd";
// import axios from "../../../axios";

import CardUser from '../../../components/Cards/CardUser';

const {Search} = Input;
const {Title} = Typography;

const initUsers = [
    {id:1, name:"Sebastián Rodríguez Maldonado", permissions:false},
    {id:2, name:"Santiago Angelini Wintergerst", permissions:true},
    {id:3, name:"Luis Daniel Guerra Rosales", permissions:true},
];

const EditTeamModal = ({ onCancel, userId, visible, refreshTeams, team}) =>{
    
    const [Loading, setLoading] = useState(false);
    const [TeamName, setTeamName] = useState();
    const [newTeammate, setNewTeammate] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState(initUsers);

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

    return(
        <Modal
            width="60%"
            title={team.TeamName}
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button onClick={onCancel}>
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
                refresh
                key={(user) => user.id.toString()}
                renderItem={item => (
                    <List.Item 
                    style={{paddingBottom:1}}>
                       <CardUser 
                                title={item.name} 
                                user={item}
                                canUserSeeDetailTravel={item.permissions}
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