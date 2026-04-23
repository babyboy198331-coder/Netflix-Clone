import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {
  return (
    <div className='login'>
      
      <img src={logo} className='login-logo' alt="Logo" />

      <div className="login-form">
        <h1>Sign Up</h1>

        <form>
          <input type="text" placeholder='Your name' />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />

          <button type="submit">Sign Up</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <p>Need Help?</p>
          </div>
        </form>
<div className="form-switch">
  <p>New to Netflix? <span>Sign Up Now</span></p>
  <p>Already have an Account? <span>Sign In Now</span></p>
</div>
      </div>
    </div>
  )
}

export default Login