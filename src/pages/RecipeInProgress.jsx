import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import getIngredients from '../services/getIngredients';
import './styles/RecipeInProgress.css';
import {
  removeFavoriteRecipe,
  saveDoneRecipe,
  addFavoriteRecipe,
  saveRecipeInProgress,
  isFavoriRecipe,
} from '../services/localStorageFuncions';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import blackHeartIcon from '../images/Heart.png';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import whiteHeartIcon from '../images/WhiteHeart.png';
import Share from '../images/Share.png';
import { fetchRecipesDetailsApi } from '../services/fetchAPI';
import Beef from '../images/mealsCategories/Beef.png';
import Breakfast from '../images/mealsCategories/Breakfast.png';
import Chicken from '../images/mealsCategories/Chicken.png';
import Dessert from '../images/mealsCategories/Dessert.png';
import Goat from '../images/mealsCategories/Goat.png';
import Ordinary from '../images/mealsCategories/Ordinary.png';
import Cocktail from '../images/mealsCategories/Cocktail.png';
import Shake from '../images/mealsCategories/Shake.png';
import Other from '../images/mealsCategories/Other.png';
import Cocoa from '../images/mealsCategories/Cocoa.png';

function RecipeInProgress() {
  // recebe o id da receita
  const { id } = useParams();
  const { pathname } = useLocation();

  // Variáveis
  const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const correctId = id.replace(':', '');

  // estado local para guardar a receita com o id recebido
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState({});
  const [shareMessage, setShareMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const [isDisableFinish, setIsDisableFinish] = useState(true);
  const [ingredientsChecked2, setIngredientsChecked2] = useState({});

  // esse useEffect faz a requisição da receita e seta o estado local toda vez que o componente for montado
  useEffect(() => {
    const fetchRecipe = async () => {
      const reciperequest = await fetchRecipesDetailsApi(type, correctId);
      setRecipe(reciperequest[0]);
    };

    // verifica se a receita está salva nos favoritos
    setIsFavorite(isFavoriRecipe(correctId));

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
  }, [id, pathname, type, correctId]);

  useEffect(() => {
    // seta o array dos ingredientes da receita
    setIngredients(getIngredients(recipe));

    if (!ingredientsChecked) {
      setIngredientsChecked(
        getIngredients(recipe).reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: false,
          }),
          {},
        ),
      );
    }
  }, [recipe, ingredientsChecked]);
  // função que muda o estado isDisableFinish para true ou false
  useEffect(() => {
    const ingredientsCheckedValues = ingredients.map(
      (ingredient) => ingredientsChecked2[ingredient],
    );
    const isAllChecked = ingredientsCheckedValues.every((check) => check === true);
    setIsDisableFinish(!isAllChecked);
  }, [ingredients, ingredientsChecked2]);

  // marca ou desmarca o ingrediente
  function checkIngredient(ingredient) {
    setIngredientsChecked2({
      ...ingredientsChecked2,
      [ingredient]: !ingredientsChecked2[ingredient],
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

  function handleFavorite() {
    if (isFavorite) {
      removeFavoriteRecipe(id);
      setIsFavorite(false);
    } else {
      addFavoriteRecipe(recipe);
      setIsFavorite(true);
    }
  }

  const getCategoryImg = (categoryName, tipo) => {
    switch (categoryName) {
    case 'Beef':
      return Beef;
    case 'Breakfast':
      return Breakfast;
    case 'Chicken':
      return Chicken;
    case 'Dessert':
      return Dessert;
    case 'Goat':
      return Goat;
    case 'Ordinary Drink':
      return Ordinary;
    case 'Cocktail':
      return Cocktail;
    case 'Shake':
      return Shake;
    case 'Cocoa':
      return Cocoa;
    default:
      return (tipo === 'meals') ? Other : Cocktail;
    }
  };

  return (
    <div className="recipeInProgress-container">
      <div className="header-inProgress-container">
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          data-testid="recipe-photo"
        />
        <div className="inProgress-links-container">
          <Link to={ `/${pathname.split('/')[1]}` }>
            <div className="category-item-circle-inprogress-container">
              <div className="category-item-circle-inprogress">
                <input
                  type="image"
                  src={ getCategoryImg(recipe.strCategory, type) }
                  alt={ recipe.strCategory }
                  data-testid="btn-go-home"
                />
              </div>
              <p>{recipe.strCategory}</p>
            </div>
          </Link>
          <div className="shareAndLike-container">
            <input
              type="image"
              src={ Share }
              alt="share"
              data-testid="share-btn"
              onClick={ share }
            />
            <input
              type="image"
              onClick={ handleFavorite }
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
            />
            {shareMessage && <p>{shareMessage}</p>}
          </div>
        </div>
        <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      </div>

      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      {recipe.strAlcoholic && (
        <h2 data-testid="recipe-category">{recipe.strAlcoholic}</h2>
      )}

      <h3>Ingredients</h3>
      <ul>
        {ingredients
          && ingredients.map((ingredient, index) => (
            <li key={ index }>
              <label
                htmlFor={ ingredient }
                data-testid={ `${index}-ingredient-step` }
                className={
                  ingredientsChecked2[ingredient] ? 'ingredient-checked' : 'null'
                }
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
        disabled={ isDisableFinish }
        onClick={ () => saveDoneRecipe(recipe) }
      >
        Finish Recipe
      </button>
    </div>
  );
}
export default RecipeInProgress;
