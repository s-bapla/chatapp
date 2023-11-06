import React from 'react'
import { useHistory } from "react-router-dom";

const JoinRoom = ({ name, setName, room, setRoom, socket }) => {

  const history = useHistory();

  const enterRoom = () => {
    if (room && name) {
      socket.emit("join", room);
      history.push("/chat");
    }
  };  
  
    return (
    <>
      <h3>Welcome to Chatr</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
      />
      <input
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        type="text"
        placeholder="Room ID"
      />
      <button type="button" onClick={enterRoom}>
        Join room
      </button>
    </>
  );
}

export default JoinRoom
