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

describe('Teste a Página Recipes', () => {
  it('testa se há os cards de receitas', async () => {
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
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
    }, { timeout: 3000 });
    act(() => fireEvent.click(screen.getByTestId('All-category-filter')));
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

  // it('Testa o Card de meals', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   act(() => history.push('/meals'));
  //   await waitFor(async () => {
  //     expect(cardImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
  //     expect(cardImg).toHaveAttribute('alt', 'Corba');
  //     expect(cardName).toHaveTextContent('Corba');
  //   });
  // });

  // it('Testa o Card de drnks', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   act(() => history.push('/drinks'));
  //   await waitFor(async () => {
  //     expect(cardImg).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
  //     expect(cardImg).toHaveAttribute('alt', 'GG');
  //     expect(cardName).toHaveTextContent('GG');
  //   });
  // });

  // test('Valida as props requeridas', () => {
  //   const { recipe, index, option } = Card.propTypes;

  //   expect(recipe.isRequired).toBeTruthy();
  //   expect(index.isRequired).toBeTruthy();
  //   expect(option.isRequired).toBeTruthy();
  // });
});
