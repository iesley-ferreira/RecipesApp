import PropTypes from 'prop-types';
import './styles/Card.css';
import '../pages/styles/RecipeDetails.css';

function Card(props) {
  const { recipe, index, option } = props;
  const foodName = option === '/meals' ? 'strMeal' : 'strDrink';
  const foodThumb = option === '/meals' ? 'strMealThumb' : 'strDrinkThumb';

  return (
    <div className="card-container" data-testid={ `${index}-recipe-card` }>
      <div className="card-img">
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[foodThumb] }
          alt={ recipe[foodName] }
        />
      </div>
      <div className="card-h2">
        <h2 data-testid={ `${index}-card-name` }>{ recipe[foodName] }</h2>
        <p
          data-testid={ `${index}-recommendation-title` }
          className="second-title"
        >
          {recipe[foodName]}
        </p>
      </div>
    </div>
  );
}

Card.propTypes = {
  recipe: PropTypes.shape({
    idFood: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  option: PropTypes.string.isRequired,
};

export default Card;
