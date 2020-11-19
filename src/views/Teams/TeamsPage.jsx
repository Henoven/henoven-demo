import React, {useState} from 'react';
import { withRouter, Route, Switch  } from 'react-router-dom';

import Teams from './Teams/Teams';
import InvitationsTeam from './InvitationsTeam/InvitationsTeam';
import TeamDetail from "./TeamDetail/TeamDetail"
import { Row } from 'antd';

const TeamsPage =({histoy, user})=> {

    const [ViewSelected, setViewSelected] = useState("teams");
    const renderOption = () => {
        switch (ViewSelected) {
            case "teams":
                return <Teams 
                onChange = {(path) => setViewSelected(path) } 
                histoy = {histoy} 
                user={user}
                />
            case "invitationsTeam":
                return <InvitationsTeam 
                />
        
            default:
                return <h1>ERROR 404 Not found</h1>
        }
    }
    return(
        <>
            <Row>
                <span>Menú</span>
            </Row>
            <Switch>
                <Route 
                    path="/teams/:idTeam" 
                    exact 
                    render={() => 
                        <TeamDetail
                        />
                    }
                />
                <Route render={() => renderOption()} />
            </Switch>
        </>
    );
}

export default withRouter(TeamsPage);