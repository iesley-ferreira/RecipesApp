import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const beefCateg = 'Beef-category-filter';
const cardImg = '0-card-img';
const cardName = '0-card-name';
const allCategory = 'All-category-filter';
const mockRecipes = [
  { strCategory: 'Beef' },
  { strCategory: 'Breakfast' },
  { strCategory: 'Chicken' },
];

describe('Teste a Página Recipes', () => {
  test('testa se há os cards de receitas', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    await waitFor(async () => {
      expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId(cardImg)).toBeInTheDocument();
      expect(screen.getByTestId(cardName)).toBeInTheDocument();
    });
  });

  it('testa se o filtro funciona', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    await waitFor(() => {
      const corba = screen.getByTestId('0-card-name');
      const burek = screen.getByTestId('1-card-name');
      expect(screen.getByTestId(beefCateg)).toBeInTheDocument();
      expect(corba).toBeInTheDocument();
      expect(burek).toBeInTheDocument();
    }, { timeout: 3000 });
    act(() => fireEvent.click(screen.getByTestId(beefCateg)));
    await waitFor(() => {
      expect(screen.getAllByText('Beef and Mustard Pie')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Beef and Oyster pie')[1]).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('renderiza categorias de meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    await waitFor(() => {
      expect(screen.getByTestId(beefCateg)).toBeInTheDocument();
      expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Chicken-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Dessert-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();
    });
  });

  it('renderiza categorias de drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    await waitFor(() => {
      expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Cocktail-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Other / Unknown-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Cocoa-category-filter')).toBeInTheDocument();
    });
  });

  it('Testa o botão All recipes', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    await waitFor(() => {
      expect(screen.getByTestId(allCategory)).toBeInTheDocument();
    }, { timeout: 3000 });
    act(() => fireEvent.click(screen.getByTestId(allCategory)));
    await waitFor(() => {
      expect(screen.getAllByText('GG')[0]).toBeInTheDocument();
      expect(screen.getAllByText('A1')[1]).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('Atualiza as receitas corretamente ao clicar no botão "All"', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const recipe = {
      idFood: '0',
      strMeal: 'Corba',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
        meals: [recipe],
      }),
    });
  });

  test('handleCategory should update usualRecipes with filtered recipes', async () => {
    const setUsualRecipes = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      json: () => ({ meals: mockRecipes }),
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    act(() => fireEvent.click(screen.getByTestId('Beef-category-filter')));
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
    expect(setUsualRecipes).toHaveBeenCalledWith([
      { strCategory: 'Beef' },
      { strCategory: 'Chicken' },
    ]);
  });

  test('handleAll should update usualRecipes with all recipes', async () => {
    const setUsualRecipes = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      json: () => ({ meals: mockRecipes }),
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    act(() => fireEvent.click(screen.getByTestId(allCategory)));
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(setUsualRecipes).toHaveBeenCalledWith(mockRecipes);
  });
});
