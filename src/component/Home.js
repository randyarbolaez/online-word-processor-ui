import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  /* background-color: purple;
  height: 100vh; */
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
  }, []);

  return (
    <Container>
      <p>Hello | {username}</p>
      <p>Num of Users | {numberOfUsers}</p>
      {allUsers.map((username) => (
        <span key={username}>| {username} </span>
      ))}
    </Container>
  );
};

export default Home;
