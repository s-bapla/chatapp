import React from "react";
import Header from "../components/Header";

const Features = () => {
  return (
    <div>
      <Header />
      <h2 style={{ color: "black", fontWeight: "700" }}>Features:</h2>
      <ul style={{ listStyle: "none", fontWeight: "700" }}>
        <li>
          You can join a room by entering in a name and a room id and hitting
          join
        </li>
        <li>
          Once you're in the room you can send messages which will be recieved
          by other people in the room
        </li>
        <li>
          To send a message, type in the "Enter message to send" field and click
          the send button
        </li>
      </ul>
      <h2 style={{ color: "black", fontWeight: "700" }}>Costs:</h2>
      <ul style={{ color: "black", fontWeight: "700", listStyle: "none" }}>
        <li>
          If you leave and rejoin a room the messages will disapear from the UI
        </li>
        <li>
          Only people currently in the room will receive the message you send
        </li>
      </ul>
      <h2 style={{ color: "black", fontWeight: "700" }}>How to use App:</h2>
      <ul style={{ color: "black", fontWeight: "700", listStyle: "none" }}>
        <li>
          Enter your name and a room Id on the "join room" page
        </li>
        <li>
          Click Join room
        </li>
        <li>
            Enter a message in the "Enter message to send" field and click send
        </li>
        <li>
            To leave the chat room click "Leave Chat Room" button
        </li>
      </ul>
    </div>
  );
};

export default Features;
