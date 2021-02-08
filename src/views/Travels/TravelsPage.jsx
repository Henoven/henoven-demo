import React, {useState, useEffect} from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Row, Button, Divider, message, Badge } from 'antd';

import axios from "../../axios";
import CurrentTravels from './CurrentTravels/CurrentTravels';
import FinishedTravels from './FinishedTravels/FinishedTravels';

const TravelsPage =({histoy, user})=> {
    
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [invitations, setInvitations] = useState([]);
    const [loadTeams, setLoadTeams] = useState(false);
    const [ViewSelected, setViewSelected] = useState("currentTravels");

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
        setLoadTeams(false);
      }, [loadTeams]);

    const renderOption = () => {
        switch (ViewSelected) {
            case "currentTravels":
                return (
                    <CurrentTravels
                        onChange = {(path) => setViewSelected(path) } 
                        histoy = {histoy}
                        user={user}
                    />
                );
            case "finishedTravels":
                return (
                    <FinishedTravels
                        onChange = {(path) => setViewSelected(path) } 
                        histoy = {histoy}
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
                    onClick={()=> setViewSelected("currentTravels")}>
                        Viajes en curso
                </Button>
                <Button  
                    size="large" 
                    onClick={()=> setViewSelected("finishedTravels")}>
                        Viajes terminados
                </Button>
            </Row>
            <Divider style={{marginTop:5}}/>
            <Switch>
                <Route path="/travels" render={() => renderOption()} />
            </Switch>
        </div>
    );
}

export default withRouter(TravelsPage);