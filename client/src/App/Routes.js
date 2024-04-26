import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../Home';
import NotFound from '../views/NotFound/NotFound';
import BoardContainer from '../views/Board/Board.container';
import PrivateRoute from './PrivateRoute';
import Landing from '../views/Landing/Landing';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/log" component={Landing} />
        <PrivateRoute path="/app/:board" component={BoardContainer} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
