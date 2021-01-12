import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 20vw;
  color: #e4b1ab;
`;

const NumberOfUsersH1 = styled.h1`
  text-align: center;
  font-size: 1.8vw;
  padding-bottom: 1vh;
  border-bottom: 1px solid #e39695;
`;

const User = styled.span`
  font-size: 1.2vw;
  border: "none";
`;

const InformationAboutUsers = ({ username, numberOfUsers, allUsers }) => {
  let userUsername = username;
  return (
    <Container>
      <NumberOfUsersH1>
        {allUsers.length === 1
          ? "You're the only one here"
          : `${numberOfUsers} Users Online`}
      </NumberOfUsersH1>
      {allUsers.map((username) => (
        <>
          <User
            style={{
              fontWeight: username === userUsername ? "bold" : "normal",
              color: username === userUsername ? "#fff" : "#e4b1ab",
              borderRight: allUsers.length >= 1 ? "0.2vw solid #e39695" : null,
              borderLeft: allUsers.length <= 1 ? "0.2vw solid #e39695" : null,
              padding: "0.2vw",
              margin: "0.2vw",
            }}
            key={username}
          >
            {" "}
            {username}{" "}
          </User>
        </>
      ))}
    </Container>
  );
};

export default InformationAboutUsers;
