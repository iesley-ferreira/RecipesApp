import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Profile from '../pages/Profile';
import { act } from 'react-dom/test-utils';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import Profile from '../pages/Profile';
import renderWithRouter from '../helpers/renderWithRouter';

const doneBtn = 'profile-done-btn';
const favoriteBtn = 'profile-favorite-btn';
const logoutBtn = 'profile-logout-btn';

describe('Profile', () => {
  test('Testa se a página renderiza corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const profileButton = screen.getByTestId('profile-top-btn');

    act(() => userEvent.click(profileButton));

    wait(() => expect(history.location.pathname).toBe('/profile'));
  });

  test('testa as renderizações', async () => {
    renderWithRouter(<Profile />);
    await wait(() => {
      const profileEmail = screen.getByTestId('profile-email');
      const doneRecipesButton = screen.findByTestId(doneBtn);
      const favoriteRecipesButton = screen.findByTestId(favoriteBtn);
      const logoutButton = screen.findByTestId(logoutBtn);
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
    const { history } = renderWithRouter(<Profile />);

    expect(screen.getByTestId(doneBtn)).toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId(doneBtn)));

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('testa se o botão \'Favorite Recipes\' tem o comportamento esperado', async () => {
    const { history } = renderWithRouter(<Profile />);

    expect(screen.getByTestId(favoriteBtn)).toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId(favoriteBtn)));

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('testa se o botão \'Logout\' tem o comportamento esperado', async () => {
    const { history } = renderWithRouter(<Profile />);

    expect(screen.getByTestId(logoutBtn)).toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId(logoutBtn)));

    expect(history.location.pathname).toBe('/');
  });
});
