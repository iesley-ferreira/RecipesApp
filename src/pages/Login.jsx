import React, { useState, useEffect } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const max = 6;
    if (emailRegex.test(email) && password.length > max) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePass = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <div>
      <h1> App Receitas </h1>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={ email }
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
      >
        Login
      </button>
    </div>
  );
}
