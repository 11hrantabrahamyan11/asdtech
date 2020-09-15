import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import paths from '~/routes/paths';
import {selectToken} from '~/ducks/auth';

const AuthRoute = ({children, ...rest}) => {
  const token = useSelector(selectToken);

  return (
    <Route
      {...rest}
      render={({location}) =>
        token ? (
          <Redirect
            to={{
              pathname: paths.homepage,
              state: {from: location},
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AuthRoute;
