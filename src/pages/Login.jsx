import React from 'react';

export default function Login() {
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

  return (
    <div>
      <label>
        Email
        <input
          type="email"
          name="email"
          // value={ email }
          data-testid="email-input"
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          name="password"
          // value={ password }
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        name="game"
        // disabled={ disabled }
        data-testid="login-submit-btn"
      >
        Login
      </button>
    </div>
  );
}
