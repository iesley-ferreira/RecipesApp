import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import Header from '../components/Header';

const idSearchBtn = 'search-top-btn';
const idSearchInput = 'search-input';

describe('Header', () => {
  test('renderiza corretamente', () => {
    renderWithRouter(<Header />, { location: ('/meals') });
    expect(screen.getByTestId(idSearchBtn)).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByAltText('search icon')).toBeInTheDocument();
    expect(screen.getByAltText('logo1recipes')).toBeInTheDocument();
    expect(screen.getByAltText('logo2recipes')).toBeInTheDocument();
  });
  test('exibe inputs de busca ao clicar no botão de busca', async () => {
    renderWithRouter(<Header />);
    expect(screen.getByTestId(idSearchBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(idSearchInput)).toBeNull();
    expect(screen.queryByTestId('search-submit-btn')).toBeNull();
    userEvent.click(screen.getByTestId(idSearchBtn));
    expect(screen.getByTestId(idSearchInput)).toBeInTheDocument();
    expect(screen.getByTestId('search-submit-btn')).toBeInTheDocument();
  });

  test('redireciona para a página de perfil ao clicar no botão de perfil', async () => {
    const { history } = renderWithRouter(<Header />);
    expect(screen.getByTestId(idSearchBtn)).toBeInTheDocument();

    await act(async () => userEvent.click(idSearchBtn));

    expect(history.location.pathname).toBe('/profile');
  });

  it('Deve ocultar campo de busca ao pesquisar algo', () => {
    renderWithRouter(<Header />, { location: '/meals' });
    expect(screen.getByTestId(idSearchBtn)).toBeInTheDocument();

    userEvent.click(idSearchBtn);
    expect(screen.getByTestId(idSearchInput)).toBeInTheDocument();

    userEvent.click(idSearchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeNull();
  });
});
