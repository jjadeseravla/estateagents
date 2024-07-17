import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  //user info in local storage is checked by state and is a string so need JSON.parse()
  const [currentUser, setCurrentUser] = useState(
    // if theres a user in localstorage we will use it if not null
    JSON.parse(localStorage.getItem('user')) || null
  );


  const updateUser = (data) => {
    setCurrentUser((prevUser) => {
    // Update localStorage immediately after updating state
    //localStorage will always be updated with the latest user data whenever updateUser is called. 
    //This should resolve the issue you're encountering with the user data not being updated in the localStorage.
      console.log('----------------------')
      localStorage.setItem('user', JSON.stringify(data));
    return data;
    });
  }

  // useEffect(() => {
  //   // whenever our currentUser changes, we'll update local storage:
  //   localStorage.setItem('user', JSON.stringify(currentUser));
  // }, [currentUser])

// we can use this currentUser in the value passed in every component that is wrapped by this provider
  return (
    <AuthContext.Provider value={{currentUser, updateUser}}>
      { children}
    </AuthContext.Provider>
  )
}