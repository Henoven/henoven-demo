import React, { useEffect } from 'react';
import logo from './logo.svg';
import axios from './axios';
import './App.css';

function App() {

  useEffect(() => {
        const params = new URLSearchParams();
        params.append("func", "User-li");
        params.append("args", JSON.stringify({ Email: "daniel@gmail.com", Password:"123"}));
        axios.post("", params)
        .then((response) => {
            let validar = JSON.stringify(response);
            if(validar.includes("FrontError|")){
                console.log(response.data);
            }
            else{
                console.log(response);
            }
        })
        .catch(console.log("Error"))
    }, )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
