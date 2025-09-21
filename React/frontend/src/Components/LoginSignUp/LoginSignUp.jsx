import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';

const LoginSignUp = () => {
  const [action, setAction] = useState('Sign Up');
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can add real authentication here later
    navigate('/dashboard');
  };

  const handleSignUp = () => {
    // You can add real registration logic here later
    // For now, just navigate to dashboard after "sign up"
    navigate('/dashboard');
  };

  const handleSubmit = () => {
    if (action === 'Login') {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === 'Login' ? null : (
          <div className="input">
            <input type="text" placeholder="Username" />
          </div>
        )}
        <div className="input">
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <input type="password" placeholder="Password" />
        </div>
      </div>
      {action === 'Sign Up' ? null : (
        <div className="forgot-password">
          Forget Password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <button 
          type="button"
          className={action === 'Login' ? 'submit gray' : 'submit'} 
          onClick={() => setAction('Sign Up')}
        >
          Sign Up
        </button>
        <button 
          type="button"
          className={action === 'Sign Up' ? 'submit gray' : 'submit'} 
          onClick={action === 'Login' ? handleSubmit : () => setAction('Login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginSignUp;