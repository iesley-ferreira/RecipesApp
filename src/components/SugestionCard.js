import PropTypes from 'prop-types';
import './styles/SugestionCard.css';
import '../pages/styles/RecipeDetails.css';

function SugestionCard(props) {
  const { recipe, index, option } = props;
  const foodName = option === '/meals' ? 'strMeal' : 'strDrink';
  const foodThumb = option === '/meals' ? 'strMealThumb' : 'strDrinkThumb';

  return (
    <div className="card-container" data-testid={ `${index}-recommendation-card` }>
      <div className="card-img">
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[foodThumb] }
          alt={ recipe[foodName] }
        />
      </div>
      <div className="card-h2">
        <h2 data-testid={ `${index}-recommendation-title` }>{recipe[foodName]}</h2>
      </div>
    </div>
  );
}

SugestionCard.propTypes = {
  recipe: PropTypes.shape({
    idFood: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  option: PropTypes.string.isRequired,
};

export default SugestionCard;
