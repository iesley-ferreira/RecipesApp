export const getIngredientsChecked = (id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) return {};
  if (!inProgressRecipes[id]) return [];

  const ingredientsChecked = Object.keys(inProgressRecipes[id]).find((predicate) => (
    inProgressRecipes[id][predicate] === true
  ));

  return ingredientsChecked;
};
