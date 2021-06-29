import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@/pages/Home';
import './scss/normalized.scss';
import Callback from '@/pages/Callback';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/callback" component={Callback} />
  </Switch>
);

export default App;
