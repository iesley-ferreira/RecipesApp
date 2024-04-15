import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import receitasContext from "../context/ReceitasContext";
import All from "../images/mealsCategories/All.png";
import Beef from "../images/mealsCategories/Beef.png";
import Breakfast from "../images/mealsCategories/Breakfast.png";
import Chicken from "../images/mealsCategories/Chicken.png";
import Cocktail from "../images/mealsCategories/Cocktail.png";
import Cocoa from "../images/mealsCategories/Cocoa.png";
import Dessert from "../images/mealsCategories/Dessert.png";
import Goat from "../images/mealsCategories/Goat.png";
import Ordinary from "../images/mealsCategories/Ordinary.png";
import Other from "../images/mealsCategories/Other.png";
import Shake from "../images/mealsCategories/Shake.png";
import "./styles/Recipes.css";

// ===================== Importação de icones ==================== //
import DoneRecipes from "../images/DoneRecipes.png";
import Favorites from "../images/Favorites.png";
import PageDrink from "../images/PageDrink.png";
import profileIcon from "../images/iconePerfil.png";
import iconePrato from "../images/iconePrato.png";

function Recipes() {
  const { pathname } = window.location;

  const { usualRecipes, setUsualRecipes, setCounter, categories, setCategories } =
    useContext(receitasContext);
  const [filter, setFilter] = useState("");

  const food = pathname === "/meals" ? "meals" : "drinks";
  const idFood = pathname === "/meals" ? "idMeal" : "idDrink";

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesNum = 12;
      const categoryNum = 5;
      const path = pathname === "/meals" ? "themeal" : "thecocktail";

      const response = await fetch(
        `https://www.${path}db.com/api/json/v1/1/search.php?s=`
      );
      const data = await response.json();
      const recipes = data[food].filter((meal, index) => index < recipesNum);
      setUsualRecipes(recipes);
      setCounter(1);

      const responseCategory = await fetch(
        `https://www.${path}db.com/api/json/v1/1/list.php?c=list`
      );
      const dataCategory = await responseCategory.json();
      const filterCategory = dataCategory[food].filter(
        (meal, index) => index < categoryNum
      );

      setCategories(filterCategory);
    };
    fetchRecipes();
  }, [food, pathname, setUsualRecipes, setCounter, setCategories]);

  const handleAll = async () => {
    const path = pathname === "/meals" ? "themeal" : "thecocktail";
    const num = 12;
    const response = await fetch(`https://www.${path}db.com/api/json/v1/1/search.php?s=`);
    const data = await response.json();
    const filterCategory = data[food].splice(0, num);
    setUsualRecipes(filterCategory);
  };

  const handleCategory = async (categoryName) => {
    const path = pathname === "/meals" ? "themeal" : "thecocktail";
    const num = 12;

    if (categoryName !== filter) {
      const response = await fetch(
        `https://www.${path}db.com/api/json/v1/1/filter.php?c=${categoryName}`
      );
      const data = await response.json();
      const recipes = data[food].splice(0, num);
      setUsualRecipes(recipes);
      setFilter(categoryName);
    }
  };

  const getCategoryImage = (categoryName) => {
    switch (categoryName) {
      case "Beef":
        return Beef;
      case "Breakfast":
        return Breakfast;
      case "Chicken":
        return Chicken;
      case "Dessert":
        return Dessert;
      case "Goat":
        return Goat;
      case "Ordinary Drink":
        return Ordinary;
      case "Cocktail":
        return Cocktail;
      case "Shake":
        return Shake;
      case "Cocoa":
        return Cocoa;
      default:
        return Other;
    }
  };

  const getHeaderImage = (title) => {
    switch (title) {
      case "Meals":
        return iconePrato;
      case "Drinks":
        return PageDrink;
      case "Favorite Recipes":
        return Favorites;
      case "Profile":
        return profileIcon;
      case "Done Recipes":
        return DoneRecipes;
      default:
        return "";
    }
  };

  const str = pathname;
  const novaStr = str
    .replace("/", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

  return (
    <div className='phoneFrame'>
      <div className='recipes-container'>
        <Header showBtn />
        <div className='title-container'>
          <img className='done-image' src={getHeaderImage(novaStr)} alt={novaStr} />
          <h1 data-testid='page-title'>{novaStr}</h1>
        </div>
        <div className='searchBar-container'>
          <SearchBar />
        </div>
        <div className='categories-container-foods'>
          {categories.length > 0 && (
            <button
              onClick={() => handleAll()}
              className='category-item-filter recipes-categories-all-btn'
            >
              <div className='category-item-circle-foods'>
                <img src={All} alt='All' data-testid='All-category-filter' />
              </div>
              All
            </button>
          )}
          {categories.map((categoryName, index) => (
            <button
              onClick={() => handleCategory(categoryName.strCategory)}
              key={index}
              className='category-item-filter '
            >
              <div className='category-item-circle-foods'>
                <img
                  src={getCategoryImage(categoryName.strCategory)}
                  alt={categoryName.strCategory}
                  data-testid={`${categoryName.strCategory}-category-filter`}
                />
              </div>
              <div className='category-text'>
                <p>{categoryName.strCategory}</p>
              </div>
            </button>
          ))}
        </div>
        <div className='cards-container'>
          {usualRecipes.map((recipe, index) => (
            <Link to={`/${food}/${recipe[idFood]}`} key={recipe[idFood]}>
              <Card option={pathname} recipe={recipe} index={index} />
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Recipes;
