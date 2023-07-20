import { screen } from '@testing-library/react';
// import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import React from 'react';
import renderPath from '../helpers/renderPath';
// import renderWithRouter from '../helpers/renderWithRouter';
// import { drinkRecipeData, mealRecipeData } from '../helpers/recipeData';

const drinkUrl = '/drinks/15997/in-progress';
const mealUrl = '/meals/52977/in-progress';
const ingredient0Id = '0-ingredient-step';
const btnFinish = screen.queryByTestId('finish-recipe-btn');
const whiteHeart = 'whiteHeartIcon.svg';

describe('Testa a page RecipeInProgress - 1', () => {
  it('Verifica as renderizaçoes os ingredientes de uma Bebida', async () => {
    renderPath(drinkUrl);

    expect(screen.getByTestId(ingredient0Id)).toBeInTheDocument();
    expect(screen.queryByTestId('1-ingredient-step')).toBeInTheDocument();
    expect(screen.queryByTestId('2-ingredient-step')).toBeInTheDocument();
    expect(btnFinish).toBeInTheDocument();

    expect(screen.queryByRole('checkbox', { name: /Galliano/i })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: /Ginger ale/i })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: /Ice/i })).toBeInTheDocument();

    expect(screen.queryByRole('checkbox', { name: /Galliano/i })).not.toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Ginger ale/i })).not.toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Ice/i })).not.toBeChecked();
    expect(btnFinish).toBeDisabled();

    await act(async () => {
      userEvent.click(screen.queryByRole('checkbox', { name: /Galliano/i }));
      userEvent.click(screen.queryByRole('checkbox', { name: /Ginger ale/i }));
      userEvent.click(screen.queryByRole('checkbox', { name: /Ice/i }));
    });

    expect(screen.queryByRole('checkbox', { name: /Galliano/i })).toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Ginger ale/i })).toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Ice/i })).toBeChecked();
    expect(btnFinish).not.toBeDisabled();
  });
});

describe('Testa a page RecipeInProgress - 1', () => {
  it('Verifica as renderizaçoes os ingredientes de uma Comida', async () => {
    renderPath(mealUrl);

    expect(screen.getByTestId(ingredient0Id)).toBeInTheDocument();
    expect(screen.queryByTestId('1-ingredient-step')).toBeInTheDocument();
    expect(screen.queryByTestId('2-ingredient-step')).toBeInTheDocument();

    expect(screen.queryByRole('checkbox', { name: /Lentils/i })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: /Onion/i })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: /Carrots/i })).toBeInTheDocument();

    expect(screen.queryByRole('checkbox', { name: /Lentils/i })).not.toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Onion/i })).not.toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Carrots/i })).not.toBeChecked();
    expect(btnFinish).toBeDisabled();

    await act(async () => {
      userEvent.click(screen.queryByRole('checkbox', { name: /Lentils/i }));
      userEvent.click(screen.queryByRole('checkbox', { name: /Onion/i }));
      userEvent.click(screen.queryByRole('checkbox', { name: /Carrots/i }));
    });

    expect(screen.queryByRole('checkbox', { name: /Lentils/i })).toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Onion/i })).toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Carrots/i })).toBeChecked();
    expect(btnFinish).not.toBeDisabled();
  });
});

describe('Testa a page RecipeInProgress - 3', () => {
  it('Verifica a lógica de favoritar a receita de bebida', async () => {
    renderPath(drinkUrl);

    const btnFavorite = screen.queryByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    expect(screen.getByTestId(btnFavorite)).toHaveAttribute('src', whiteHeart);
    act(() => userEvent.click(screen.getByTestId(btnFavorite)));
    expect(screen.getByTestId(btnFavorite)).not.toHaveAttribute('src', whiteHeart);
    expect(screen.getByTestId(btnFavorite)).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('Verifica a lógica de favoritar a receita de comida', async () => {
    renderPath(mealUrl);

    const btnFavorite = screen.queryByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    expect(screen.getByTestId(btnFavorite)).toHaveAttribute('src', whiteHeart);
    act(() => userEvent.click(screen.getByTestId(btnFavorite)));
    expect(screen.getByTestId(btnFavorite)).not.toHaveAttribute('src', whiteHeart);
    expect(screen.getByTestId(btnFavorite)).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('Verifica a lógica de compartilhar a receita de bebida', async () => {
    renderPath(drinkUrl);

    const btnShare = screen.queryByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    act(() => userEvent.click(btnShare));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  it('Verifica a lógica de compartilhar a receita de comida', async () => {
    renderPath(mealUrl);

    const btnShare = screen.queryByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    act(async () => userEvent.click(btnShare));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});

// verifica se foi redirecionado para a página de receitas feitas
// await act(async () => userEvent.click(btnFinish));
// expect(history.location.pathname).toBe('');
