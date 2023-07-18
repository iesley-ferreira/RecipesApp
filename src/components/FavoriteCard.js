import PropTypes from 'prop-types';
import './styles/FavoriteCard.css';
import copy from 'clipboard-copy';
import { useState } from 'react';
import { Link } from 'react-router-dom/';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard(props) {
  const { recipe, index, fillFavoriteRecipes, setFillFavoriteRecipes } = props;
  const { id, name, type, category, nationality, image, alcoholicOrNot } = recipe;

  const [showMessage, setShowMessage] = useState(false);

  const handleShareBtn = () => {
    const time = 2000;
    setShowMessage(true);
    copy(`http://localhost:3000/${type}s/${id}`);
    setTimeout(() => {
      setShowMessage(false);
    }, time);
  };

  const handleDeleteFavorite = () => {
    const newFavoriteRecipes = fillFavoriteRecipes.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFillFavoriteRecipes(newFavoriteRecipes);
  };

  return (
    <div className="favorite-card">
      <div className="favorite-card-left">
        <Link to={ `/${type}s/${id}` }>
          <img data-testid={ `${index}-horizontal-image` } src={ image } alt={ name } />
        </Link>
      </div>
      <div className="favorite-card-right">
        <div className="favorite-card-description">
          <Link to={ `/${type}s/${id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { type === 'meal'
              ? `${nationality} - ${category}`
              : `${alcoholicOrNot} - ${category}` }
          </p>
        </div>
        <div className="favorite-btn-container">
          {showMessage && <span className="span-copied">Link copied!</span>}
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ handleShareBtn }
            src={ shareIcon }
            alt="share"
            className="share-btn"
          />
          <input
            type="image"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ handleDeleteFavorite }
            src={ blackHeartIcon }
            alt="desfavoritar"
            className="favorite-btn"
          />
        </div>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    nationality: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
  fillFavoriteRecipes: PropTypes.arrayOf().isRequired,
  setFillFavoriteRecipes: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteCard;
