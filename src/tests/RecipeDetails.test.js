// import { getAllByTestId, render, screen, waitFor } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/react';
import renderPath from '../helpers/renderPath';
import MEAL_RECIPE from './Mock/MealMock';

describe('Teste da página RecipeDetail.js', () => {
  it('Verificar se todos os elementos da página estão presentes na tela', async () => {
    renderPath('/meals/:52977');
    const image = screen.getByTestId('recipe-photo');
    const title = screen.getByTestId('recipe-title');
    const category = screen.getByTestId('recipe-category');

    await waitFor(() => {
      expect(image).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(category).toBeInTheDocument();

      expect(title.textContent).toBe(MEAL_RECIPE[0].strMeal);
      expect(image.src).toBe(MEAL_RECIPE[0].strMealThumb);
      expect(category.textContent).toBe(MEAL_RECIPE[0].strCategory);
    });
  });
});
