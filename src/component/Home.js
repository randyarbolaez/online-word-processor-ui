import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MarkdownEditor from "./MarkdownEditor";

const Container = styled.div`
  /* background-color: purple; */
  /* height: 100vh; */
  display: flex;
`;

const InformationWrapper = styled.div`
  width: 20vw;
`;

const Home = ({ username, socket }) => {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    socket.on("user joined", (data) => {
      setNumberOfUsers(data.numUsers);
      setAllUsers(data.allUsers);
    });

    socket.on("user left", (data) => {
      setNumberOfUsers(data.numUsers);
      setAllUsers(data.usersLeft);
    });

    socket.on("login", (data) => {
      setNumberOfUsers(data.numUsers);
      setAllUsers(data.allUsers);
    });
  });

  return (
    <Container>
      <MarkdownEditor socket={socket} />
      <InformationWrapper>
        <p>Hello | {username}</p>
        <p>Num of Users | {numberOfUsers}</p>
        {allUsers.map((username) => (
          <span key={username}>| {username} </span>
        ))}
      </InformationWrapper>
    </Container>
  );
};

export default Home;
