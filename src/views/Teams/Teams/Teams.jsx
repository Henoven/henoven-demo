import React, {useState, useEffect} from 'react';
import { List, message, Tooltip, Button, Row} from 'antd';
import CardTeam from '../../../components/Cards/CardTeam';
import { PlusCircleOutlined} from '@ant-design/icons';
import axios from "../../../axios";
import { withRouter } from 'react-router-dom';

import NewTeamModal from "../Modals/NewTeamModal";
import EditTeamModal from "../Modals/EditTeamModal";

const Teams = ({user, ...rest}) =>{
    
    const [isLoading, setIsLoading] = useState(false);
    const [teams, setTeams] = useState([]);
    const [teamSelected, setTeamSelected] = useState({IdTeam:"", TeamName:"", IdOwner:""});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalTeamVisible, setIsModalTeamVisible] = useState(false);
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
        if(!idTeam) return;
        const team = teams.find(x => x.IdTeam === idTeam)
        setTeamSelected({TeamName: team.TeamName,
                         IdTeam:team.IdTeam,
                         IdOwner:team.IdOwner});
        setIsModalTeamVisible(true);
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
    
return  (

    <>
        <NewTeamModal visible={isModalVisible} onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        userId={user.IdUser}
        refreshTeams={setLoadTeams}/>
        <EditTeamModal visible={isModalTeamVisible} onOk={handleOk}
        onCancel={() => setIsModalTeamVisible(false)}
        userId={user.IdUser}
        team={teamSelected}
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
export default withRouter(Teams);