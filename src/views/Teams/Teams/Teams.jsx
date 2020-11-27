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
    const [Modal, setModal] = useState(null);
    const [loadTeams, setLoadTeams] = useState(false);
    const [LoadInfoTeam, setLoadInfoTeam] = useState(false);
    
    const handleOk = (newTeamName) => {
        console.log(newTeamName);
        setModal(null);
    };

    const Modals = {
        "newTeamModal": <NewTeamModal  
                        onOk={handleOk}
                        onClose={()=> setModal(null)}
                        userId={user.IdUser}
                        disabled={false}
                        refreshTeams={setLoadTeams}/>,
        "editTeamModal": <EditTeamModal 
                        onOk={handleOk}
                        onClose={()=> setModal(null)}
                        IdUser={user.IdUser}
                        IdTeam={teamSelected.IdTeam}
                        disabled={false}
                        refreshTeams={setLoadTeams}/>,
    }

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
              const { Teams, Invitations } = response.data;
              if(Teams) {
                  setTeams(Teams);
              }
          }
      })
      .catch((error) => {
        console.log("Error", error);
      })
      setLoadTeams(false);
      setLoadInfoTeam(false);
    }, [loadTeams]);
    const handleOnNewTeam = () =>{
        setModal("newTeamModal");
    } 
    const handleOnEditTeam = (idTeam) =>{
        if(!idTeam) return;
        const team = teams.find(x => x.IdTeam === idTeam)
        setTeamSelected({TeamName: team.TeamName,
                         IdTeam:team.IdTeam,
                         IdOwner:team.IdOwner});
        setLoadInfoTeam(true);
        setModal("editTeamModal");
    } 
    const handleOnExitTeam = (idTeam) =>{
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
        .catch((error) => {
            console.log("Error", error);
        })
    } 
    
return  (

    <>
        { Modals[Modal] }
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