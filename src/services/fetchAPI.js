const fetchRecipesByIngredient = async (ingredient, pathname) => {
  let response = {};

  if (pathname === '/meals') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  }

  const data = await response.json();
  console.log(data);

  return data;
};

const fetchRecipesByName = async (name, pathname) => {
  let response = {};

  if (pathname === '/meals') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  }

  const data = await response.json();
  console.log(data);

  return data;
};

const fetchRecipesByFirstLetter = async (firstLetter, pathname) => {
  let response = {};

  if (pathname === '/meals') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  }

  const data = await response.json();
  console.log(data);

  return data;
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
