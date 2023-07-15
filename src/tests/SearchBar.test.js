import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import SearchBar from '../components/SearchBar';
import { fetchRecipesByIngredient, fetchRecipesByName, fetchRecipesByFirstLetter } from '../services/fetchAPI';

const searchBtn = 'exec-search-btn';

describe('Teste a Página SearchBar', () => {
  test('exibe input de busca ao clicar no ícone de busca', () => {
    renderWithRouter(<SearchBar />);
    expect(screen.queryByTestId('search-input')).toBeNull();
    userEvent.click(getByTestId('search-icon'));

    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();
  });

  test('faz a busca por ingrediente', async () => {
    renderWithRouter(<SearchBar />);

    await act(async () => {
      // userEvent.click(screen.getByTestId(searchBtn));
    });

    expect(fetchRecipesByIngredient).toHaveBeenCalledWith(ingredientMock);
    expect(setUsualRecipesMock).toHaveBeenCalledWith('receitas por ingrediente');
  });

  test('faz a busca por nome', async () => {
    renderWithRouter(<SearchBar />);

    const nameMock = 'pasta';
    fetchRecipesByName.mockResolvedValueOnce('receitas por nome');

    await act(async () => {
    //   userEvent.click(getByTestId(searchBtn));
    });

    expect(screen.fetchRecipesByName).toHaveBeenCalledWith(nameMock);
    expect(setUsualRecipesMock).toHaveBeenCalledWith('receitas por nome');
  });

  test('faz a busca por primeira letra', async () => {
    renderWithRouter(<SearchBar />);

    const letterMock = 'A';
    fetchRecipesByFirstLetter.mockResolvedValueOnce('receitas por primeira letra');

    await act(async () => {
      userEvent.click(screen.getByTestId(searchBtn));
    });

    expect(fetchRecipesByFirstLetter).toHaveBeenCalledWith(letterMock);
    expect(setUsualRecipesMock).toHaveBeenCalledWith('receitas por primeira letra');
  });

  test('exibe um alerta ao fazer uma busca com mais de um caractere usando o filtro por primeira letra', () => {
    renderWithRouter(<SearchBar />);

    global.alert = jest.fn();

    userEvent.click(screen.getByTestId(searchBtn));

    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
