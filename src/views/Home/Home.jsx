import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Home =({histoy, doLogIn})=> {

    const [ViewSelected, setViewSelected] = useState("login");
    return(
        <>
            { ViewSelected === "register" ? 
                <Register onChange = {(path) => setViewSelected(path) } histoy = {histoy}
                doLogIn = {doLogIn}/>
                :
                <Login onChange = {(path) => setViewSelected(path)}  histoy = {histoy}
                doLogIn = {doLogIn}/>
            }
        </>
    );
}

export default withRouter(Home);