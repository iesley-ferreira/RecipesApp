import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Profile from '../pages/Profile';
import { act } from 'react-dom/test-utils';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
// import Profile from '../pages/Profile';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Profile', () => {
  const EMAIL_INPUT = 'email-input';
  const PASSWORD_INPUT = 'password-input';
  const LOGIN_BUTTON = 'login-submit-btn';
  const EMAIL = 'email@gmail.com';

  test('Testa se a página renderiza corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    // act(() => history.push('/profile'));

    // const profileEmail = screen.getByTestId('user-email');
    // expect(profileEmail).toBeInTheDocument();

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');

    const profileButton = screen.getByRole('img', { name: /profile icon/i });

    act(() => userEvent.click(profileButton));

    wait(() => expect(history.location.pathname).toBe('/profile'));

    await wait(() => {
      const profileEmail = screen.getByTestId('profile-email');
      const doneRecipesButton = screen.findByTestId('profile-done-btn');
      const favoriteRecipesButton = screen.findByTestId('profile-favorite-btn');
      const logoutButton = screen.findByTestId('profile-logout-btn');
      const header = screen.findByRole('heading', { name: /profile/i });
      const footerDrinkBtn = screen.findByTestId('drinks-bottom-btn');
      const footerMealsBtn = screen.findByTestId('food-bottom-btn');

      expect(profileEmail).toBeInTheDocument();
      expect(doneRecipesButton).toBeInTheDocument();
      expect(favoriteRecipesButton).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(footerDrinkBtn).toBeInTheDocument();
      expect(footerMealsBtn).toBeInTheDocument();
    });
  });

  test('testa se o botão \'Done Recipes\' tem o comportamento esperado', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');

    const profileButton = screen.getByRole('img', { name: /profile icon/i });
    act(() => userEvent.click(profileButton));

    wait(() => expect(history.location.pathname).toBe('/profile'));

    await wait(() => {
      const doneRecipesButton = screen.getByText(/done recipes/i);
      act(() => userEvent.click(doneRecipesButton));
      expect(history.location.pathname).toBe('/receitas-feitas');
    });
  });

  test('testa se o botão \'Favorite Recipes\' tem o comportamento esperado', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');

    const profileButton = screen.getByRole('img', { name: /profile icon/i });
    act(() => userEvent.click(profileButton));

    wait(() => expect(history.location.pathname).toBe('/profile'));

    await wait(() => {
      const doneRecipesButton = screen.getByText(/favorite recipes/i);
      act(() => userEvent.click(doneRecipesButton));
      expect(history.location.pathname).toBe('/favorite-recipes');
    });
  });
});
