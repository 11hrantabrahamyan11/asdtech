import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';

const Input = ({
  type,
  input,
  meta,
  label,
  className,
  multiline,
  errorClassName,
  ...restProps
}) => {
  const error = meta.touched && !!meta.error;

  return (
    <TextField
      {...restProps}
      fullWidth
      type={type}
      label={label}
      error={error}
      variant="outlined"
      multiline={multiline}
      className={className}
      {...input}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  className: PropTypes.string,
  errorClassName: PropTypes.string,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  className: '',
  multiline: false,
  errorClassName: '',
};

export default Input;
