import React from 'react';
import { screen, userEvent } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes page Login', () => {
  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const button = screen.getByRole('button', { name: /login/i });

  // test('', () => {
  //   renderWithRouter(<Login />);

  //   expect(button).toBeDisabled();
  //   act(() => userEvent.type(email, 'testo@test.com'));
  //   expect(button).toBeDisabled();
  //   act(() => userEvent.type(password, 'abcd1234'));
  //   expect(button).toBeEnabled();
  // });

  test('redireciona para /meals após o login bem-sucedido', () => {
    const { history } = renderWithRouter(<Login />);

    userEvent.change(email, { target: { value: 'example@example.com' } });
    userEvent.change(password, { target: { value: 'senha1234' } });
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
  });
  test('renderiza corretamente', () => {
    renderWithRouter(<Login />);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('habilita o botão de login quando o email e a senha são válidos', () => {
    renderWithRouter(<Login />);

    userEvent.change(email, { target: { value: 'test@test.com' } });
    userEvent.change(password, { target: { value: 'senha1234' } });
    expect(button).not.toBeDisabled();
  });

  test('desabilita o botão de login quando o email ou a senha são inválidos', () => {
    renderWithRouter(<Login />);

    userEvent.change(email, { target: { value: 'emailnvalido' } });
    userEvent.change(password, { target: { value: '123' } });
    expect(button).toBeDisabled();
  });
});
