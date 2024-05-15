import Chat from "../../components/chat/Chat.jsx";
import List from "../../components/list/List.jsx";
import apiRequest from "../../lib/apiReq";
import "./profilePage.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from '../../context/AuthContext.jsx';

function ProfilePage() {

  const navigate = useNavigate();

  const { updateUser, currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate, currentUser])

const handleLogout = async() => {
  try {
     await apiRequest.post('/auth/logout');
    // localStorage.removeItem('user');
    // instead of updating localstorage HERE to remove it, do below 
    //and updateuser to null from local storage IN from authcontext
    updateUser(null);
    navigate('/');
  } catch (e) {
    console.log(e);
  }
}
  
  return (
  <>
    { currentUser && (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "noavatar.jpg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
    )}
  </>
    )
}

export default ProfilePage;
