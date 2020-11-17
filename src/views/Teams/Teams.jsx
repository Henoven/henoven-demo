import React, {useState, useEffect} from 'react';
import { List, message, Tooltip, Button, Row, Modal, Input } from 'antd';
import CardTeam from '../../components/Cards/CardTeam';
import { PlusCircleOutlined} from '@ant-design/icons';
import axios from "../../axios";

const NewTeamModal = ({ onCancel, onOk, visible}) =>{
    const [TeamName, setTeamName] = useState("");
    return(<Modal
        title="Crear nuevo equipo"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={[
            <Button onClick={onCancel}>
              Cancelar
            </Button>,
            <Button type="primary" onClick={onOk}>
              Crear
            </Button>,
          ]}
      >
        <Input placeholder="Nombre de equipo" onChange={(value)=> {setTeamName(value); console.log(TeamName);}}/>
      </Modal>);
}

const Teams = ({user, ...rest}) =>{
    
    const [isLoading, setIsLoading] = useState(false);
    const [teams, setTeams] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append("func", "Team-gutai");
      params.append("IdUserIS", user.IdUser);
      axios.post("", params)
      .then((response) => {
          setIsLoading(false);
          const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
          if(messageFromDB){
              const messageToShow =  response.data.Echo.split(":");
              message.error(messageToShow[1]);
          }
          else{
            console.log(response.data);
              const { Teams, Invitations } = response.data;
              console.log(Teams);
              if(teams) {
                  setTeams(Teams);
              }
          }
      })
      .catch((error) => {
          console.log(error);
      })
    }, []);
    const handleOnNewTeam = () =>{
        setIsModalVisible(true);
        console.log("new team")
    } 
    const handleOnEditTeam = (idTeam) =>{
        console.log("edit team", idTeam)
    } 
    const handleOnExitTeam = (idTeam) =>{
        console.log("exit team", idTeam)
    } 
    const handleOk = (newTeamName) => {
        console.log(newTeamName);
        setIsModalVisible(false);
      };
    
     const handleCancel = e => {
        setIsModalVisible(false);
      };
    
return  (

    <>
        <NewTeamModal visible={isModalVisible} onOk={handleOk}
        onCancel={handleCancel}/>
        <Row align="middle" justify="end" style={{marginTop:10}}>
            <Tooltip title="Crear nuevo equipo">
                <Button shape="circle" icon={<PlusCircleOutlined style={{color:"#3498db", fontSize:25}}
                onClick={handleOnNewTeam}/>} />
            </Tooltip>
        </Row>
        <List
        itemLayout="horizontal"
        loading = {isLoading}
        dataSource={teams}
        renderItem={item => (
            <List.Item style={{paddingBottom:1}}>
               <CardTeam title={item.TeamName} 
               idTeam={item.IdTeam}
               onEdit={handleOnEditTeam}
               onExit={handleOnExitTeam}/>
            </List.Item>
            )}
        />
    </>
);
}
export default Teams;