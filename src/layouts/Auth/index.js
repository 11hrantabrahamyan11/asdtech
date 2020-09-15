import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {Grid, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {useRootStyles} from '~/styles';
import {Button, Input} from '~/components';

const Auth = ({submitButtonTitle, fields, onFormSubmit, handleSubmit}) => {
  const classes = useRootStyles();

  const rendFields = () =>
    fields.map((field) => (
      <Field
        key={field.id}
        type={field.type}
        component={Input}
        name={field.name}
        label={field.label}
        className={classes.input}
        placeholder={field.placeholder}
        errorClassName={classes.fieldError}
      />
    ));

  return (
    <Grid className={classes.listContainer}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid className={classes.input}>
          <Grid className={classes.lockIcon}>
            <LockOutlinedIcon />
          </Grid>
          <Typography>Login to your account</Typography>
        </Grid>

        {rendFields()}
        <Button type="submit" fullWidth>
          {submitButtonTitle}
        </Button>
      </form>
    </Grid>
  );
};

Auth.propTypes = {
  fields: PropTypes.array.isRequired,
  formName: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  validateFunc: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default compose(
  connect((state, props) => ({
    form: props.formName,
    validate: props.validateFunc,
  })),
  reduxForm({}),
)(Auth);
