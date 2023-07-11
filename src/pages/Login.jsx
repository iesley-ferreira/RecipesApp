import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
    <div>
      <h1> App Receitas </h1>
      <label>
        Email
        <input
          type="emaill"
          name="emaill"
          value={ emaill }
          data-testid="email-input"
          onChange={ handleChangeEmail }
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ handleChangePass }
        />
      </label>
      <button
        type="button"
        name="game"
        disabled={ disabled }
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
      >
        Login
      </button>
    </div>
  );
}
