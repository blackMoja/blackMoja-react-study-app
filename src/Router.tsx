import { BrowserRouter, Switch, Route } from 'react-router-dom';

import type { FunctionComponent } from 'react';
import Coins from 'routes/Coins';
import Coin from 'routes/Coin';

const Router: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
