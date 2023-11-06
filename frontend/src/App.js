import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatPage from "./pages/ChatPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Features from "./pages/Features";

const socket = io.connect("http://localhost:4000");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");


  return (
    <Router>
      <div className="App">
        <Switch>          
          <Route path="/chat">
            <ChatPage socket={socket} name={name} room={room} />
          </Route>          
          <Route path='/features' exact>
            <Features/>
          </Route>
          <Route path="/" exact>
            <Homepage
              name={name}
              setName={setName}
              room={room}
              setRoom={setRoom}
              socket={socket}
            />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
