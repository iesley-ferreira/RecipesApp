// essa função salva o progresso da receita no localStorage neste formata:
// {
// id: {
// ingredient: boolean,
// },

export const saveRecipeInProgress = (id, ingredients) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const newInProgressRecipes = {
    ...inProgressRecipes,
    [id]: ingredients,
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
};
