import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../pages/Recipes';

describe('Teste a Página Recipes', () => {
  it('renderiza corretamente', async () => {
    renderWithRouter(<Recipes />);

    await screen.findByTestId('page-title');

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('usual-recipes-card')).toBeInTheDocument();
    expect(screen.getAllByTestId(/category-filter$/)).toBeInTheDocument();
    await act(async () => {
      userEvent.click(getAllByTestId(/category-filter$/));
    });

    await act(async () => {
      userEvent.click(getByTestId('filter-1'));
    });

    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('renderiza categorias de meals', async () => {
    renderWithRouter(<Recipes />, { location: '/meals' });

    await screen.findByRole('button', { name: /Beef/i });
    expect(screen.getByRole('button', { name: /Beef/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Breakfast/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Chicken/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dessert/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Goat/i })).toBeInTheDocument();
  });

  it('renderiza categorias de drinks', async () => {
    renderWithRouter(<Recipes />, { location: '/drinks' });

    await screen.findByRole('button', { name: /Ordinary Drinks/i });
    expect(screen.getByRole('button', { name: /Ordinary Drinks/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cocktail/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Shake/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Other/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cocoa/i })).toBeInTheDocument();
  });
});
