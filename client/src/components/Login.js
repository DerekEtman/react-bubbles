import React, {useState} from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [userLogin,setUserLogin] = useState({username:'', password:''})
  console.log("USERLOGIN: ", userLogin);

  const handleChange = e => {
    console.log(e.target.value)
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }
  console.log("AxiosWithAuth", axiosWithAuth);

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/login', userLogin)
    .then(res =>{
      console.log(res); 
      localStorage.setItem('token', res);      
    })
    .then(props.history.push('/bubblepage'))
    .catch(err => console.log("Login Err: ", err))

  }

  
  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>Welcome to the Bubble App!</h1>
      <p>Please Login</p>

      <input 
      type="text" 
      name="username"
      placeholder="UserName"
      value={userLogin.username}
      onChange={handleChange}
      />

      <input
      type="text"
      name="password"
      placeholder="Password"
      value={userLogin.password}
      onChange={handleChange}
      />

      <button>Log In</button>
    </form>
    </>
  );
};

export default Login;
