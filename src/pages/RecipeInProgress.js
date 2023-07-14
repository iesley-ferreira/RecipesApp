import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import logoRecipes from '../images/logoRecipes.png';
import iconeRecipes2 from '../images/iconeRecipes2.png';
import getIngredients from '../services/getIngredients';
import './styles/RecipeInProgress.css';
import { saveRecipeInProgress } from '../services/saveRecipeInProgress';
import { getIngredientsChecked } from '../services/getIngredientsChecked';

function RecipeInProgress() {
  // recebe o id da receita
  const param = useParams();
  const { id } = param;
  const { pathname } = useLocation();

  // estado local para guardar a receita com o id recebido
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState({});
  // console.log(ingredientsChecked);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);

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

    fetchRecipe();
  }, [id, pathname]);

  useEffect(
    () => {
    // seta o array dos ingredientes da receita
      setIngredients(getIngredients(recipe));

      setIngredientsChecked(getIngredients(recipe).reduce((acc, curr) => ({
        ...acc,
        [curr]: false,
      }), {}));
    },
    [recipe],
  );

  // seta um objeto com os ingredientes e boloeleanos para identificar se estão marcados
  // useEffect(() => {
  //   // verifica se a receita está em progresso e seta os ingredientes marcados
  //   const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   let isInProgress = false;
  //   if (inProgressRecipes) {
  //     isInProgress = Object.keys(inProgressRecipes).includes(id);
  //   }

  //   if (isInProgress) {
  //     setIngredientsChecked(inProgressRecipes[id]);
  //   }
  // }, [id]);

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

  // verifica se todos os ingredientes estão marcados e habilita o botão de finalizar receita
  useEffect(() => {
    console.log('aqui');
    // salva o progresso da receita no localStorage
    saveRecipeInProgress(id, ingredientsChecked);

    // verifica se todos os ingredientes estão marcados
    if (Object.values(ingredientsChecked).includes(false)) {
      setAllIngredientsChecked(false);
    } else {
      setAllIngredientsChecked(true);
    }
  }, [ingredientsChecked, id]);

  // console.log(ingredientsChecked, Object.values(ingredientsChecked).includes(false));

  // função que salva a receita no localStorage e redireciona para a página de receitas feitas

  // salva a receita no localStorage no formato do expectedDoneRecipes
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
        onClick={ saveRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
