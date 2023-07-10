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

const fetchApiIngredientes = async () => {
  const responde = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
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
  fetchApiIngredientes,
  fetchApiFotos,
};
