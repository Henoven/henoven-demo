import React, {useState} from 'react';
import Login from './Login';
import Register from './Register';

const Home =()=> {

    const [ViewSelected, setViewSelected] = useState("login");
    return(
        <>
            { ViewSelected === "register" ? 
                <Register onChange = {(path) => setViewSelected(path)}/>
                :
                <Login onChange = {(path) => setViewSelected(path)}/>
            }
        </>
    );
}

export default Home;