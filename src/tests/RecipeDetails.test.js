// import { getAllByTestId, render, screen, waitFor } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderPath from '../helpers/renderPath';
import MEAL_RECIPE from './Mock/MealMock';

describe('Teste da página RecipeDetail.js', () => {
  test('Verificar se todos os elementos da página estão presentes na tela', async () => {
    renderPath('/meals/:52977');

    const image = screen.getByTestId('recipe-photo');
    const title = screen.getByTestId('recipe-title');
    const category = screen.getByTestId('recipe-category');
    const share = screen.getByTestId('share-btn');
    const favorite = screen.getByTestId('favorite-btn');
    const recipeFase = screen.getByTestId('start-recipe-btn');

    await waitFor(() => {
      expect(image).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
      expect(recipeFase).toBeInTheDocument();

      expect(title.textContent).toBe(MEAL_RECIPE[0].strMeal);
      expect(image.src).toBe(MEAL_RECIPE[0].strMealThumb);
      expect(category.textContent).toBe(MEAL_RECIPE[0].strCategory);
    });
  });

  test('', () => {
    renderPath('/meals/:52977');

    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'whiteHeartIcon.svg');

    act(() => userEvent.click(screen.getByTestId('favorite-btn')));

    expect(screen.getByTestId('favorite-btn')).not.toHaveAttribute('src', 'whiteHeartIcon.svg');
    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  test('', async () => {
    renderPath('/meals/52977');

    expect(screen.getByTestId('share-btn')).toBeInTheDocument();

    // act(() =>));
    userEvent.click(screen.getByTestId('share-btn'));
    // expect(await screen.findByText(/Link copied!/)).toBeInTheDocument();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('/in-progress');
  });
});
