import { Link } from 'react-router-dom/cjs/react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import './styles/DoneRecipeCard.css';

function DoneRecipeCard(props) {
  const { recipe, position } = props;
  const [showMessage, setShowMessage] = useState(false);

  const {
    id,
    name,
    category,
    image,
    doneDate,
    tags,
    type,
    nationality,
    alcoholicOrNot,
  } = recipe;

  const copyLink = () => {
    const time = 2000;
    copy(`http://localhost:3000/${type}s/${id}`);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, time);
  };

  return (
    <div className="done-recipes-card-container">
      <div className="done-recipes-card-left">
        <Link className="done-name-Link" to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${position}-horizontal-image` }
            src={ image }
            alt={ name }
          />
        </Link>
      </div>

      <div className="done-recipes-card-right">
        <div>
          <Link className="done-name-btn" to={ `/${type}s/${id}` }>
            <h2 data-testid={ `${position}-horizontal-name` }>{ name }</h2>
          </Link>
          <p
            className="done-card-category"
            data-testid={ `${position}-horizontal-top-text` }
          >
            {`${nationality} - ${category}`}
          </p>
        </div>

        <input
          data-testid={ `${position}-horizontal-share-btn` }
          type="image"
          className="done-card-share-share-input"
          src={ shareIcon }
          alt="share"
          onClick={ copyLink }
        />

        {showMessage && <p className="link-copy">Link copied!</p>}

        {
          alcoholicOrNot && (
            <p
              className="done-card-category"
              data-testid={ `${position}-horizontal-top-text` }
            >
              { alcoholicOrNot }
            </p>)
        }
        <p
          className="done-card-date"
          data-testid={ `${position}-horizontal-done-date` }
        >
          { doneDate }
        </p>

        { tags && tags.length > 0
        && (tags.map((tag, index) => (
          <div key={ index } className="done-recipes-card-tags">
            <p data-testid={ `${position}-${tag}-horizontal-tag` }>{ tag }</p>
          </div>
        )))}
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    nationality: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
  position: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
