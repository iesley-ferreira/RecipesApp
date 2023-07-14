import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  // usualRecipes = receitas
  // counter = variável para identificar se Recipes foi renderizado ou não
  const [optionRecipes] = useState([]);
  const [usualRecipes, setUsualRecipes] = useState([]);
  const [counter, setCounter] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [radioButton, setRadioButton] = useState('');
  const [input, setInput] = useState('');

  const context = useMemo(() => ({
    optionRecipes,
    usualRecipes,
    setUsualRecipes,
    counter,
    setCounter,
    categories,
    setCategories,
    showInput,
    setShowInput,
    radioButton,
    setRadioButton,
    input,
    setInput,
  }
  ), [usualRecipes, counter, categories, showInput, radioButton, input, optionRecipes]);
  ), [optionRecipes, usualRecipes, counter, categories, showInput, radioButton, input]);

  return (
    <ReceitasContext.Provider value={ context }>
      {children}
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReceitasProvider;
