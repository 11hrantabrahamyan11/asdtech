import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import paths from '~/routes/paths';
import {selectToken} from '~/ducks/auth';

const PrivateRoute = ({children, ...rest}) => {
  const token = useSelector(selectToken);

  return (
    <Route
      {...rest}
      render={({location}) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: paths.login,
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PrivateRoute;
