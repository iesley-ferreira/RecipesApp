import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../pages/Recipes';

describe('Teste a Página Recipes', () => {
  it('renderiza corretamente', async () => {
    renderWithRouter(<Recipes />);

    await screen.findByTestId('page-title');

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
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
