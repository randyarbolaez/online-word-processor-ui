import React, { useState } from "react";
import io from "socket.io-client";

import Authentication from "./component/Authentication";
import Home from "./component/Home";

import ENV from "./env";

// const socket = io(ENV.backendAPIUrl);
const socket = io(process.env.backendAPIUrl);

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const getAuthenticationState = ({ username, isUserLoggedIn }) => {
    setIsUserLoggedIn(isUserLoggedIn);
    setUsername(username);
  };

  return (
    <>
      {isUserLoggedIn ? (
        <Home username={username} socket={socket} />
      ) : (
        <Authentication
          getAuthenticationState={getAuthenticationState}
          socket={socket}
        />
      )}
    </>
  );
};

export default App;
