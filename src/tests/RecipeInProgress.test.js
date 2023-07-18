import { render, screen } from '@testing-library/react';
// import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithRouter from '../helpers/renderWithRouter';
import { drinkRecipeData, mealRecipeData } from '../helpers/recipeData';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const drinkUrl = '/drinks/15997/in-progress';
const mealUrl = '/meals/52977/in-progress';
const ingredient0Id = '0-ingredient-step';

describe('Testa o arquivo RecipeInProgress.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  it('Verifica se todos os ingredientes de uma bebida estão sendo exibidos corretamente.', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          drinkRecipeData,
        ],
      }),
    });

    const history = createMemoryHistory();
    history.push(drinkUrl);

    render(
      <Router history={ history }>
        <RecipeInProgress />
      </Router>,
    );

    await screen.findByTestId(ingredient0Id);

    const ingredient0 = screen.getByTestId(ingredient0Id);
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

    expect(input0).toBeChecked();
    expect(input1).toBeChecked();
    expect(input2).toBeChecked();

    // verifica se foi redirecionado para a página de receitas feitas
    await act(async () => {
      userEvent.click(btnFinish);
    });

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  it('Verifica se todos os ingredientes de uma comida estão sendo exibidos corretamente.', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [
          mealRecipeData,
        ],
      }),
    });

    const history = createMemoryHistory();
    history.push(mealUrl);

    render(
      <Router history={ history }>
        <RecipeInProgress />
      </Router>,
    );

    await screen.findByTestId('0-ingredient-step');

    const ingredient0 = screen.getByTestId(ingredient0Id);
    const ingredient1 = screen.queryByTestId('1-ingredient-step');
    const ingredient2 = screen.queryByTestId('2-ingredient-step');
    const ingredient3 = screen.queryByTestId('3-ingredient-step');
    const ingredient4 = screen.queryByTestId('4-ingredient-step');
    const ingredient5 = screen.queryByTestId('5-ingredient-step');
    const ingredient6 = screen.queryByTestId('6-ingredient-step');
    const ingredient7 = screen.queryByTestId('7-ingredient-step');
    const ingredient8 = screen.queryByTestId('8-ingredient-step');
    const ingredient9 = screen.queryByTestId('9-ingredient-step');
    const ingredient10 = screen.queryByTestId('10-ingredient-step');
    const ingredient11 = screen.queryByTestId('11-ingredient-step');
    const ingredient12 = screen.queryByTestId('12-ingredient-step');

    const input0 = screen.queryByRole('checkbox', { name: /Lentils/i });
    const input1 = screen.queryByRole('checkbox', { name: /Onion/i });
    const input2 = screen.queryByRole('checkbox', { name: /Carrots/i });
    const input3 = screen.queryByRole('checkbox', { name: /Tomato Puree/i });
    const input4 = screen.queryByRole('checkbox', { name: /Cumin/i });
    const input5 = screen.queryByRole('checkbox', { name: /Paprika/i });
    const input6 = screen.queryByRole('checkbox', { name: /Mint/i });
    const input7 = screen.queryByRole('checkbox', { name: /Thyme/i });
    const input8 = screen.queryByRole('checkbox', { name: /Black Pepper/i });
    const input9 = screen.queryByRole('checkbox', { name: /Red Pepper Flakes/i });
    const input10 = screen.queryByRole('checkbox', { name: /Vegetable Stock/i });
    const input11 = screen.queryByRole('checkbox', { name: /Wate/i });
    const input12 = screen.queryByRole('checkbox', { name: /Sea Salt/i });
    const btnFinish = screen.queryByTestId('finish-recipe-btn');

    expect(ingredient0).toBeInTheDocument();
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    expect(ingredient3).toBeInTheDocument();
    expect(ingredient4).toBeInTheDocument();
    expect(ingredient5).toBeInTheDocument();
    expect(ingredient6).toBeInTheDocument();
    expect(ingredient7).toBeInTheDocument();
    expect(ingredient8).toBeInTheDocument();
    expect(ingredient9).toBeInTheDocument();
    expect(ingredient10).toBeInTheDocument();
    expect(ingredient11).toBeInTheDocument();
    expect(ingredient12).toBeInTheDocument();
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
      userEvent.click(input3);
      userEvent.click(input4);
      userEvent.click(input5);
      userEvent.click(input6);
      userEvent.click(input7);
      userEvent.click(input8);
      userEvent.click(input9);
      userEvent.click(input10);
      userEvent.click(input11);
      userEvent.click(input12);
    });

    expect(input0).toBeChecked();
    expect(input1).toBeChecked();
    expect(input2).toBeChecked();
    expect(input3).toBeChecked();
    expect(input4).toBeChecked();
    expect(input5).toBeChecked();
    expect(input6).toBeChecked();
    expect(input7).toBeChecked();
    expect(input8).toBeChecked();
    expect(input9).toBeChecked();
    expect(input10).toBeChecked();
    expect(input11).toBeChecked();
    expect(input12).toBeChecked();
    expect(btnFinish).not.toBeDisabled();

    // verifica se ao recarregar a página os ingredientes selecionados permanecem selecionados
    expect(input0).toBeChecked();
    expect(input1).toBeChecked();
    expect(input2).toBeChecked();
    expect(input3).toBeChecked();
    expect(input4).toBeChecked();
    expect(input5).toBeChecked();
    expect(input6).toBeChecked();
    expect(input7).toBeChecked();
    expect(input8).toBeChecked();
    expect(input9).toBeChecked();
    expect(input10).toBeChecked();
    expect(input11).toBeChecked();
    expect(input12).toBeChecked();

    // verifica se foi redirecionado para a página de receitas feitas
    await act(async () => {
      userEvent.click(btnFinish);
    });
  });

  it('Verifica a lógica de favoritar a receita de bebida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          drinkRecipeData,
        ],
      }),
    });

    renderWithRouter(<RecipeInProgress />, { location: drinkUrl });

    const btnFavorite = screen.queryByTestId('favorite-btn');

    expect(btnFavorite).toBeInTheDocument();

    await act(async () => {
      userEvent.click(btnFavorite);
    });

    expect(btnFavorite).toHaveAttribute('src', blackHeartIcon);

    await act(async () => {
      userEvent.click(btnFavorite);
    });

    expect(btnFavorite).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Verifica a lógica de favoritar a receita de comida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          mealRecipeData,
        ],
      }),
    });

    renderWithRouter(<RecipeInProgress />, { location: mealUrl });

    const btnFavorite = screen.queryByTestId('favorite-btn');

    expect(btnFavorite).toBeInTheDocument();

    await act(async () => {
      userEvent.click(btnFavorite);
    });

    expect(btnFavorite).toHaveAttribute('src', blackHeartIcon);

    await act(async () => {
      userEvent.click(btnFavorite);
    });

    expect(btnFavorite).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Verifica a lógica de compartilhar a receita de bebida', async () => {
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

    const btnShare = screen.queryByTestId('share-btn');

    expect(btnShare).toBeInTheDocument();

    await act(async () => {
      userEvent.click(btnShare);
    });

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  it('Verifica a lógica de compartilhar a receita de comida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [
          mealRecipeData,
        ],
      }),
    });

    renderWithRouter(<RecipeInProgress />, { location: mealUrl });

    const btnShare = screen.queryByTestId('share-btn');

    expect(btnShare).toBeInTheDocument();

    await act(async () => {
      userEvent.click(btnShare);
    });

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});
