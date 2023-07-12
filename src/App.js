import React, { useMemo, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import receitasContext from './context/receitasContext';

import Login from './pages/Login';
import Recipes from './pages/Recipes';
// import Meals from './pages/Meals';
// import Drinks from './pages/Drinks';
import RecipeMeal from './pages/RecipeMeal';
import RecipeDrink from './pages/RecipeDrink';
// import RecipeMealsInProgress from './pages/RecipeMealInProgress';
// import RecipeDrinkInProgress from './pages/RecipeDrinkInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  const [optionRecipes] = useState([]);
  const [usualRecipes, setUsualRecipes] = useState([]);
  const [counter, setCounter] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [radioButton, setRadioButton] = useState('');
  const [input, setInput] = useState('');

  // usualRecipes = receitas
  // counter = variável para identificar se Recipes foi renderizado ou não

  const contextValue = useMemo(() => ({
    optionRecipes,
    usualRecipes,
    setUsualRecipes,
    counter,
    setCounter,
    categories,
    setCategories,
    showInput,
    setShowInput,
    radioButton,
    setRadioButton,
    input,
    setInput,
  }), [usualRecipes, counter, optionRecipes, categories, showInput, radioButton, input]);

  return (
    <receitasContext.Provider value={ contextValue }>
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id-da-receita" component={ RecipeMeal } />
        <Route exact path="/drinks/:id-da-receita" component={ RecipeDrink } />
        <Route
          path="/meals/:id-da-receita/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          component={ RecipeInProgress }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/detalhes" component={ Details } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </receitasContext.Provider>
  );
}

export default App;
