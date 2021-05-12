import React, {useState, useEffect} from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Row, Button, Divider, message, Badge } from 'antd';

import Teams from './Teams/Teams';
import InvitationsTeam from './InvitationsTeam/InvitationsTeam';
import axios from "../../axios";

const TeamsPage =({histoy, user})=> {
    
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [invitations, setInvitations] = useState([]);
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
                const { Teams, Invitations } = response.data;
                if(response.data) {
                    setTeams(Teams);
                    setInvitations(Invitations);
                }
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
        .finally(()=> {
            setLoadTeams(false);
            setIsLoading(false);
        })
      }, [loadTeams]);

    const [ViewSelected, setViewSelected] = useState("teams");
    const renderOption = () => {
        switch (ViewSelected) {
            case "teams":
                return (
                    <Teams 
                        onChange = {(path) => setViewSelected(path) } 
                        histoy = {histoy}
                        teams = {teams}
                        setTeams = {setTeams}
                        setInvitations = {setInvitations} 
                        isLoading = {isLoading}
                        setRefresh={setLoadTeams}
                        user={user}
                    />
                );
            case "invitationsTeam":
                return (
                    <InvitationsTeam
                        invitations = {invitations}
                        setTeams = {setTeams} 
                        setInvitations = {setInvitations}
                        isLoading = {isLoading}
                        setRefresh={setLoadTeams}
                        user={user}
                    />
                )
        
            default:
                return <h1>ERROR 404 Not found</h1>
        }
    }
    return(
        <div style={{marginTop: 20}}>
            <Row >
                <Button  
                    size="large" 
                    onClick={()=> setViewSelected("teams")}>
                        Equipos
                </Button>
                <Badge count={invitations ? invitations.length : 0}>
                    <Button  
                        size="large" 
                        onClick={()=> setViewSelected("invitationsTeam")}>
                            Invitaciones
                    </Button>
                </Badge>
            </Row>
            <Divider style={{marginTop:5}}/>
            <Switch>
                <Route path="/teams" render={() => renderOption()} />
            </Switch>
        </div>
    );
}

export default withRouter(TeamsPage);