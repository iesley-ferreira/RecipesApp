import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  isInProgress,
  isDone,
} from '../services/saveRecipeInProgress';
import { saveRecipeInProgress } from '../services/localStorageFuncions';
import './styles/RecipeFaseButton.css';

export default function RecipeFaseButton(props) {
  const { type, id, ingredients } = props;
  const history = useHistory();

  // VARIÁVEIS
  const inProgressRecipes = isInProgress(id);
  const finalizado = isDone(id);
  const direct = `/${type}/${id}/in-progress`;

  // USE STATE
  const [recipeState, setRecipeState] = useState('Continue Recipe');

  useEffect(() => {
    if (finalizado) {
      setRecipeState('');
    }
  }, [finalizado, inProgressRecipes]);

  const makeProgress = (event) => {
    event.preventDefault();
    saveRecipeInProgress(id, ingredients);
    history.push(direct);
  };

  return (
    recipeState !== '' && (
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
