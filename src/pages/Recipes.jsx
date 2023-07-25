import { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/Recipes.css';
import receitasContext from '../context/ReceitasContext';
import SearchBar from '../components/SearchBar';
import Beef from '../images/mealsCategories/Beef.png';
import All from '../images/mealsCategories/All.png';
import Breakfast from '../images/mealsCategories/Breakfast.png';
import Chicken from '../images/mealsCategories/Chicken.png';
import Dessert from '../images/mealsCategories/Dessert.png';
import Goat from '../images/mealsCategories/Goat.png';
import Ordinary from '../images/mealsCategories/Ordinary.png';
import Cocktail from '../images/mealsCategories/Cocktail.png';
import Shake from '../images/mealsCategories/Shake.png';
import Other from '../images/mealsCategories/Other.png';
import Cocoa from '../images/mealsCategories/Cocoa.png';

function Recipes() {
  const location = useLocation();
  const { pathname } = location;

  const {
    usualRecipes,
    setUsualRecipes,
    // counter,
    setCounter,
    categories,
    setCategories,
  } = useContext(receitasContext);
  const [filter, setFilter] = useState('');

  const food = pathname === '/meals' ? 'meals' : 'drinks';
  const idFood = pathname === '/meals' ? 'idMeal' : 'idDrink';

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesNum = 12;
      const categoryNum = 5;
      const path = pathname === '/meals' ? 'themeal' : 'thecocktail';
      // recipes
      const response = await fetch(
        `https://www.${path}db.com/api/json/v1/1/search.php?s=`,
      );
      const data = await response.json();
      const recipes = data[food].filter((meal, index) => index < recipesNum);
      setUsualRecipes(recipes);
      setCounter(1);
      // categories
      const responseCategory = await fetch(
        `https://www.${path}db.com/api/json/v1/1/list.php?c=list`,
      );
      const dataCategory = await responseCategory.json();
      const filterCategory = dataCategory[food].filter(
        (meal, index) => index < categoryNum,
      );

      setCategories(filterCategory);
    };
    fetchRecipes();
  }, [food, pathname, setUsualRecipes, setCounter, setCategories]);

  const handleAll = async () => {
    const path = pathname === '/meals' ? 'themeal' : 'thecocktail';
    const num = 12;
    const response = await fetch(`https://www.${path}db.com/api/json/v1/1/search.php?s=`);
    const data = await response.json();
    const filterCategory = data[food].splice(0, num);
    setUsualRecipes(filterCategory);
  };

  const handleCategory = async (categoryName) => {
    const path = pathname === '/meals' ? 'themeal' : 'thecocktail';
    const num = 12;

    if (categoryName !== filter) {
      const response = await fetch(
        `https://www.${path}db.com/api/json/v1/1/filter.php?c=${categoryName}`,
      );
      const data = await response.json();
      const recipes = data[food].splice(0, num);
      setUsualRecipes(recipes);
      setFilter(categoryName);
    } else {
      handleAll();
      setFilter('');
    }
  };

  const getCategoryImage = (categoryName) => {
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
      return Other; // Caso a categoria não tenha uma imagem específica
    }
  };

  return (
    <div className="recipes-container">
      <Header showBtn />
      <div className="searchBar-container">
        <SearchBar />
      </div>
      <div className="categories-container-foods">
        <div className="category-item-filter">
          {categories.length > 0 && (
            <div className="recipes-categories-all-btn">
              <div className="category-item-circle-foods">
                <input
                  type="image"
                  src={ All }
                  alt="All"
                  data-testid="All-category-filter"
                  onClick={ () => handleAll() }
                />
              </div>
              All
            </div>
          )}
        </div>
        {categories.map((categoryName, index) => (
          <div key={ index } className="category-item-filter">
            <div className="category-item-circle-foods">
              <input
                type="image"
                src={ getCategoryImage(categoryName.strCategory) }
                alt={ categoryName.strCategory }
                data-testid={ `${categoryName.strCategory}-category-filter` }
                onClick={ () => handleCategory(categoryName.strCategory) }
              />
            </div>
            {categoryName.strCategory}
          </div>
        ))}
      </div>
      <div className="cards-container">
        {usualRecipes.map((recipe, index) => (
          <Link to={ `/${food}/${recipe[idFood]}` } key={ recipe[idFood] }>
            <Card option={ pathname } recipe={ recipe } index={ index } />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
