import { useContext, useEffect } from 'react';
import { fetchRecipesByFirstLetter,
  fetchRecipesByIngredient, fetchRecipesByName } from '../services/fetchAPI';
import receitasContext from '../context/ReceitasContext';
import './styles/SearchBar.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SearchBar() {
  const {
    usualRecipes,
    setUsualRecipes,
    showInput,
    radioButton,
    setRadioButton,
    input,
    setInput,
  } = useContext(receitasContext);

  const recipes = usualRecipes;
  const setRecipes = setUsualRecipes;

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

  // faz a busca de acordo com o radio button selecionado
  // const { history } = useContext(receitasContext);
  const history = useHistory();
  const searchRecipes = async () => {
    if (radioButton === firstLetter && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const { pathname } = window.location;

    const idPath = pathname === '/meals' ? 'idMeal' : 'idDrink';

    let fillRecipes;

    switch (radioButton) {
    case 'ingredient':
      fillRecipes = await fetchRecipesByIngredient(input, pathname);

      setRecipes(fillRecipes);

      if (fillRecipes.length === 1) {
        history.push(`${pathname}/:${fillRecipes[0][idPath]}`);
      }
      break;

    case 'name':
      fillRecipes = await fetchRecipesByName(input, pathname);

      setRecipes(fillRecipes);
      if (fillRecipes.length === 1) {
        history.push(`${pathname}/:${fillRecipes[0][idPath]}`);
        console.log('igual a 1');
      }
      break;

    case firstLetter:
      fillRecipes = await fetchRecipesByFirstLetter(input, pathname);

      setRecipes(fillRecipes);

      if (fillRecipes.length === 1) {
        history.push(`${pathname}/:${fillRecipes[0][idPath]}`);
      }
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
    <div className="search-content">
      <div className="search-input-text">
        <input
          type="text"
          data-testid="search-input"
          onChange={ changeInput }
          placeholder="Search"
        />
      </div>
      <div className="search-radio-buttons">
        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            onChange={ () => setRadioButton('ingredient') }
            checked={ radioButton === 'ingredient' }
          />
          Ingrediente
        </label>

        <label htmlFor="name">

          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            onChange={ () => setRadioButton('name') }
            checked={ radioButton === 'name' }
          />
          Nome
        </label>

        <label htmlFor="first-letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            onChange={ () => setRadioButton(firstLetter) }
            checked={ radioButton === firstLetter }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchRecipes }
      >
        Search

      </button>
    </div>
  );

  return (
    <div className="search">
      {showInput ? inputs : null}
    </div>
  );
}

export default SearchBar;
