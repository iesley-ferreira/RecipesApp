import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import logoRecipes from '../images/logoRecipes.png';
import iconeRecipes2 from '../images/iconeRecipes2.png';
import getIngredients from '../services/getIngredients';
import './styles/RecipeInProgress.css';
import { saveRecipeInProgress } from '../services/saveRecipeInProgress';

function RecipeInProgress() {
  // recebe o id da receita
  const param = useParams();
  const { id } = param;
  const { pathname } = useLocation();

  // estado local para guardar a receita com o id recebido
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState({});

  // esse useEffect faz a requisição da receita e seta o estado local toda vez que o componente for montado
  useEffect(() => {
    const fetchRecipe = async () => {
      let reciperequest;
      if (pathname.includes('meals')) {
        reciperequest = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      } else {
        reciperequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      }

      const recipeJson = await reciperequest.json();
      const test = pathname.includes('meals');
      const recipeData = test ? recipeJson.meals[0] : recipeJson.drinks[0];
      setRecipe(recipeData);
    };

    // verifica se a receita está em progresso e seta os ingredientes marcados
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let isInProgress = false;
    if (inProgressRecipes) {
      isInProgress = Object.keys(inProgressRecipes).includes(id);
    }

    if (isInProgress) {
      setIngredientsChecked(inProgressRecipes[id]);
    }

    fetchRecipe();
  }, [id, pathname]);

  useEffect(
    () => {
    // seta o array dos ingredientes da receita
      setIngredients(getIngredients(recipe));

      if (!ingredientsChecked) {
        setIngredientsChecked(getIngredients(recipe).reduce((acc, curr) => ({
          ...acc,
          [curr]: false,
        }), {}));
      }
    },
    [recipe, ingredientsChecked],
  );

  function addFavoriteRecipe() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoriteRecipes, recipe]),
      );
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
    }
  }

  // marca ou desmarca o ingrediente
  function checkIngredient(ingredient) {
    setIngredientsChecked({
      ...ingredientsChecked,
      [ingredient]: !ingredientsChecked[ingredient],
    });
  }

  // salva o progresso da receita no localStorage
  useEffect(() => {
    saveRecipeInProgress(id, ingredientsChecked);
  }, [ingredientsChecked, id]);

  // função que salva a receita no localStorage e redireciona para a página de receitas feitas
  function saveRecipe() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    let data = new Date();
    data = data.toISOString();

    const doneRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      nationality: recipe.strArea || '',
      name: recipe.strMeal || recipe.strDrink,
      category: recipe.strCategory || '',
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      alcoholicOrNot: recipe.strAlcoholic || '',
      type: recipe.strMeal ? 'meal' : 'drink',
      doneDate: data,
    };

    if (!doneRecipes) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([{ ...doneRecipe }]),
      );
    } else {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneRecipes, { ...doneRecipe }]),
      );
    }

    window.location.href = '/done-recipes';
  }

  let isDisableFinishRecipe = true;
  const comparacao = (ingredients.length === Object.values(ingredientsChecked).length);

  if (Object.values(ingredientsChecked).length > 0 && comparacao) {
    const test = Object.values(ingredientsChecked).some((check) => check === false);
    isDisableFinishRecipe = test;
  }

  console.log(isDisableFinishRecipe);

  return (
    <div>
      <section>
        <Link to={ `/${pathname.split('/')[1]}` }>
          <button type="button" data-testid="btn-go-home">
            <img src={ iconeRecipes2 } alt="logo1recipes" />
            <img src={ logoRecipes } alt="logo2recipes" />
          </button>
        </Link>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ addFavoriteRecipe }
        >
          Favoritar
        </button>
      </section>

      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      {recipe.strAlcoholic && (
        <h2 data-testid="recipe-category">
          {recipe.strAlcoholic}
        </h2>
      )}

      <h3>Ingredients</h3>
      <ul>
        {ingredients && ingredients.map((ingredient, index) => (
          <li
            key={ index }
          >
            <label
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
              className={ (
                ingredientsChecked[ingredient] ? 'ingredient-checked' : 'null'
              ) }
            >
              {ingredient}
              <input
                id={ ingredient }
                type="checkbox"
                name={ ingredient }
                onChange={ () => checkIngredient(ingredient) }
                checked={ ingredientsChecked[ingredient] }
              />
            </label>
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisableFinishRecipe }
        onClick={ saveRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
