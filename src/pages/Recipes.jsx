import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/Recipes.css';
import receitasContext from '../context/receitasContext';
import SearchBar from '../components/SearchBar';

function Recipes() {
  const location = useLocation();
  const { pathname } = location;

  const {
    usualRecipes,
    setUsualRecipes,
    counter,
    setCounter,
    setCategories,
  } = useContext(receitasContext);

  const food = pathname === '/meals' ? 'meals' : 'drinks';
  const idFood = pathname === '/meals' ? 'idMeal' : 'idDrink';

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesNum = 12;
      const categoryNum = 5;
      const path = pathname === '/meals' ? 'themeal' : 'thecocktail';
      // recipes
      const response = await fetch(`https://www.${path}db.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
      const recipes = data[food].filter((meal, index) => index < recipesNum);
      setUsualRecipes(recipes);
      setCounter(1);
      // categories
      const responseCategory = await fetch(`https://www.${path}db.com/api/json/v1/1/list.php?c=list`);
      const dataCategory = await responseCategory.json();
      const filterCategory = dataCategory[food]
        .filter((meal, index) => index < categoryNum);

      setCategories(filterCategory);
    };
    fetchRecipes();
  }, [food, pathname, setUsualRecipes, setCounter, setCategories]);

  // Para redirecionar quando só tiver uma receita
  useEffect(() => {
    console.log(usualRecipes, counter);
    if (counter > 0 && usualRecipes.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [usualRecipes, counter]);

  return (
    <div className="recipes-container">
      <Header />
      <div className="searchBar-container">
        <SearchBar />
      </div>
      <div className="categories-container">
        <p>Categorias Aqui</p>
      </div>
      <div className="cards-container">
        {usualRecipes.map((recipe, index) => (
          <Card
            key={ recipe[idFood] }
            option={ pathname }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
