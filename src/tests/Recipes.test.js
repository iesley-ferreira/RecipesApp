import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
// import Recipes from '../pages/Recipes';
import App from '../App';

const beefCateg = 'Beef-category-filter';

describe('Teste a Página Recipes', () => {
  it('testa se há os cards de receitas', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    await waitFor(async () => {
      expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('0-card-img')).toBeInTheDocument();
      expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
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
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
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
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Cocktail-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Other / Unknown-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Cocoa-category-filter')).toBeInTheDocument();
    });
  });
});
