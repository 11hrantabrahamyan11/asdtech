import React from 'react';
import PropTypes from 'prop-types';
import {Button as MaterialButton} from '@material-ui/core';

const Button = ({variant, color, ...restProps}) => (
  <MaterialButton variant={variant} color={color} {...restProps} />
);

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
};

export default Button;
