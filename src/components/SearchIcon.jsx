import { useState } from 'react';
import { fetchRecipesByFirstLetter, fetchRecipesByIngredient, fetchRecipesByName } from '../services/fetchAPI';

function SeachIcon() {
  const [showInput, setShowInput] = useState(false);
  const [radioButton, setRadioButton] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState('');

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

  return (
    <div className="search">
      <button onClick={ handleInput }>
        <img src="searchIcon.svg" alt="search icon" data-testid="search-top-btn" />
      </button>
      {showInput ? inputs : null}
    </div>
  );
}

export default SeachIcon;

// 11 - Implemente 3 radio buttons na barra de busca: Ingredient, Name e First letter

// Observações técnicas
// A barra de busca deve possuir 3 radio buttons: Ingredient, Name e First letter. Eles, em conjunto com a search-input, devem mudar a forma como serão filtradas as receitas após clicar no botão Search. Os endpoints da API que você deve usar podem ser consultados aqui para a API de comidas e aqui para a API de bebidas.
// Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente};
// Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/search.php?s={nome};
// Se o radio selecionado for First letter, a busca na API é feita corretamente pela primeira letra. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra};
// Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert com a mensagem "Your search must have only 1 (one) character".
// bulb Exemplo: Ao selecionar Ingredient e buscar por chicken, deve-se utilizar o endpoint https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken.
// bulb Atenção: Utilize global.alert para evitar os warnings do eslint sobre o uso de alert no código.
// bulb Observação: Para esse requisito será verificada apenas a tela principal de receitas de comidas.

// O que será verificado
// Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente
// Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome
// Se o radio selecionado for First letter, a busca na API é feita corretamente pela primeira letra
// Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert
