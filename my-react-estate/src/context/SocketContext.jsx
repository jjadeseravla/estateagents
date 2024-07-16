import { createContext } from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

  const [socket, setSocket] = useState(null
  );

  //whenever we visit website, we connect to local socket:
  useEffect(() => {
    setSocket(io("http://localhost:4000"))
  }, [])

  // pass this to provider and use whenever i want
  return (
    <SocketContext.Provider value={{socket}}>
      { children}
    </SocketContext.Provider>
  )
}