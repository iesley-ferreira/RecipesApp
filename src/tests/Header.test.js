import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import Header from '../components/Header';

const topBtn = 'search-top-btn';

describe('Header', () => {
  test('renderiza corretamente', () => {
    renderWithRouter(<Header />);
    const searchTop = screen.getByTestId(topBtn);
    expect(searchTop).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByAltText('search icon')).toBeInTheDocument();
    expect(screen.getByAltText('logo1recipes')).toBeInTheDocument();
    expect(screen.getByAltText('logo2recipes')).toBeInTheDocument();
  });
  test('exibe inputs de busca ao clicar no botão de busca', async () => {
    renderWithRouter(<Header />);
    expect(screen.queryByTestId('search-input')).toBeNull();
    expect(screen.queryByTestId('search-submit-btn')).toBeNull();

    await act(async () => userEvent.click(searchTop));

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-submit-btn')).toBeInTheDocument();
  });

  test('redireciona para a página de perfil ao clicar no botão de perfil', async () => {
    const { history } = renderWithRouter(<Header />);

    await act(async () => userEvent.click(searchTop));

    expect(history.location.pathname).toBe('/profile');
  });
});
