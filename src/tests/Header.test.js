import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
import renderWithRouter from '../helpers/renderWithRouter';
// import Header from '../components/Header';
import App from '../App';

const idSearchBtn = 'search-top-btn';
const idSearchInput = 'search-input';
const idProfileBtn = 'profile-top-btn';

describe('Header', () => {
  test('renderiza corretamente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    expect(screen.getByTestId(idSearchBtn)).toBeInTheDocument();
    expect(screen.getByTestId(idProfileBtn)).toBeInTheDocument();
    // expect(screen.getByAltText('search icon')).toBeInTheDocument();
    expect(screen.getByAltText('logo1recipes')).toBeInTheDocument();
    expect(screen.getByAltText('logo2recipes')).toBeInTheDocument();
  });
  test('exibe inputs de busca ao clicar no botão de busca', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(screen.getByTestId(idSearchBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(idSearchInput)).toBeNull();
    expect(screen.queryByTestId('exec-search-btn')).toBeNull();
    act(() => userEvent.click(screen.getByTestId(idSearchBtn)));
    expect(screen.getByTestId(idSearchInput)).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });

  test('redireciona para a página de perfil ao clicar no botão de perfil', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(screen.getByTestId(idProfileBtn)).toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId(idProfileBtn)));

    expect(history.location.pathname).toBe('/profile');
  });

  it('Deve ocultar campo de busca ao pesquisar algo', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(screen.getByTestId(idSearchBtn)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(idSearchBtn));
    expect(screen.getByTestId(idSearchInput)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(idSearchBtn));
    expect(screen.queryByTestId(idSearchInput)).toBeNull();
  });
});
