import React, {useState, useEffect} from 'react';
import { List, message } from 'antd';
import CardTeam from '../../components/Cards/CardTeam';
import axios from "../../axios";

const Teams = ({user, ...rest}) =>{
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
              if(teams) {
                  setTeams(Teams);
              }
          }
      })
      .catch((error) => {
          console.log(error);
      })
    }, []);
      const [isLoading, setIsLoading] = useState(false);
      const [teams, setTeams] = useState([]);
return  (

    <>
        <span>Equipos de: {user.FirstName}</span>
        <List
        itemLayout="horizontal"
        loading = {isLoading}
        dataSource={teams}
        renderItem={item => (
            <List.Item style={{paddingBottom:1}}>
               <CardTeam title={item.TeamName}/>
            </List.Item>
            )}
        />
    </>
);
}
export default Teams;