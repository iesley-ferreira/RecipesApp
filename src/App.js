import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import receitasContext from './context/receitasContext';

import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  const [optionRecipes] = useState([]);

  return (
    <receitasContext.Provider value={ optionRecipes }>
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        {/* <Route path="/detalhes" component={ Detalhes } />
      <Route path="/progresso" component={ Progresso } />
      <Route path="/feitas" component={ Feitas } />
      <Route path="/favoritos" component={ Favoritos } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="*" component={ NotFound } /> */}
      </Switch>
    </receitasContext.Provider>

  );
}

export default App;
