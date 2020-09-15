import React from 'react';
import {useLocation} from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';
import {Typography, Grid} from '@material-ui/core';

import {HelmetLayout} from '~/layouts';

const NotFound = () => {
  const {pathname} = useLocation();

  return (
    <HelmetLayout
      isNotFound
      title="404"
      metaDescription={`Page with ${pathname} path not found`}>
      <Grid container justify="center" alignItems="center" direction="row">
        <ErrorIcon color="error" fontSize="large" />
        <Typography variant="h4" color="error">
          404
        </Typography>
        <ErrorIcon color="error" fontSize="large" />
      </Grid>
      <Typography variant="h5" align="center" color="error">
        This is not the web page you are looking for.
      </Typography>
    </HelmetLayout>
  );
};

export default NotFound;
