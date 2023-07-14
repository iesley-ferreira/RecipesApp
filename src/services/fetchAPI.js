const fetchRecipesByIngredient = async (ingredient, pathname) => {
  console.log(pathname);
  let response = {};

  if (pathname === '/meals') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  }

  const food = pathname === '/meals' ? 'meals' : 'drinks';
  const recipesNum = 12;

  let data;
  try {
    data = await response.json();
  } catch {
    data = '';
  }
  // const data = await response.json();
  let recipes = [];

  if (data[food] && pathname === '/meals') {
    recipes = data[food].filter((meal, index) => index < recipesNum);
  } else if (data[food]) {
    console.log(data[food]);
    recipes = data[food].filter((meal, index) => index < recipesNum);
  }

  return recipes;
};

const fetchRecipesByName = async (name, pathname) => {
  let response = {};

  if (pathname === '/meals') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  }

  const food = pathname === '/meals' ? 'meals' : 'drinks';
  const recipesNum = 12;
  const data = await response.json();
  let recipes = [];

  if (data[food] && pathname === '/meals') {
    recipes = data[food].filter((meal, index) => index < recipesNum);
  } else if (data[food]) {
    console.log(data[food]);
    recipes = data[food].filter((meal, index) => index < recipesNum);
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

  const food = pathname === '/meals' ? 'meals' : 'drinks';
  const recipesNum = 12;

  const data = await response.json();
  let recipes = [];
  if (data[food] && pathname === '/meals') {
    recipes = data[food].filter((meal, index) => index < recipesNum);
  } else if (data[food]) {
    console.log(data[food]);
    recipes = data[food].filter((meal, index) => index < recipesNum);
  }
  // console.log(data);

  return recipes;
};

const fetchRecipesDetailsApi = async (food, id) => {
  const pathnameFood = (food === 'meals') ? 'themeal' : 'thecocktail';
  const response = await fetch(`https://www.${pathnameFood}db.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data[food];
};

const fetchRecipesSugestionsApi = async (food) => {
  const pathnameFood = (food === 'meals') ? 'thecocktail' : 'themeal';
  const reverseFood = (food === 'meals') ? 'drinks' : 'meals';
  const response = await fetch(`https://www.${pathnameFood}db.com/api/json/v1/1/search.php?s=`);
  const data = await response.json();
  const sugestions = [];
  const MAGIC_NUMBER = 6;
  for (let i = 0; i < MAGIC_NUMBER; i += 1) {
    sugestions.push(data[reverseFood][i]);
  }
  return sugestions;
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
  fetchApiNacionalidades,
  fetchRecipesByIngredient,
  fetchRecipesByName,
  fetchRecipesByFirstLetter,
  fetchRecipesDetailsApi,
  fetchRecipesSugestionsApi,
  fetchApiFotos,
};
