import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MarkdownEditor from "./MarkdownEditor";
import InformationAboutUsers from "./InformationAboutUsers";

const Container = styled.div`
  display: flex;
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
      <InformationAboutUsers
        username={username}
        numberOfUsers={numberOfUsers}
        allUsers={allUsers}
      />
    </Container>
  );
};

export default Home;
