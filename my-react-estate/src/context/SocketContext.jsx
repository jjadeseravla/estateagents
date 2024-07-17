import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);
  const { currentUser } = useContext(AuthContext);

  //whenever we visit website, we connect to local socket:
  useEffect(() => {
    setSocket(io("http://localhost:4000"))
  }, []);

  // whenever we are connected, we need the current userid
  // need to add user info to empty array in socket/app file
  useEffect(() => {
    currentUser && socket?.emit("newUser", currentUser.id)
  }, [currentUser, socket]);

  // pass this to provider and use whenever i want
  return (
    <SocketContext.Provider value={{socket}}>
      { children}
    </SocketContext.Provider>
  )
}