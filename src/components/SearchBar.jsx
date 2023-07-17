import { useContext } from 'react';
import { fetchRecipesByFirstLetter,
  fetchRecipesByIngredient, fetchRecipesByName } from '../services/fetchAPI';
import receitasContext from '../context/ReceitasContext';
import './styles/SearchBar.css';

function SearchBar() {
  const {
    setUsualRecipes,
    showInput,
    radioButton,
    setRadioButton,
    input,
    setInput,
  } = useContext(receitasContext);

  const setRecipes = setUsualRecipes;

  // para o lint não reclamar que está repetindo o nome
  const firstLetter = 'first-letter';

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
    <div className="search-content">
      <div className="search-input-text">
        <input
          type="text"
          data-testid="search-input"
          onChange={ changeInput }
          placeholder="Search"
          value={ input }
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
