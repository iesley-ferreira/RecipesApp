import { useEffect, useState } from 'react';
import Header from '../components/Header';
// import DoneRecipeCard from '../components/DoneRecipeCard';
import iconeBebida from '../images/iconeBebida.png';
import iconePrato from '../images/iconePrato.png';
import iconFastFood from '../images/iconFastFood.png';
import './styles/DoneRecipes.css';

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
      console.log(fillDoneRecipes);
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
      <div className="doneRecipes-card-container">
        {/* {
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
        } */}
      </div>
    </div>
  );
}

export default DoneRecipes;
