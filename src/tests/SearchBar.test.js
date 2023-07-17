import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
// import SearchBar from '../components/SearchBar';
// import { fetchRecipesByIngredient, fetchRecipesByName, fetchRecipesByFirstLetter } from '../services/fetchAPI';
import App from '../App';

const searchBtn = 'exec-search-btn';
const searchInput = 'search-input';
const searchTopBtn = 'search-top-btn';
const firstLetter = 'first-letter-search-radio';
const nameSearch = 'name-search-radio';

describe('Teste a Página SearchBar', () => {
  test('exibe input de busca ao clicar no ícone de busca', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(screen.queryByTestId(searchInput)).toBeNull();
    act(() => userEvent.click(screen.getByTestId(searchTopBtn)));

    expect(screen.queryByTestId(searchInput)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();
  });

  test('Testa se renderiza corretamente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    act(() => userEvent.click(screen.getByTestId(searchTopBtn)));
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).not.toBeChecked();
    expect(screen.getByTestId(nameSearch)).toBeInTheDocument();
    expect(screen.getByTestId(nameSearch)).not.toBeChecked();
    expect(screen.getByTestId(firstLetter)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetter)).not.toBeChecked();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();
  });

  test('faz a busca por ingrediente', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    act(() => userEvent.click(screen.getByTestId(searchTopBtn)));
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetter)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();

    act(() => {
      userEvent.type(screen.getByTestId(searchInput), 'water');
      userEvent.click(screen.getByTestId(firstLetter));
      userEvent.click(screen.getByTestId(searchBtn));
    });
    await waitFor(() => {
      expect(screen.getAllByText(/Beef Asado/)[1]).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test.only('faz a busca por nome', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    act(() => userEvent.click(screen.getByTestId(searchTopBtn)));

    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    expect(screen.getByTestId(nameSearch)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();

    act(() => {
      userEvent.type(screen.getByTestId(searchInput), 'Apam');
      userEvent.click(screen.getByTestId(nameSearch));
      userEvent.click(screen.getByTestId(searchBtn));
    });
    // await waitFor(() => {
    expect(await screen.findByText(/Apam balik/)).toBeInTheDocument();
    // });
  });
});
