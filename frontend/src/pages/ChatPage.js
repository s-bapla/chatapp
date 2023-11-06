import React from 'react'
import Header from '../components/Header';
import Chat from '../components/Chat';

const ChatPage = ({ socket, name, room }) => {
  return (
    <>
      <Header />
      <Chat socket={socket} name={name} room={room} />
    </>
  );
};

export default ChatPage
