import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeMeal from './pages/RecipeMeal';
import RecipeDrink from './pages/RecipeDrink';
import RecipeMealsInProgress from './pages/RecipeMealInProgress';
import RecipeDrinkInProgress from './pages/RecipeDrinkInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } exact />
      {/* <Route path="/menu" component={ Menu } />
      <Route path="/detalhes" component={ Detalhes } />
      <Route path="/progresso" component={ Progresso } />
    <Route path="*" component={ NotFound } /> */}
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/meals/:id-da-receita" component={ RecipeMeal } />
      <Route path="/drinks/:id-da-receita" component={ RecipeDrink } />
      <Route
        path="/meals/:id-da-receita/in-progress"
        component={ (
          RecipeMealsInProgress
        ) }
      />
      <Route
        path="/drinks/:id-da-receita/in-progress"
        component={ (
          RecipeDrinkInProgress
        ) }
      />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />

    </Switch>
  );
}

export default App;
