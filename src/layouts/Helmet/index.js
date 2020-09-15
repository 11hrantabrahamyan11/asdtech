import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, AppBar, Toolbar, Typography} from '@material-ui/core';

import paths from '~/routes/paths';
import {Button} from '~/components';
import {useRootStyles} from '~/styles';
import {selectToken, logout} from '~/ducks/auth';

const HelmetLayout = ({children, title, metaDescription, isNotFound}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useRootStyles();
  const token = useSelector(selectToken);

  const rightActionHandler = () => {
    if (token) {
      dispatch(logout());
    }

    history.push(paths.login);
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>

          {title !== 'Login' && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={rightActionHandler}>
              {token ? 'Logout' : 'Login'}
            </Button>
          )}
          {token && isNotFound && (
            <Button
              color="inherit"
              variant="outlined"
              component={Link}
              to={paths.homepage}
              className={classes.appButton}>
              Go to app
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.main}>
        {children}
      </Grid>
    </>
  );
};

HelmetLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  metaDescription: PropTypes.string.isRequired,
};

export default HelmetLayout;
