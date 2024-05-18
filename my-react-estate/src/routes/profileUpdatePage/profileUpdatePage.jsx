import { AuthContext } from "../../context/AuthContext";
import "./profileUpdatePage.scss";
import { useContext, useState } from "react";
import apiRequest from '../../lib/apiReq';
import { useNavigate } from 'react-router-dom';
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
 
  const { currentUser, updateUser } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // FormData is a built-in JavaScript object that allows you to construct 
    //a set of key / value pairs representing form fields and their values.
    // it could be written without the FOrmData obj like this:   const formData = {
  //   username: e.target.username.value,
  //   email: e.target.email.value,
  //   password: e.target.password.value
  // };
    const {
      username,
      email,
      password,
     } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar
      });
      updateUser(res.data);
      navigate('/profile');
    } catch (e) {
      console.log(e);
      setError(e.response.data.message)
    }

  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar || "./noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloadName: "lamadev",
            uploadPreset: "estate",
            mutiple: false,
            maxImageFileSize: 2000000,
            folder:"avatars",
          }}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
