import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Recipes from './pages/Recipes';
// import Meals from './pages/Meals';
// import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
// import RecipeMealsInProgress from './pages/RecipeMealInProgress';
// import RecipeDrinkInProgress from './pages/RecipeDrinkInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ReceitasProvider from './context/ReceitasProvider';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <ReceitasProvider>
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route
          path="/meals/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </ReceitasProvider>
  );
}

export default App;
