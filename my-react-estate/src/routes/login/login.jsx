import "./login.scss";
import { useState, useContext } from 'react';
import apiRequest from "../../lib/apiReq";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const res = await apiRequest.post('/auth/login', {
        username, password
      });
      console.log('Response data:', res.data); // Log response data


      updateUser(res.data);
      // localStorage.setItem('user', JSON.stringify(res.data));

      // isLoading(false);
      navigate('/');
    } catch (e) {
      console.error('Error:', e); // Log error for debugging
      setError(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
