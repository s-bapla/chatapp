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
    history.push("/");
  };

  const leaveChat = () => {
    setShowLeaveModal(true);
  };
  return (
    <Container >
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="chat-box">
            <div className="header">
              <h3>Chatr</h3>
            </div>
            <ListGroup className="chat-messages">
              {messageList.map((data, index) => (
                <ListGroup.Item key={index}>
                  <small className="text-muted">{data.time} </small>
                  <strong>{data.name}</strong>: {data.message}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Form className="footer">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter message to send"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button onClick={handleSend}>Send</Button>
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
