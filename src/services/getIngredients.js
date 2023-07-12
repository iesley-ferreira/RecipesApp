function getIngredients(recipe) {
  const ingredients = [];
  const maxIngredients = 20;

  for (let index = 1; index <= maxIngredients; index += 1) {
    const ingredient = `strIngredient${index}`;
    const measure = `strMeasure${index}`;

    if (recipe[ingredient]) {
      ingredients.push(`${recipe[ingredient]} - ${recipe[measure]}`);
    }
  }

  return ingredients;
}

export default getIngredients;
