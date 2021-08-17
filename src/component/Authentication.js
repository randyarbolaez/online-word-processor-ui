import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

const Wrapper = styled.div`
  display: flex;
  height: 55vh;
  margin: 15vh 10vw;
  color: #2f4550;
  font-size: 1vw;
  justify-content: center;
`;

const AuthenticationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 30%;
  background-color: #e39695;
  border-top-left-radius: 5%;
  border-bottom-left-radius: 5%;
`;

const Input = styled.input`
  height: 3vh;
  width: 10vw;

  outline-width: 0;
  padding-left: 10pt;

  font-size: 1.7vh;
  font-weight: bold;

  border: solid 0.3vh #586f7c;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 7vw;
  height: 3.5vh;
  font-size: 2.4vh;
  border: none;
  color: #aec5d0;
  background-color: transparent;
  border-bottom: 3px solid #f5d1d0;
  margin-top: 1.5vh;
  outline-width: 0;
  transition: all 0.51s ease-in-out;

  :hover {
    width: 6vw;
    color: #03547c;
    border-bottom: 3px solid transparent;
    cursor: pointer;
  }
`;

const AboutContainer = styled.div`
  text-align: center;
  width: 70%;
  background-color: #e4b1ab;

  border-top-right-radius: 5%;
  border-bottom-right-radius: 5%;
  border-left-color: #da5552;
  border-left-width: 2.5vw;
  border-left-style: double;
`;

const AboutText = styled.p`
  display: flex;
  align-items: center;

  font-size: 2.2vh;
  text-align: left;
  word-wrap: break-word;

  height: 40vh;
  margin: 1vh 2vh;
`;

const Authentication = ({ getAuthenticationState, socket }) => {
  const [username, setUsername] = useState("r");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    getAuthenticationState({ username, isUserLoggedIn });
  });

  const addUser = (e) => {
    let generatedID = uuidv4();
    if (uuidValidate(window.location.href.split("/")[3])) {
      let urlID = window.location.href.split("/")[3];
      setIsUserLoggedIn(true);
      socket.emit("add user", { username, urlID });
    } else {
      // window.history.pushState(
      //   { isUserLoggedIn },
      //   "Code Editor",
      //   `http://localhost:3000/${generatedID}`
      // );
      window.history.pushState(
        { isUserLoggedIn },
        "Code Editor",
        `https://owpu.herokuapp.com/${generatedID}`
      );
      setIsUserLoggedIn(true);
      socket.emit("add user", { username, generatedID });
    }
  };

  const onUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Wrapper>
      <AuthenticationContainer>
        <h1>About</h1>
        <h1>Authentication</h1>
        <Input
          type="text"
          placeholder="username"
          onChange={(e) => onUsername(e)}
        />
        {username && <Button onClick={(e) => addUser(e)}>Login</Button>}
      </AuthenticationContainer>
      {showAbout && (
        <AboutContainer>
          <h1>About</h1>
          <AboutText>
            An online word processor application — free to use. You can use it
            with your friends or anybody that you wish or you can you use it by
            yourself, it doesn't matter.
          </AboutText>
        </AboutContainer>
      )}
    </Wrapper>
  );
};

export default Authentication;
