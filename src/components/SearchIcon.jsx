import { useEffect, useState } from 'react';
import { fetchRecipesByFirstLetter,
  fetchRecipesByIngredient, fetchRecipesByName } from '../services/fetchAPI';
import iconePesquisar from '../images/iconePesquisar.png';

function SeachIcon() {
  const [showInput, setShowInput] = useState(false);
  const [radioButton, setRadioButton] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState('');

  // redireciona para a página de detalhes da receita caso só tenha uma receita
  useEffect(() => {
    let array = [];
    if (recipes) {
      array = recipes.meals || recipes.drinks;
    }

    if (array && array.length === 1) {
      const { pathname } = window.location;
      let id = 0;
      if (pathname === '/meals') {
        id = array[0].idMeal;
      } else { id = array[0].idDrink; }

      window.location.href = `${pathname}/${id}`;
    }
  }, [recipes]);

  // para o lint não reclamar que está repetindo o nome
  const firstLetter = 'first-letter';

  // mostra ou esconde os inputs
  const handleInput = () => {
    setShowInput(!showInput);
  };

  // faz a busca de acordo com o radio button selecionado
  const searchRecipes = async () => {
    if (radioButton === firstLetter && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const { pathname } = window.location;

    switch (radioButton) {
    case 'ingredient':
      setRecipes(await fetchRecipesByIngredient(input, pathname));
      break;

    case 'name':
      setRecipes(await fetchRecipesByName(input, pathname));
      break;

    case firstLetter:
      setRecipes(await fetchRecipesByFirstLetter(input, pathname));
      break;

    default:
      break;
    }
  };

  // altera o valor do input
  const changeInput = ({ target }) => {
    setInput(target.value);
  };

  // cria os inputs, mostrados quando se clica no ícone de busca
  const inputs = (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ changeInput }
      />

      <label htmlFor="ingredient">Ingrediente</label>
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        id="ingredient"
        onChange={ () => setRadioButton('ingredient') }
        checked={ radioButton === 'ingredient' }
      />

      <label htmlFor="name">Nome</label>
      <input
        type="radio"
        data-testid="name-search-radio"
        id="name"
        onChange={ () => setRadioButton('name') }
        checked={ radioButton === 'name' }
      />

      <label htmlFor="first-letter">Primeira letra</label>
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        id="first-letter"
        onChange={ () => setRadioButton(firstLetter) }
        checked={ radioButton === firstLetter }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchRecipes }
      >
        Buscar

      </button>
    </div>
  );

  console.log(recipes);

  return (
    <div className="search">
      <button onClick={ handleInput }>
        <img src={ iconePesquisar } alt="search icon" data-testid="search-top-btn" />
      </button>
      {showInput ? inputs : null}
    </div>
  );
}

export default SeachIcon;
