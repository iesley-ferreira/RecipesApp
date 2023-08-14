import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import getIngredients from '../services/getIngredients';
import './styles/RecipeInProgress.css';
import {
  removeFavoriteRecipe,
  saveDoneRecipe,
  addFavoriteRecipe,
  saveRecipeInProgress,
  isFavoriRecipe,
} from '../services/localStorageFuncions';
import { fetchRecipesDetailsApi } from '../services/fetchAPI';
import HeaderLinks from '../components/HeaderLinks';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();

  // Variáveis
  const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const correctId = id.replace(':', '');

  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  const [isDisableFinish, setIsDisableFinish] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const reciperequest = await fetchRecipesDetailsApi(type, correctId);
      setRecipe(reciperequest[0]);
    };

    setIsFavorite(isFavoriRecipe(correctId));

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const inProgressRecipe = inProgressRecipes[id];

    setIngredientsChecked(inProgressRecipe);

    fetchRecipe();
  }, [id, pathname, type, correctId]);

  useEffect(() => {
    setIngredients(getIngredients(recipe));
  }, [recipe, ingredientsChecked]);
  useEffect(() => {
    const ingredientsCheckedValues = ingredients.map(
      (ingredient) => ingredientsChecked[ingredient],
    );
    const isAllChecked = ingredientsCheckedValues.every((check) => check === true);
    setIsDisableFinish(!isAllChecked);
  }, [ingredients, ingredientsChecked]);

  function checkIngredient(ingredient) {
    setIngredientsChecked({
      ...ingredientsChecked,
      [ingredient]: !ingredientsChecked[ingredient],
    });
  }

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    inProgressRecipes[id] = ingredientsChecked;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    saveRecipeInProgress(id, ingredientsChecked);
  }, [ingredientsChecked, id]);

  return (
    <div className="recipeInProgress-container">
      <div className="header-inProgress-container">
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          data-testid="recipe-photo"
        />

        <HeaderLinks
          recipe={ recipe }
          isFavorite={ isFavorite }
          setIsFavorite={ setIsFavorite }
          addFavoriteRecipe={ addFavoriteRecipe }
          removeFavoriteRecipe={ removeFavoriteRecipe }
        />
        <div className="inProgress-title-container">
          <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
          {recipe.strAlcoholic && (
            <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
          )}
        </div>
      </div>

      <div className="main-detail-container">
        <h1 className="ingredients-title"> Ingredients </h1>
        <div className="ingredients-container">
          {ingredients
            && ingredients.map((ingredient, index) => (
              <li key={ index }>
                <label
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                  className={ ingredientsChecked[ingredient] ? 'ingredient-checked' : '' }
                >
                  <input
                    id={ ingredient }
                    type="checkbox"
                    name={ ingredient }
                    className="checkbox-inProgress"
                    onChange={ () => checkIngredient(ingredient) }
                    checked={ ingredientsChecked[ingredient] }
                  />
                  {ingredient}
                </label>
              </li>
            ))}
        </div>

        <h1 className="Instructions-title"> Instructions </h1>
        <div className="instructions-container">
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
      </div>
      <div className="start-recipe-btn-container">
        <button
          className="btnStart"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isDisableFinish }
          onClick={ () => saveDoneRecipe(recipe) }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
