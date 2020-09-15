import {APP_BASE_NAME} from '~/helpers/constants';

const buildActionType = (reducer, action, key) =>
  `@${APP_BASE_NAME}/${reducer}${key ? `/${key}` : ''}/${action}`;

const actions = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

const reducers = {
  form: 'form',
  auth: 'auth',
  notifier: 'notifier',
};

export default {
  actions,
  reducers,
  buildActionType,
};
