import { useEffect, useState } from 'react';
import iconeBebida from '../images/iconeBebida.png';
import iconePrato from '../images/iconePrato.png';
import iconFastFood from '../images/iconFastFood.png';
import Header from '../components/Header';
import './styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favoriteRecipesData, setFavoriteRecipesData] = useState([]);
  const [fillFavoriteRecipes, setFillFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesLocalStorage = localStorage.getItem('favoriteRecipes');
    const favoriteRecipesDataParsed = JSON.parse(favoriteRecipesLocalStorage);
    console.log(favoriteRecipesDataParsed);
    setFavoriteRecipesData(favoriteRecipesDataParsed);
  }, []);

  const filterByCategory = (category) => {
    if (category === 'all') {
      setFillFavoriteRecipes(favoriteRecipesData);
      console.log(fillFavoriteRecipes);
    } else {
      const filteredRecipes = favoriteRecipesData
        .filter((recipe) => recipe.type === category);
      setFillFavoriteRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <Header showBtn title="Favorite Recipes" />
      <div className="favoriteRecipes-categories-container">
        <div className="filter-by-category">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            name="all"
            onClick={ ({ name }) => filterByCategory(name) }
          >
            <img src={ iconFastFood } alt="all icon" />
          </button>
          All
        </div>
        <div className="filter-by-category">
          <button
            data-testid="filter-by-meal-btn"
            type="button"
            onClick={ ({ name }) => filterByCategory(name) }
          >
            <img src={ iconePrato } alt="meal icon" />
          </button>
          Meals
        </div>
        <div className="filter-by-category">
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ ({ name }) => filterByCategory(name) }
          >
            <img src={ iconeBebida } alt="" />
          </button>
          Drinks
        </div>
      </div>
      <div>
        { fillFavoriteRecipes.map((recipe, index) => (
          <div key={ index }>
            <img src={ recipe.image } alt={ recipe.name } />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : recipe.alcoholicOrNot }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
