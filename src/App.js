import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import ENV from "./env";

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
      setNumberOfUsers(data.numUsers);
      setAllUsers(data.allUsers);
    });

    socket.on("new message", (data) => {
      setInputData(data.message);
      console.log("DATA", data); // data will be 'woot'
    });
  }, []);

  const addUser = (e) => {
    socket.emit("add user", username);
    setIsUserLoggedIn(true);
  };

  const onUsername = (e) => {
    setUsername(e.target.value);
  };

  const onUserTyping = (e) => {
    setInputData(e.target.value);
    socket.emit("new message", e.target.value);
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
