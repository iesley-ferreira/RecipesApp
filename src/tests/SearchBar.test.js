import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
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
const ingredientSearch = 'ingredient-search-radio';

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
    expect(screen.getByTestId(ingredientSearch)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientSearch)).not.toBeChecked();
    expect(screen.getByTestId(nameSearch)).toBeInTheDocument();
    expect(screen.getByTestId(nameSearch)).not.toBeChecked();
    expect(screen.getByTestId(firstLetter)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetter)).not.toBeChecked();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();
  });

  test.only('faz a busca por ingrediente', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    act(() => userEvent.click(screen.getByTestId(searchTopBtn)));

    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientSearch)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ingredientSearch));

    await waitFor(() => {
      expect(screen.getByTestId(ingredientSearch)).toBeChecked();
    }, { timeout: 3000 });

    act(() => {
      userEvent.type(screen.getByTestId(searchInput), 'water');
      userEvent.click(screen.getByTestId(searchBtn));
    });

    // await waitFor(() => {
    //   expect(screen.getByAltText('Beef Asado')).toBeInTheDocument();
    // }, { timeout: 3000 });
  });

  test('faz a busca por nome', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    act(() => userEvent.click(screen.getByTestId(searchTopBtn)));

    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    expect(screen.getByTestId(nameSearch)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId(ingredientSearch)).not.toBeChecked();
    }, { timeout: 3000 });

    act(() => {
      fireEvent.change(screen.getByTestId(searchInput), 'Apam');
      fireEvent.click(screen.getByTestId(nameSearch));
      fireEvent.click(screen.getByTestId(searchBtn));
    });

    await waitFor(() => {
      expect(screen.getByText(/Apam balik/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('faz a busca por primeira letra', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    act(() => userEvent.click(screen.getByTestId(searchTopBtn)));

    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetter)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId(firstLetter)).not.toBeChecked();
    }, { timeout: 3000 });

    act(() => {
      fireEvent.change(screen.getByTestId(searchInput), 'A');
      fireEvent.click(screen.getByTestId(firstLetter));
      fireEvent.click(screen.getByTestId(searchBtn));
    });

    await waitFor(() => {
      expect(screen.getByText(/Apple Frangipan Tart/)).toBeInTheDocument();
      expect(screen.getByAltText(/Apple Frangipan Tart/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
  // expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  // expect(screen.getByText(/'Your search must have only 1 (one) character'/)).toBeInTheDocument();
});
