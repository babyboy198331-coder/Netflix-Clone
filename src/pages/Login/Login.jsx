import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signUp } from '../../firebase';

const Login = () => {

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userAuth = async (e) => {
    e.preventDefault(); 

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signUp(name, email, password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login'>

      <img src={logo} className='login-logo' alt="Logo" />

      <div className="login-form">
        <h1>{signState}</h1>

        <form onSubmit={userAuth}>

          {signState === "Sign Up" &&
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder='Your name'
            />
          }

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='Email'
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='Password'
          />

          <button type="submit">{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ?
            <p>
              New to Netflix?
              <span onClick={() => setSignState("Sign Up")}> Sign Up Now</span>
            </p>
            :
            <p>
              Already have an Account?
              <span onClick={() => setSignState("Sign In")}> Sign In Now</span>
            </p>
          }
        </div>

      </div>
    </div>
  );
};

export default Login;