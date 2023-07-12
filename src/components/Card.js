import PropTypes from 'prop-types';
import './styles/Card.css';

function Card(props) {
  const { recipe, index, option } = props;
  const foodName = option === '/meals' ? 'strMeal' : 'strDrink';
  const foodThumb = option === '/meals' ? 'strMealThumb' : 'strDrinkThumb';

  // console.log(foodName, foodThumb, option, recipe);

  return (
    <div className="card-container" data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe[foodThumb] }
        alt={ recipe[foodName] }
      />
      <h2 data-testid={ `${index}-card-name` }>{recipe[foodName]}</h2>
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
