import React, { useEffect } from "react";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chat.css";
import { useHistory } from "react-router-dom";

const Chat = ({ socket, name, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const history = useHistory();

  const handleSend = async () => {
    if (message) {
      // timestamp and time copied code from stackoverflow
      const timestamp = new Date();
      const time = timestamp.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const data = {
        room,
        name,
        message,
        time,
      };
      await socket.emit("send-message", data);
      setMessageList((list) => [...list, data]);
      setMessage("");
    }
  };

const fetchAndSendGif = async () => {
  try {
    const response = await fetch("http://localhost:3001/fetch-gif");
    const base64data = await response.text();

    const gifMessage = {
      room,
      name,
      message: `data:image/gif;base64,${base64data}`,
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      isGif: true,
    };
    socket.emit("send-message", gifMessage);
    setMessageList((list) => [...list, gifMessage]);
  } catch (error) {
    console.error("Error fetching and sending GIF", error);
  }
};

  useEffect(() => {
    const receiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive-message", receiveMessage);

    return () => {
      socket.off("receive-message", receiveMessage);
    };
  }, [socket]);

  const confirmLeave = () => {
    //socket.emit("customDisconnect", () =>
    //  console.log(socket.id, "disconnected")
    //);
    history.push("/");
  };

  const leaveChat = () => {
    setShowLeaveModal(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="chat-box">
            <div className="header">
              <h3>Chatr</h3>
            </div>
            <ListGroup style={{ height: "40vh", overflow: "auto" }}>
              {messageList.map((data, index) => (
                <ListGroup.Item key={index}>
                  <small className="text-muted">{data.time} </small>
                  <strong>{data.name}</strong>:
                  {data.isGif ? (
                    <img
                      src={data.message}
                      alt="Gif"
                      style={{ maxWidth: "100%" }}
                    />
                  ) : (
                    <p style={{display:"inline-block"}}>
                      {data.message}
                    </p>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Form onSubmit={(e) => e.preventDefault()} className="footer">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter message to send"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </Col>
                <Col xs="auto">
                  <Button onClick={handleSend}>Send</Button>
                  <Button onClick={fetchAndSendGif}>Send Random GIF</Button>
                </Col>
              </Row>
            </Form>
          </div>
          <Button onClick={leaveChat} className="btn-danger mt-3">
            Leave Chat Room
          </Button>
        </Col>
      </Row>
      <Modal
        show={showLeaveModal}
        onHide={() => setShowLeaveModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to leave the chat room?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLeaveModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLeave}>
            Leave Room
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Chat;
