import { Link, useLocation, useParams } from 'react-router-dom/';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  removeFavoriteRecipe,
  addFavoriteRecipe,
  isFavoriRecipe,
} from '../services/localStorageFuncions';
import Beef from '../images/mealsCategories/Beef.png';
import Breakfast from '../images/mealsCategories/Breakfast.png';
import Chicken from '../images/mealsCategories/Chicken.png';
import Dessert from '../images/mealsCategories/Dessert.png';
import Goat from '../images/mealsCategories/Goat.png';
import Ordinary from '../images/mealsCategories/Ordinary.png';
import Cocktail from '../images/mealsCategories/Cocktail.png';
import Shake from '../images/mealsCategories/Shake.png';
import Other from '../images/mealsCategories/Other.png';
import Cocoa from '../images/mealsCategories/Cocoa.png';
import Share from '../images/Share.png';
import blackHeartIcon from '../images/Heart.png';
import whiteHeartIcon from '../images/WhiteHeart.png';
import { fetchRecipesDetailsApi } from '../services/fetchAPI';
import './styles/HeaderLinks.css';

function HeaderLinks(props) {
  const { isFavorite, setIsFavorite } = props;
  const [showMessage, setShowMessage] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState([]);

  const { pathname } = useLocation();
  const { id } = useParams();

  const correctId = id.replace(':', '');
  const food = (pathname.includes('meals')) ? 'meals' : 'drinks';

  const type = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    async function fetchRecipeDetails() {
      const details = await fetchRecipesDetailsApi(food, correctId);
      setRecipeDetail(details[0]);
    }

    fetchRecipeDetails();
  }, [food, correctId]);

  useEffect(() => {
    // verifica se a receita está salva nos favoritos
    setIsFavorite(isFavoriRecipe(correctId));
  }, [recipeDetail, correctId]);

  const copyLink = () => {
    const time = 2000;
    copy(`http://localhost:3000/${type}s/${id}`);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, time);
  };

  function handleFavorite() {
    if (isFavorite) {
      removeFavoriteRecipe(id);
      setIsFavorite(false);
    } else {
      addFavoriteRecipe(recipeDetail);
      setIsFavorite(true);
    }
  }

  const getCategoryImg = (categoryName, tipo) => {
    switch (categoryName) {
    case 'Beef':
      return Beef;
    case 'Breakfast':
      return Breakfast;
    case 'Chicken':
      return Chicken;
    case 'Dessert':
      return Dessert;
    case 'Goat':
      return Goat;
    case 'Ordinary Drink':
      return Ordinary;
    case 'Cocktail':
      return Cocktail;
    case 'Shake':
      return Shake;
    case 'Cocoa':
      return Cocoa;
    default:
      return (tipo === 'meals') ? Other : Cocktail;
    }
  };

  return (
    <div className="details-links-container">
      <Link to={ `/${pathname.split('/')[1]}` }>
        <div className="category-item-circle-inprogress-container">
          <div className="category-item-circle-inprogress">
            <input
              type="image"
              src={ getCategoryImg(recipeDetail.strCategory, type) }
              alt={ recipeDetail.strCategory }
              data-testid="btn-go-home"
            />
          </div>
          <p>{recipeDetail.strCategory}</p>
        </div>
      </Link>
      <div className="shareAndLike-container">
        <input
          onClick={ copyLink }
          type="image"
          data-testid="share-btn"
          className="share-btn"
          src={ Share }
          alt="share"
        />
        <input
          onClick={ handleFavorite }
          type="image"
          className="favorite-btn"
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
        />
        {showMessage && <p className="link-copy">Link copied!</p>}
      </div>
    </div>
  );
}

HeaderLinks.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  setIsFavorite: PropTypes.func.isRequired,
};

export default HeaderLinks;
