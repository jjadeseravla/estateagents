import "./layout.scss";
import Navbar from "../../components/navBar/NavBar.jsx"
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext } from "react";
import { Navigate } from 'react-router-dom';


function RequireAuth() {

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return (
    <Navigate to="/login"/>
  )
}

  return (
    <>
      {currentUser && (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
        </div>
        )}
      </>
  );
}

export default { RequireAuth};
