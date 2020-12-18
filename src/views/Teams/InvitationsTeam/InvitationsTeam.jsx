import React from 'react';
import {List, message} from "antd";

import axios from "../../../axios";

import CardInvitation from "../../../components/Cards/CardInvitation";

const InvitationsTeam = ({invitations, setInvitations,  setTeams, isLoading, user}) =>{

    function handleInvitation(Status, IdUserTeamInvitation){
        const params = new URLSearchParams();
        params.append("func", "Team-aori");
        params.append("IdUserIS", user.IdUser);
        params.append("args", JSON.stringify(
            {
                IdUserTeamInvitation,
                Status 
            }));
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            const messageToShow = response.data.Echo.split(":")[1];
            console.log(response);
            if (validate.includes("User")) {
                if(validate.includes("Error")){
                    message.error(messageToShow);
                    return;
                }
                else{
                    message.success(messageToShow);
                }
            }
            const { Teams, Invitations } = response.data;
            setTeams(Teams)
            setInvitations(Invitations);
        })
        .catch((error) => {
          console.log("Error", error);
        })
    }

    return(
        <>
            <List
                itemLayout="horizontal"
                loading = {isLoading}
                dataSource={invitations}
                renderItem={item => (
                <List.Item style={{paddingBottom:1}}>
                    <CardInvitation 
                        title={item.TeamName} 
                        idTeam={item.IdTeam}
                        status={item.Status}
                        userWhoSendInvitationName={item.UserWhoSendInvitation.FirstName}
                        onConfirm={() => handleInvitation(true, item.IdUserTeamInvitation)}
                        onReject={() => handleInvitation(false, item.IdUserTeamInvitation)}
                    />
                </List.Item>
                )}
            />
        </>
    );
}

export default InvitationsTeam;