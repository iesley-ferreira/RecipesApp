import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../pages/Recipes';

describe('Teste a Página Recipes', () => {
  it('renderiza corretamente', () => {
    renderWithRouter(<Recipes />);
  });
  it('renderiza categorias de meals', () => {
    renderWithRouter(<Recipes />, { location: '/meals' });
    expect(screen.getByRole('button', { name: /Beef/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Breakfast/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Chicken/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dessert/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Goat/i })).toBeInTheDocument();
  });
  it('renderiza categorias de drinks', () => {
    renderWithRouter(<Recipes />, { location: '/drinks' });
    expect(screen.getByRole('button', { name: /Ordinary Drinks/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cocktail/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Shake/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Other/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cocoa/i })).toBeInTheDocument();
  });
});
