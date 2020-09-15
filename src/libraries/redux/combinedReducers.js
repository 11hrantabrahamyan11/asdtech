import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import * as ducks from '~/ducks';

const reducers = {
  ...ducks,
  form: formReducer,
};

export default combineReducers(reducers);
