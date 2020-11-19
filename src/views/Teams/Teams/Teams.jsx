import React, {useState, useEffect} from 'react';
import { List, message, Tooltip, Button, Row, Modal, Input } from 'antd';
import CardTeam from '../../../components/Cards/CardTeam';
import { PlusCircleOutlined} from '@ant-design/icons';
import axios from "../../../axios";
import { useHistory } from 'react-router-dom';

const NewTeamModal = ({ onCancel, userId, visible, refreshTeams}) =>{
    
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
            onCancel(); 
        })
        .catch(console.log("Error"))
    };

    return(
        <Modal
            title="Crear nuevo equipo"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button onClick={onCancel}>
                Cancelar
                </Button>,
                <Button loading={Loading}
                type="primary" 
                onClick={handleCreateNewTeam}>
                Crear
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

const Teams = ({user, ...rest}) =>{
    
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [teams, setTeams] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadTeams, setLoadTeams] = useState(false);

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
      setLoadTeams(false);
    }, [loadTeams]);
    const handleOnNewTeam = () =>{
        setIsModalVisible(true);
    } 
    const handleOnEditTeam = (idTeam) =>{
        console.log("edit team", idTeam)
        history.push(`/teams/${idTeam}`);
    } 
    const handleOnExitTeam = (idTeam) =>{
        console.log("exit team", idTeam)
        if(!idTeam) return;
        const params = new URLSearchParams();
        params.append("func", "Team-lt");
        params.append("IdUserIS", user.IdUser);
        params.append("args", JSON.stringify(
            {
                 IdTeam: idTeam, 
            }));
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            if (validate.includes("User|Error")) {
                const messageToShow = response.data.Echo.split(":")[1];
                message.error(messageToShow);
                return;
            }
            setLoadTeams(true);
        })
        .catch(console.log("Error")) 
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
        onCancel={handleCancel}
        userId={user.IdUser}
        refreshTeams={setLoadTeams}/>
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