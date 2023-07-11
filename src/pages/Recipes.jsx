import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SeachBar from '../components/SearchBar';
import receitasContext from '../context/receitasContext';

function Recipes() {
  const location = useLocation();
  const { pathname } = location;
  const [usualRecipes, setUsualRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
 
  const {
    // optionRecipes,
    usualRecipes,
    setUsualRecipes,
    counter,
    setCounter,
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
      // categories
      const responseCategory = await fetch(`https://www.${path}db.com/api/json/v1/1/list.php?c=list`);
      const dataCategory = await responseCategory.json();
      const filterCategory = dataCategory[food]
        .filter((meal, index) => index < categoryNum);

      setCategories(filterCategory);
      setCounter(1);
      // console.log(recipes);
    };
    fetchRecipes();
  }, [food, pathname, setUsualRecipes, setCounter]);

  // Para redirecionar quando só tiver uma receita
  useEffect(() => {
    console.log(usualRecipes, counter);
    if (counter > 0 && usualRecipes.length === 0) {
      // console.log('função');
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [usualRecipes, counter]);

  const title = pathname === '/meals' ? 'Meals' : 'Drinks';

  return (
    <div className="recipes-container">
      <Header title={ title } />
      <SeachIcon recipes={ usualRecipes } setRecipes={ setUsualRecipes } />
      {categories.map((categoryName, index) => (
        <button
          key={ index }
          data-testid={ `${categoryName.strCategory}-category-filter` }
        >
          {categoryName.strCategory}
        </button>
      ))}
      <SeachBar recipes={ usualRecipes } setRecipes={ setUsualRecipes } />
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
