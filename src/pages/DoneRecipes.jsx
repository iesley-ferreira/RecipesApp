import { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import iconeBebida from '../images/iconeBebida.png';

function DoneRecipes() {
  const [doneRecipesData, setDoneRecipesData] = useState([]);
  const [fillDoneRecipes, setFillDoneRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesLocalStorage = localStorage.getItem('doneRecipes');
    const doneRecipesDataParsed = JSON.parse(doneRecipesLocalStorage);
    setDoneRecipesData(doneRecipesDataParsed);
  }, []);

  const filterByCategory = (category) => {
    if (category === 'all') {
      setFillDoneRecipes(doneRecipesData);
    } else {
      const filteredRecipes = doneRecipesData
        .filter((recipe) => recipe.type === category);
      setFillDoneRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <Header />
      <div className="doneRecipes-categories-container">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ ({ name }) => filterByCategory(name) }
          src={ iconeBebida }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ ({ name }) => filterByCategory(name) }
          src={ iconeBebida }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ ({ name }) => filterByCategory(name) }
          src={ iconeBebida }
        >
          Drinks
        </button>
      </div>
      <div className="doneRecipes-card-container">
        {
          fillDoneRecipes.length === 0 ? (
            doneRecipesData.map((recipe, index) => (
              <DoneRecipeCard
                key={ index }
                recipe={ recipe }
                index={ index }
              />
            ))
          ) : (
            fillDoneRecipes.map((recipe, index) => (
              <DoneRecipeCard
                key={ index }
                recipe={ recipe }
                index={ index }
              />
            ))
          )
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
