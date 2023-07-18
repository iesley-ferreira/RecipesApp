function saveDoneRecipe(recipe) {
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

function removeFavoriteRecipe(id) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
}

function addFavoriteRecipe(recipe) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const newRecipe = {
    id: recipe.idMeal || recipe.idDrink,
    type: recipe.idMeal ? 'meal' : 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };

  if (!favoriteRecipes) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([{ ...newRecipe }]),
    );
  } else {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...favoriteRecipes, { ...newRecipe }]),
    );
  }
}

function saveRecipeInProgress(id, ingredientsChecked) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let newInProgressRecipes = {};

  if (!id.includes(':') && ingredientsChecked !== {}) {
    if (inProgressRecipes) {
      newInProgressRecipes = {
        ...inProgressRecipes,
        [id]: ingredientsChecked,
      };
    } else {
      newInProgressRecipes = {
        [id]: ingredientsChecked,
      };
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
  }
}

function isFavoriRecipe(id) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let isFavorite = false;

  if (!favoriteRecipes) return isFavorite;
  isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);
  return isFavorite;
}

export {
  saveDoneRecipe,
  removeFavoriteRecipe,
  addFavoriteRecipe,
  saveRecipeInProgress,
  isFavoriRecipe,
};
