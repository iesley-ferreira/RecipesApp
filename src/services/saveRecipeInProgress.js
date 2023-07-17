const saveRecipeInProgress = (id, ingredients) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const newInProgressRecipes = {
    ...inProgressRecipes,
    [id]: ingredients,
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
};

const isInProgress = (id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes !== null) {
    const progressKeys = Object.keys(inProgressRecipes);
    return progressKeys.includes(id);
  }
  return null;
};

const isDone = (id) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipes !== null) {
    const arrayId = doneRecipes.map((element) => element.id === id);
    return arrayId;
  }
  return null;
};

export { saveRecipeInProgress, isInProgress, isDone };
