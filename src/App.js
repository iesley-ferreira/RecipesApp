import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } exact />
      {/* <Route path="/menu" component={ Menu } />
      <Route path="/detalhes" component={ Detalhes } />
      <Route path="/progresso" component={ Progresso } />
      <Route path="/feitas" component={ Feitas } />
      <Route path="/favoritos" component={ Favoritos } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="*" component={ NotFound } /> */}
    </Switch>
  );
}

export default App;
