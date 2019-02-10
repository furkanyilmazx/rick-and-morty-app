import React, { Component, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { NotFoundPage } from './pages';
import 'antd/dist/antd.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  exact
                  path={route.path}
                  component={route.component}
                />
              );
            })}
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
