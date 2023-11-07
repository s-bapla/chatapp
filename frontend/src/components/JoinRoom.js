import React from "react";
import { Col, Container, Row } from "react-bootstrap";
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
    <Container>
      <Row>
        <h3>Welcome to Chatr</h3>
      </Row>
      <Row className="d-flex justify-content-center">
          <Col>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </Col>
          <Col>
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              type="text"
              placeholder="Room ID"
            />
          </Col>
      </Row>

      <Col>
        <button className="btn btn-success mt-3" type="button" onClick={enterRoom}>
          Join room
        </button>
      </Col>
    </Container>
  );
};

export default JoinRoom;
