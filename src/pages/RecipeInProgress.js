import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import logoRecipes from '../images/logoRecipes.png';
import iconeRecipes2 from '../images/iconeRecipes2.png';
import { DRINK_RECIPE, MEAL_RECIPE } from '../services/data_Recipes';
import getIngredients from '../services/getIngredients';
import './styles/RecipeInProgress.css';

function RecipeInProgress() {
  // recebe o id da receita
  const { id } = useParams();

  // acessa o array de receitas do Context
  // const { usualRecipes } = useContext(receitasContext);

  // acessa o pathname da url
  const { pathname } = useLocation();

  // ganbiarra até o redirecionamento para essa página estiver funcionando
  const usualRecipes = pathname.includes('meals') ? MEAL_RECIPE : DRINK_RECIPE;

  // estado local para guardar a receita com o id recebido
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState({});
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);

  useEffect(() => {
    if (usualRecipes) {
      const recipeFound = usualRecipes.find((item) => item.idMeal === id
      || item.idDrink === id);

      if (recipeFound) {
        setRecipe(recipeFound);

        // seta o array dos ingredientes da receita
        setIngredients(getIngredients(recipeFound));

        // seta um objeto com os ingredientes e boloeleanos para identificar se estão marcados
        setIngredientsChecked(getIngredients(recipeFound).reduce((acc, curr) => ({
          ...acc,
          [curr]: false,
        }), {}));
      }
    }
  }, [id, usualRecipes, pathname, recipe]);

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

  function checkIngredient(ingredient) {
    setIngredientsChecked({
      ...ingredientsChecked,
      [ingredient]: !ingredientsChecked[ingredient],
    });

    if (Object.values(ingredientsChecked).includes(false)) {
      setAllIngredientsChecked(false);
    } else {
      setAllIngredientsChecked(true);
    }
  }

  console.log(ingredientsChecked, Object.values(ingredientsChecked).includes(false));

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
          data-testid="btn-favorite"
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
            >
              <div
                className={ (
                  ingredientsChecked[ingredient] ? 'ingredient-checked' : 'null'
                ) }
              >
                {ingredient}
              </div>
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
        disabled={ !allIngredientsChecked }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
