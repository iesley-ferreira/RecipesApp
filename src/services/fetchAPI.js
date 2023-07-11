const fetchRecipesByIngredient = async (ingredient, pathname) => {
  let response = {};

  if (pathname === '/meals') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  }

  const data = await response.json();

  const food = pathname === '/meals' ? 'meals' : 'drinks';
  const recipesNum = 12;

  let recipes = [].data[food].filter((meal, index) => index < recipesNum);

  if (pathname === '/meals') {
    recipes = data.meals.data[food].filter((meal, index) => index < recipesNum);
  } else {
    recipes = data.drinks.data[food].filter((meal, index) => index < recipesNum);
  }
  console.log(data);

  return recipes;
};

const fetchRecipesByName = async (name, pathname) => {
  let response = {};

  if (pathname === '/meals') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  }

  const data = await response.json();
  let recipes = [];
  if (pathname === '/meals') {
    recipes = data.meals;
  } else {
    recipes = data.drinks;
  }
  // console.log(data);

  return recipes;
};

const fetchRecipesByFirstLetter = async (firstLetter, pathname) => {
  let response = {};

  if (pathname === '/meals') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  }

  const data = await response.json();
  let recipes = [];
  if (pathname === '/meals') {
    recipes = data.meals;
  } else {
    recipes = data.drinks;
  }
  // console.log(data);

  return recipes;
};

const fetchApiCategorias = async () => {
  const responde = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await responde.json();
  return data;
};

const fetchApiNacionalidades = async () => {
  const responde = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const data = await responde.json();
  return data;
};

const fetchApiFotos = async (name) => {
  const responde = await fetch(`https://www.themealdb.com/images/ingredients/${name}-Small.png`);
  const data = await responde.json();
  return data;
};

export {
  fetchApiCategorias,
  fetchApiNacionalidades,
  fetchRecipesByIngredient,
  fetchRecipesByName,
  fetchRecipesByFirstLetter,
  fetchApiFotos,
};
