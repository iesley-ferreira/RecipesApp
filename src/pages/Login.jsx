import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Login.css';
import logo from '../images/logoRecipesApp.png';
import tomate from '../images/tomate.png';

export default function Login() {
  const history = useHistory();
  const [emaill, setEmaill] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const max = 6;
    if (emailRegex.test(emaill) && password.length > max) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emaill, password]);

  const handleChangeEmail = ({ target }) => {
    setEmaill(target.value);
  };

  const handleChangePass = ({ target }) => {
    setPassword(target.value);
  };

  function handleSubmit() {
    localStorage.setItem('user', JSON.stringify({ email: emaill }));
    history.push('/meals');
  }

  return (
    <div className="login-container">
      <div className="purpleBackground">
        <img className="img1" src={ logo } alt="logo" />
        <img className="img2" src={ tomate } alt="" />
      </div>
      <div className="login-inputs">
        <h1> Login </h1>
        <label>
          <input
            type="emaill"
            name="emaill"
            value={ emaill }
            data-testid="email-input"
            onChange={ handleChangeEmail }
            placeholder="Email"
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ handleChangePass }
            placeholder="Password"
          />
        </label>
        <button
          type="button"
          name="game"
          disabled={ disabled }
          data-testid="login-submit-btn"
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </div>
    </div>
  );
}
