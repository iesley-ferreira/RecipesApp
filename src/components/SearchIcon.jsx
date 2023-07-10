import { useState } from 'react';

function SeachIcon() {
  const [showInput, setShowInput] = useState(false);

  const handleInput = () => {
    setShowInput(!showInput);
  };

  const inputs = (
    <div>
      <input type="text" data-testid="search-input" />

      <label htmlFor="ingredient">Ingrediente</label>
      <input type="radio" data-testid="ingredient-search-radio" id="ingredient" />

      <label htmlFor="name">Nome</label>
      <input type="radio" data-testid="name-search-radio" id="name" />

      <label htmlFor="first-letter">Primeira letra</label>
      <input type="radio" data-testid="first-letter-search-radio" id="first-letter" />
      <button type="button" data-testid="exec-search-btn">Buscar</button>
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
