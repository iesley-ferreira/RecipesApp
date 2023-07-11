import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from '../helpers/renderWithRouter';

const EMAILINPUT = 'email-input';
const PASSINPUT = 'password-input';

describe('Testes page Login', () => {
  test('redireciona para /meals após o login bem-sucedido', () => {
    const { history } = renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAILINPUT);
    const password = screen.getByTestId(PASSINPUT);
    const button = screen.getByRole('button', { name: /login/i });
    userEvent.type(email, 'example@example.com');
    userEvent.type(password, 'senha1234');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
  });
  test('renderiza corretamente', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAILINPUT);
    const password = screen.getByTestId(PASSINPUT);
    const button = screen.getByRole('button', { name: /login/i });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('habilita o botão de login quando o email e a senha são válidos', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAILINPUT);
    const password = screen.getByTestId(PASSINPUT);
    const button = screen.getByRole('button', { name: /login/i });
    userEvent.type(email, 'test@test.com');
    userEvent.type(password, 'senha1234');
    expect(button).not.toBeDisabled();
  });

  test('desabilita o botão de login quando o email ou a senha são inválidos', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAILINPUT);
    const password = screen.getByTestId(PASSINPUT);
    const button = screen.getByRole('button', { name: /login/i });
    userEvent.type(email, 'emailnvalido');
    userEvent.type(password, '123');
    expect(button).toBeDisabled();
  });
});
