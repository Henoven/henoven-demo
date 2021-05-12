import React, {useState} from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import CurrentTravels from './CurrentTravels/CurrentTravels';
import FinishedTravels from './FinishedTravels/FinishedTravels';

const TravelsPage =({histoy, user})=> {
    
    const [ViewSelected, setViewSelected] = useState("currentTravels");


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
            {/* <Row >
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
            </Row> */}
            {/* <Divider style={{marginTop:5}}/> */}
            <Switch>
                <Route path="/travels" render={() => renderOption()} />
            </Switch>
        </div>
    );
}

export default withRouter(TravelsPage);