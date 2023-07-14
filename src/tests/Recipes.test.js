import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// import renderWithRouter from '../helpers/renderWithRouter';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Recipes from '../pages/Recipes';

describe('Teste a Página Recipes', () => {
  it('renderiza corretamente', async () => {
    renderWithRouter(<Recipes />);

    // expect(screen.getByTestId('page-title')).toBeInTheDocument();
    // expect(screen.getByTestId('usual-recipes-card')).toBeInTheDocument();
    // expect(screen.getAllByTestId(/category-filter/i)).toBeInTheDocument();
  });

  it('testa se há os cards de receitas', async () => {
    // renderWithRouter(<Recipes />, { location: '/meals' });
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <Recipes />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      // expect(screen.getByTestId(/-card-img/i)).toBeInTheDocument();
      // expect(screen.getByTestId(/-card-name/i)).toBeInTheDocument();
    });
  });

  it('testa se o filtro funciona', async () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <Recipes />
      </Router>,
    );
    await waitFor(() => {
      const corba = screen.getByAltText('Corba');
      const burek = screen.getByAltText('Burek');
      expect(corba).toBeInTheDocument();
      expect(burek).toBeInTheDocument();
      act(() => {
        userEvent.click(screen.getAllByTestId('Beef-category-filter'));
      });
      expect(corba).not.toBeInTheDocument();
      expect(burek).not.toBeInTheDocument();
    });
  });

  it('renderiza categorias de meals', async () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <Recipes />
      </Router>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Chicken-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Dessert-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();
    });
  });

  it('renderiza categorias de drinks', async () => {
    const history = createMemoryHistory();
    history.push('/drinks');
    render(
      <Router history={ history }>
        <Recipes />
      </Router>,
    );
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
