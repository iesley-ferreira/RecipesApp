import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  isInProgress,
  isDone,
  saveRecipeInProgress,
} from '../services/saveRecipeInProgress';
import './styles/RecipeFaseButton.css';

export default function RecipeFaseButton(props) {
  const { type, id, ingredients } = props;
  const history = useHistory();

  // VARIÁVEIS
  const inProgressRecipes = isInProgress(id);
  const finalizado = isDone(id);

  // USE STATE
  const [recipeState, setRecipeState] = useState('Start Recipe');

  useEffect(() => {
    if (inProgressRecipes || finalizado) {
      setRecipeState('Already Started');
    }
  }, [finalizado, inProgressRecipes]);

  const makeProgress = (event) => {
    event.preventDefault();
    saveRecipeInProgress(id, ingredients);
    history.push(`/${type}/:${id}/in-progress`);
  };

  return (
    recipeState === 'Start Recipe' && (
      <button
        data-testid="start-recipe-btn"
        className="btnFase"
        onClick={ makeProgress }
      >
        {recipeState}
      </button>
    )
  );
}

RecipeFaseButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
