import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import receitasContext from './context/receitasContext';

import Login from './pages/Login';
import Recipes from './pages/Recipes';
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
  const [optionRecipes] = useState([]);

  return (
    <receitasContext.Provider value={ optionRecipes }>
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/meals/:id-da-receita" component={ RecipeMeal } />
        <Route path="/drinks/:id-da-receita" component={ RecipeDrink } />
        <Route
          path="/meals/:id-da-receita/in-progress"
          component={ (RecipeMealsInProgress) }
        />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          component={ (RecipeDrinkInProgress) }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/detalhes" component={ Detalhes } />
        <Route path="/progresso" component={ Progresso } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </receitasContext.Provider>
  );
}

export default App;
