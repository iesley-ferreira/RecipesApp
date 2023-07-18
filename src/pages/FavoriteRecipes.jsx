import { useEffect, useState } from 'react';
import iconeBebida from '../images/iconeBebida.png';
import iconePrato from '../images/iconePrato.png';
import iconFastFood from '../images/iconFastFood.png';
import Header from '../components/Header';
import './styles/FavoriteRecipes.css';
import FavoriteCard from '../components/FavoriteCard';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const [favoriteRecipesData, setFavoriteRecipesData] = useState([]);
  const [fillFavoriteRecipes, setFillFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesLocalStorage = localStorage.getItem('favoriteRecipes') || '[]';
    const favoriteRecipesDataParsed = JSON.parse(favoriteRecipesLocalStorage);
    console.log(favoriteRecipesDataParsed);
    setFavoriteRecipesData(favoriteRecipesDataParsed);
    setFillFavoriteRecipes(favoriteRecipesDataParsed);
  }, []);

  const filterByCategory = (event) => {
    const { alt } = event.target;
    if (alt === 'all') {
      setFillFavoriteRecipes(favoriteRecipesData);
    } else {
      const filteredRecipes = favoriteRecipesData
        .filter((recipe) => recipe.type === alt);
      setFillFavoriteRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <Header showBtn={ false } title="Favorite Recipes" />
      <div className="favoriteRecipes-categories-container">
        <div className="filter-by-category">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            name="all"
            onClick={ (event) => filterByCategory(event) }
          >
            <img src={ iconFastFood } alt="all" />
          </button>
          All
        </div>
        <div className="filter-by-category">
          <button
            data-testid="filter-by-meal-btn"
            type="button"
            onClick={ (event) => filterByCategory(event) }
          >
            <img src={ iconePrato } alt="meal" />
          </button>
          Meals
        </div>
        <div className="filter-by-category">
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ (event) => filterByCategory(event) }
          >
            <img src={ iconeBebida } alt="drink" />
          </button>
          Drinks
        </div>
      </div>
      <div className="favorite-cards-container">
        { fillFavoriteRecipes.map((recipe, index) => (
          <FavoriteCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            fillFavoriteRecipes={ fillFavoriteRecipes }
            setFillFavoriteRecipes={ setFillFavoriteRecipes }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
