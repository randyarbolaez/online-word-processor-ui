import React, { useState, useEffect } from "react";
import { FaQuestion } from "react-icons/fa";
import styled from "styled-components";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

const Container = styled.div`
  display: flex;
  height: 55vh;
  margin: 15vh 10vw;
  color: #2f4550;
  font-size: 1vw;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  color: #2f4550;
  font-size: 1vw;
  justify-content: center;
`;

const AuthenticationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  // height: 60%;

  width: 30%;
  background-color: #e39695;
  border-top-left-radius: 5%;
  border-bottom-left-radius: 5%;
`;

const AuthenticationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;
`;

const Input = styled.input`
  height: 3vh;
  width: 10vw;

  outline-width: 0;
  // padding-left: 10pt;

  font-size: 1.7vh;
  font-size: 2vh;
  color: #03547c;j

  border: solid 0.3vh #586f7c;
  border: solid 0.3vh #f5d1d0;
  // border-radius: 10px;
  border: none;
  border-bottom: 3px solid #f5d1d0;
  text-align:center;

  transition: all 0.51s ease-in-out;
  background: none;

  ::placeholder{
    color: #aec5d0;
  }

  :hover {
    border-bottom: 3px solid transparent;
  }
`;

const Button = styled.button`
  width: 6vw;
  height: 3.8vh;
  font-size: 2.4vh;
  border: none;
  color: #aec5d0;
  background-color: transparent;
  border-bottom: 3px solid #f5d1d0;
  margin-top: 1.5vh;
  outline-width: 0;
  transition: all 0.51s ease-in-out;

  :hover {
    width: 5vw;
    color: #03547c;
    border-bottom: 3px solid transparent;
    cursor: pointer;
  }
`;

const AboutContainer = styled.div`
  text-align: center;
  width: 30%;
  height: 50%;
  background-color: #e4b1ab;

  border-top-right-radius: 5%;
  border-bottom-right-radius: 5%;
  border-left-color: #da5552;
  border-left-width: 2.5vw;
  border-left-style: double;
`;

const AboutTitle = styled.h1``;

const AboutText = styled.p`
  display: flex;
  align-items: center;

  font-size: 2.2vh;
  text-align: left;
  word-wrap: break-word;

  // height: 40vh;
  margin: 1vh 2vh;
`;

const Authentication = ({ getAuthenticationState, socket }) => {
  const [username, setUsername] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    getAuthenticationState({ username, isUserLoggedIn });
  });

  const addUser = (e) => {
    let generatedID = uuidv4();
    if (window.confirm("Would you like to send link to somebody?")) {
      let emailOfPerson = window.prompt("Email of person");
      window.open(
        `mailto:${emailOfPerson}?subject=${`Link from ${username}`}&body=Hi friend,
        %0D%0A%0D%0ALet's collaborate!%0D%0A%0D%0Ahttps://owpu.herokuapp.com/${generatedID}
        %0D%0A%0D%0AThanks,
        %0D%0A${username}`
      );
    }
    if (uuidValidate(window.location.href.split("/")[3])) {
      let urlID = window.location.href.split("/")[3];
      setIsUserLoggedIn(true);
      socket.emit("add user", { username, urlID });
    } else {
      let urlProtocol = window.location.href.split(":")[0];
      window.history.pushState(
        { isUserLoggedIn },
        "Code Editor",
        `${urlProtocol}://owpu.herokuapp.com/${generatedID}`
      );

      setIsUserLoggedIn(true);
      socket.emit("add user", { username, generatedID });
    }
  };

  const onUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Container>
      <Wrapper>
        <AuthenticationContainer style={{ borderRadius: !showAbout && "5%" }}>
          <h1>Authentication</h1>
          <AuthenticationWrapper>
            <Input
              type="text"
              placeholder="username"
              onChange={(e) => onUsername(e)}
            />
            {username && <Button onClick={(e) => addUser(e)}>Login</Button>}
            <FaQuestion
              style={{ cursor: "pointer", marginTop: "1.5vh" }}
              size={"25"}
              onClick={() => setShowAbout(!showAbout)}
            />
          </AuthenticationWrapper>
        </AuthenticationContainer>
        {showAbout && (
          <AboutContainer>
            <AboutTitle>About</AboutTitle>
            <AboutText>
              An online word processor application — free to use. You can use it
              with your friends or anybody that you wish or you can you use it
              by yourself, it doesn't matter.
            </AboutText>
          </AboutContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default Authentication;
