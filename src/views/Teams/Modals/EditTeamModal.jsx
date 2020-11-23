import React, {useState} from 'react';
import { Modal, Input, Button, Row, Divider, Typography, List} from "antd";
// import axios from "../../../axios";

import CardUser from '../../../components/Cards/CardUser';

const {Search} = Input;
const {Title} = Typography;

const users = [
    {id:1, name:"Sebastián Rodríguez Maldonado", permissions:false},
    {id:2, name:"Santiago Angelini Wintergerst", permissions:true},
    {id:3, name:"Luis Daniel Guerra Rosales", permissions:true},
];

const EditTeamModal = ({ onCancel, userId, visible, refreshTeams, team}) =>{
    
    const [Loading, setLoading] = useState(false);
    const [TeamName, setTeamName] = useState();
    const [isLoading, setIsLoading] = useState(false);

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
                    onChange={(e) => setTeamName(e.target.value)}
                    value={TeamName}/>
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
                renderItem={item => (
                    <List.Item style={{paddingBottom:1}}>
                       <CardUser title={item.name} 
                                user={item}/>
                    </List.Item>
                    )}
                />
            </>
        </Modal>
        );
}

export default EditTeamModal;