// import { getAllByTestId, render, screen, waitFor } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderPath from '../helpers/renderPath';
import MEAL_RECIPE from './Mock/MealMock';

describe('Teste da página RecipeDetail.js', () => {
  it('Verificar se todos os elementos da página estão presentes na tela', async () => {
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

    // act(() => {
    //   setTimeout(() => {
    //     let sugestionCards = screen.queryAllByTestId(/-recommendation-card$/);
    //   }, 1000);
    // });
    // expect(sugestionCards).toHaveLength(700);
  });
});
