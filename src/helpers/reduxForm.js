import shortid from 'shortid';
import {required, length, validateForm} from 'redux-form-validators';

// Redux form fields
export const loginFields = [
  {
    id: shortid.generate(),
    name: 'username',
    label: 'Username',
    placeholder: 'jdoe',
  },
  {
    id: shortid.generate(),
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '****',
  },
];

// Redux form validators
const passwordValidator = [
  required({
    message: 'Password is required',
  }),
  length({
    min: 4,
    message: 'Your password must be at least 4 characters.',
  }),
];

const usernameValidator = [
  required({
    message: 'Username is required',
  }),
];

export const validateLoginForm = validateForm({
  username: usernameValidator,
  password: passwordValidator,
});
