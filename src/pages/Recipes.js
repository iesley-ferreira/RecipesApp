import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SeachIcon from '../components/SearchIcon';

function Recipes() {
  const location = useLocation();
  const { pathname } = location;
  const [usualRecipes, setUsualRecipes] = useState([]);

  const food = pathname === '/meals' ? 'meals' : 'drinks';
  const idFood = pathname === '/meals' ? 'idMeal' : 'idDrink';

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesNum = 12;
      const path = pathname === '/meals' ? 'themeal' : 'thecocktail';

      const response = await fetch(`https://www.${path}db.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
      const recipes = data[food].filter((meal, index) => index < recipesNum);
      setUsualRecipes(recipes);
    };
    fetchRecipes();
  }, [food, pathname]);

  const title = pathname === '/meals' ? 'Meals' : 'Drinks';

  return (
    <div className="recipes-container">
      <Header title={ title } />
      <SeachIcon />
      {usualRecipes.map((recipe, index) => (
        <Card
          key={ recipe[idFood] }
          option={ pathname }
          recipe={ recipe }
          index={ index }
        />
      ))}
      <Footer />
    </div>
  );
}

export default Recipes;
