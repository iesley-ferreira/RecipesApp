import { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import iconeBebida from '../images/iconeBebida.png';
import iconePrato from '../images/iconePrato.png';
import iconFastFood from '../images/iconFastFood.png';
import Footer from '../components/Footer';
import './styles/DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipesData, setDoneRecipesData] = useState([]);
  const [fillDoneRecipes, setFillDoneRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesLocalStorage = localStorage.getItem('doneRecipes');
    if (doneRecipesLocalStorage !== null) {
      const doneRecipesDataParsed = JSON.parse(doneRecipesLocalStorage);
      setDoneRecipesData(doneRecipesDataParsed);
      setFillDoneRecipes(doneRecipesDataParsed);
    }
  }, []);

  const filterByCategory = (event) => {
    const { alt } = event.target;
    if (alt === 'all') {
      setFillDoneRecipes(doneRecipesData);
    } else {
      const filteredRecipes = doneRecipesData
        .filter((recipe) => recipe.type === alt);
      setFillDoneRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <Header showBtn={ false } title="Done Recipes" />
      <div className="doneRecipes-categories-container">
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
      <div className="doneRecipes-card-container">
        { fillDoneRecipes && (
          fillDoneRecipes.map((data, index) => (
            <DoneRecipeCard
              key={ index }
              recipe={ data }
              position={ index }
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
