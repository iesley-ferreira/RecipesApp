import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import logoRecipes from '../images/logoRecipes.png';
import iconeRecipes2 from '../images/iconeRecipes2.png';
import getIngredients from '../services/getIngredients';
import './styles/RecipeInProgress.css';
import {
  removeFavoriteRecipe,
  saveDoneRecipe,
  addFavoriteRecipe,
  saveRecipeInProgress,
  isFavoriRecipe,
} from '../services/localStorageFuncions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  // recebe o id da receita
  const param = useParams();
  const { id } = param;
  const { pathname } = useLocation();

  // estado local para guardar a receita com o id recebido
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState({});
  const [shareMessage, setShareMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

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

    // verifica se a receita está salva nos favoritos
    setIsFavorite(isFavoriRecipe(id));

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

  // função que copia o link da receita e mostra uma mensagem de "Link copied!"
  function share() {
    const path = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(path);
    setShareMessage('Link copied!');
  }

  let isDisableFinishRecipe = true;
  const comparacao = (ingredients.length === Object.values(ingredientsChecked).length);

  if (Object.values(ingredientsChecked).length > 0 && comparacao) {
    const test = Object.values(ingredientsChecked).some((check) => check === false);
    isDisableFinishRecipe = test;
  }

  // função que verifica se a receita está salva nos favoritos e salva ou remove

  function handleFavorite() {
    if (isFavorite) {
      removeFavoriteRecipe(id);
      setIsFavorite(false);
    } else {
      addFavoriteRecipe(recipe);
      setIsFavorite(true);
    }
  }

  return (
    <div>
      <section>
        <Link to={ `/${pathname.split('/')[1]}` }>
          <button type="button" data-testid="btn-go-home">
            <img src={ iconeRecipes2 } alt="logo1recipes" />
            <img src={ logoRecipes } alt="logo2recipes" />
          </button>
        </Link>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ share }
        >
          Compartilhar

        </button>
        <button
          type="button"
          onClick={ handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite"
          />
        </button>
        { shareMessage && <p>{ shareMessage }</p> }
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
        onClick={ () => saveDoneRecipe(recipe) }
      >
        Finish Recipe
      </button>
    </div>
  );
}
export default RecipeInProgress;
