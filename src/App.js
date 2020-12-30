import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import ENV from "./env";

import { v4 as uuidv4, validate as uuidValidate } from "uuid";

const socket = io(ENV.backendAPIUrl);

const App = () => {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [inputData, setInputData] = useState("");
  const [username, setUsername] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

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
      // setAllUsers(data.allUsers);
      console.log(data);
      setNumberOfUsers(data.numUsers);
      setAllUsers(data.allUsers);
    });

    socket.on("new message", (data) => {
      setInputData(data.message);
    });
  }, []);

  const addUser = (e) => {
    let generatedID = uuidv4();
    if (uuidValidate(window.location.href.split("/")[3])) {
      let urlID = window.location.href.split("/")[3];
      console.log(urlID, " }}urlID");
      setIsUserLoggedIn(true);
      socket.emit("add user", { username, urlID });
    } else {
      window.history.pushState(
        { isUserLoggedIn: true },
        "Code Editor",
        `http://localhost:3001/${generatedID}`
      );
      setIsUserLoggedIn(true);
      socket.emit("add user", { username, generatedID });
    }
  };

  const onUsername = (e) => {
    setUsername(e.target.value);
  };

  const onUserTyping = (e) => {
    let id = window.location.href.split("/")[3];
    setInputData(e.target.value);
    socket.emit("new message", { message: e.target.value, id });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isUserLoggedIn ? (
          <div style={{ marginBottom: 100 }}>
            {allUsers.map((username) => (
              <span key={username}>| {username} </span>
            ))}
            <p>Number of users online - {numberOfUsers}</p>
            <textarea
              onChange={(e) => onUserTyping(e)}
              value={inputData}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
        ) : (
          <div>
            <input
              placeholder="Login"
              type="text"
              value={username}
              onChange={(e) => onUsername(e)}
            />
            <button onClick={addUser}>Login</button>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
