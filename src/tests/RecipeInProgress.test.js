import { screen, waitFor } from '@testing-library/react';
// import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithRouter from '../helpers/renderWithRouter';
import { drinkRecipeData, mealRecipeData } from '../helpers/recipeData';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const drinkUrl = '/drinks/15997/in-progress';

describe('Testa o arquivo RecipeInProgress.js', () => {
  // faz com que ao final de todo it o mock seja restaurado para o valor inicial e o localStorage seja limpo
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Verifica se a página contém os data-testids', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          mealRecipeData,
        ],
      }),
    });
    renderWithRouter(<RecipeInProgress />, { location: '/meals/52977/in-progress' });

    await waitFor(async () => {
      const title = screen.queryByTestId('recipe-title');
      const category = screen.queryByTestId('recipe-category');
      const image = screen.queryByTestId('recipe-photo');
      expect(title).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(title).toHaveTextContent('Corba');
      expect(category).toHaveTextContent('Side');
      expect(image).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
      const shareBtn = screen.queryByTestId('share-btn');
      const favoriteBtn = screen.queryByTestId('favorite-btn');
      const FinishRecipeBtn = screen.queryByTestId('finish-recipe-btn');
      expect(shareBtn).toBeInTheDocument();
      expect(favoriteBtn).toBeInTheDocument();
      expect(FinishRecipeBtn).toBeInTheDocument();
      const ingredient0 = screen.queryByTestId('0-ingredient-step');
      const ingredient1 = screen.queryByTestId('1-ingredient-step');
      const ingredient2 = screen.queryByTestId('2-ingredient-step');
      expect(ingredient0).toBeInTheDocument();
      expect(ingredient1).toBeInTheDocument();
      expect(ingredient2).toBeInTheDocument();
      const input0 = screen.queryByRole('checkbox', { name: /Lentils/i });
      const input1 = screen.queryByRole('checkbox', { name: /Onion/i });
      const input2 = screen.queryByRole('checkbox', { name: /Carrots/i });
      expect(input0).toBeInTheDocument();
      expect(input1).toBeInTheDocument();
      expect(input2).toBeInTheDocument();
      expect(input0).not.toBeChecked();
      expect(input1).not.toBeChecked();
      expect(input2).not.toBeChecked();
      expect(FinishRecipeBtn).toBeDisabled();
      await act(async () => {
        userEvent.click(input0);
        userEvent.click(input1);
        userEvent.click(input2);
      });
      expect(input0).toBeChecked();
      expect(input1).toBeChecked();
      expect(input2).toBeChecked();
      expect(FinishRecipeBtn).not.toBeDisabled();
      const instructions = screen.queryByTestId('instructions');
      expect(instructions).toBeInTheDocument();
      expect(instructions).toHaveTextContent('Instruções simuladas');
    });

    // verifica se ao recarregar a página os ingredientes selecionados permanecem selecionados
    renderWithRouter(<RecipeInProgress />, { location: '/meals/52977/in-progress' });
    await waitFor(async () => {
      const input0 = screen.queryByRole('checkbox', { name: /Lentils/i });
      const input1 = screen.queryByRole('checkbox', { name: /Onion/i });
      const input2 = screen.queryByRole('checkbox', { name: /Carrots/i });
      expect(input0).toBeChecked();
      expect(input1).toBeChecked();
      expect(input2).toBeChecked();
    });
  });

  it('Verifica se todos os ingredientes estão sendo exibidos corretamente.', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          drinkRecipeData,
        ],
      }),
    });

    renderWithRouter(<RecipeInProgress />, { location: drinkUrl });

    await waitFor(async () => {
      const ingredient0 = screen.getByTestId('0-ingredient-step');
      const ingredient1 = screen.queryByTestId('1-ingredient-step');
      const ingredient2 = screen.queryByTestId('2-ingredient-step');

      const input0 = screen.queryByRole('checkbox', { name: /Galliano/i });
      const input1 = screen.queryByRole('checkbox', { name: /Ginger ale/i });
      const input2 = screen.queryByRole('checkbox', { name: /Ice/i });
      const btnFinish = screen.queryByTestId('finish-recipe-btn');

      expect(ingredient0).toBeInTheDocument();
      expect(ingredient1).toBeInTheDocument();
      expect(ingredient2).toBeInTheDocument();
      expect(btnFinish).toBeInTheDocument();

      expect(input0).toBeInTheDocument();
      expect(input1).toBeInTheDocument();
      expect(input2).toBeInTheDocument();

      expect(input0).not.toBeChecked();
      expect(input1).not.toBeChecked();
      expect(input2).not.toBeChecked();
      expect(btnFinish).toBeDisabled();

      expect(input0).toHaveAttribute('type', 'checkbox');
      expect(input1).toHaveAttribute('type', 'checkbox');
      expect(input2).toHaveAttribute('type', 'checkbox');

      await act(async () => {
        userEvent.click(input0);
        userEvent.click(input1);
        userEvent.click(input2);
      });

      expect(input0).toBeChecked();
      expect(input1).toBeChecked();
      expect(input2).toBeChecked();
      expect(btnFinish).not.toBeDisabled();

      // verifica se ao recarregar a página os ingredientes selecionados permanecem selecionados
      renderWithRouter(<RecipeInProgress />, { location: '/drinks/15997/in-progress' });

      expect(input0).toBeChecked();
      expect(input1).toBeChecked();
      expect(input2).toBeChecked();

      // verifica se foi redirecionado para a página de receitas feitas
      await act(async () => {
        userEvent.click(btnFinish);
      });
    });
  });

  it('Verifica a lógica de favoritar a receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          drinkRecipeData,
        ],
      }),
    });

    renderWithRouter(<RecipeInProgress />, { location: drinkUrl });

    await waitFor(() => {
      const btnFavorite = screen.queryByTestId('favorite-btn');

      expect(btnFavorite).toBeInTheDocument();

      userEvent.click(btnFavorite);

      expect(btnFavorite).toHaveAttribute('src', whiteHeartIcon);

      userEvent.click(btnFavorite);

      expect(btnFavorite).toHaveAttribute('src', blackHeartIcon);
    });
  });

  it('Verifica a lógica de compartilhar a receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          drinkRecipeData,
        ],
      }),
    });

    const clipboardWriteTextMock = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: clipboardWriteTextMock,
      },
    });

    renderWithRouter(<RecipeInProgress />, { location: drinkUrl });

    await waitFor(() => {
      const btnShare = screen.queryByTestId('share-btn');

      expect(btnShare).toBeInTheDocument();

      userEvent.click(btnShare);

      // const { pathname } = hystory.location;
      // expect(pathname).toBe('/drinks/15997');
      expect(clipboardWriteTextMock).toHaveBeenCalledWith('http://localhost/');
    });
  });
});
