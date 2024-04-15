import { useEffect, useState } from "react";
import DoneRecipeCard from "../components/DoneRecipeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import iconFastFood from "../images/iconFastFood.png";
import iconeBebida from "../images/iconeBebida.png";
import iconePrato from "../images/iconePrato.png";
import "./styles/DoneRecipes.css";

function DoneRecipes() {
  const [doneRecipesData, setDoneRecipesData] = useState([]);
  const [fillDoneRecipes, setFillDoneRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesLocalStorage = localStorage.getItem("doneRecipes");
    if (doneRecipesLocalStorage !== null) {
      const doneRecipesDataParsed = JSON.parse(doneRecipesLocalStorage);
      setDoneRecipesData(doneRecipesDataParsed);
      setFillDoneRecipes(doneRecipesDataParsed);
    }
  }, []);

  const filterByCategory = (event) => {
    const { alt } = event.target;
    if (alt === "all") {
      setFillDoneRecipes(doneRecipesData);
    } else {
      const filteredRecipes =
        doneRecipesData && doneRecipesData.filter((recipe) => recipe.type === alt);
      setFillDoneRecipes(filteredRecipes);
    }
  };

  return (
    <div className='doneRecipes-page-container'>
      <Header showBtn={false} title='Done Recipes' />
      <div className='doneRecipes-categories-container'>
        <div className='filter-by-category'>
          <button
            className='category-item-button'
            onClick={(event) => filterByCategory(event)}
          >
            <div className='category-item-circle'>
              <img data-testid='filter-by-all-btn' src={iconFastFood} alt='all' />
            </div>
          </button>
          All
        </div>
        <div className='filter-by-category'>
          <button
            className='category-item-button'
            onClick={(event) => filterByCategory(event)}
          >
            <div className='category-item-circle'>
              <img src={iconePrato} alt='meal' data-testid='filter-by-meal-btn' />
            </div>
          </button>
          Meals
        </div>
        <div className='filter-by-category'>
          <button
            className='category-item-button'
            onClick={(event) => filterByCategory(event)}
          >
            <div className='category-item-circle'>
              <img src={iconeBebida} alt='drink' data-testid='filter-by-drink-btn' />
            </div>
          </button>
          Drinks
        </div>
      </div>
      <div className='doneRecipes-card-container'>
        {fillDoneRecipes &&
          fillDoneRecipes.map((data, index) => (
            <DoneRecipeCard key={index} recipe={data} position={index} />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
