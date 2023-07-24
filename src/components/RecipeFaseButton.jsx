import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  isDone,
} from '../services/saveRecipeInProgress';
import { saveRecipeInProgress } from '../services/localStorageFuncions';
import '../pages/styles/RecipeDetails.css';

export default function RecipeFaseButton(props) {
  const { type, id, ingredients } = props;
  const history = useHistory();

  // VARIÁVEIS
  // const inProgressRecipes = isInProgress(id);
  const finalizado = isDone(id);
  const direct = `/${type}/${id}/in-progress`;
  let recipe = 'Continue Recipe';

  if (finalizado) {
    recipe = '';
  }

  const makeProgress = (event) => {
    event.preventDefault();
    saveRecipeInProgress(id, ingredients);
    history.push(direct);
  };

  return (
    recipe !== '' && (
      <button
        data-testid="start-recipe-btn"
        className="btnStart"
        onClick={ makeProgress }
      >
        {recipe}
      </button>
    )
  );
}

RecipeFaseButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
