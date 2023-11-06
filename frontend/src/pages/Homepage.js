import React from 'react'
import JoinRoom from '../components/JoinRoom';
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from '../components/Header';

const Homepage = ({
  name,
  setName,
  room,
  setRoom,
  setShowToast,
  socket,
  showToast,
}) => {
  return (
    <>
      <Header/>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row>
          <Col xs={12} md={8} lg={6}>
            <Card
              style={{
                width: "40vw",
                height: "40vh",
                backgroundColor: "lightblue",
              }}
            >
              <Card.Body className="d-flex justify-content-center align-items-center">

                <Row className='d-inline-block'>
                  <JoinRoom
                    name={name}
                    setName={setName}
                    room={room}
                    setRoom={setRoom}
                    setShowToast={setShowToast}
                    socket={socket}
                    showToast={showToast}
                  />
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage
