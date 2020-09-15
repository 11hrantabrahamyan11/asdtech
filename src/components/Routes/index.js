import React from 'react';
import {Route, Switch} from 'react-router-dom';

import routes from '~/routes';

import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  const renderRoutes = () =>
    routes.map((route) => {
      const {id, path, Component, isPrivate, notFound, ...routeProps} = route;
      const RouteComponent = notFound
        ? Route
        : isPrivate
        ? PrivateRoute
        : AuthRoute;

      return (
        <RouteComponent key={id} path={path} exact {...routeProps}>
          <Component />
        </RouteComponent>
      );
    });

  return <Switch>{renderRoutes()}</Switch>;
};

export default Routes;
