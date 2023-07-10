import React from 'react';
import { act, screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Testes page Login', () => {
  test('', () => {
    render(<Login />);
    // const { history } = renderWithRouterAndRedux(<Login />);
    expect(screen.getByText(/app receitas/i)).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toBeDisabled();
    act(() => userEvent.type(email, 'testo@test.com'));
    expect(button).toBeDisabled();
    act(() => userEvent.type(password, 'abcd1234'));
    expect(button).toBeEnabled();

    userEvent.click(button);
    // expect(history.location.pathname).toBe('/');
  });
});
