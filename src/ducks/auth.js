import shortid from 'shortid';
import {createSelector} from 'reselect';

import {addNotification} from './notifier';

import {axiosInstance} from '~/libraries';
import {localStorage, constants, redux} from '~/helpers';

// Auth action types
const GET_TOKEN = redux.buildActionType(
  redux.reducers.auth,
  redux.actions.GET,
  'token',
);
const SET_SERVER_ERROR_ATTEMPTS = redux.buildActionType(
  redux.reducers.auth,
  redux.actions.POST,
  'serverErrorAttempts',
);
const SET_WSS_URL = redux.buildActionType(
  redux.reducers.auth,
  redux.actions.POST,
  'wssURL',
);

// Auth initial state
const initialState = {
  wssURL: null,
  serverErrorAttempts: 0,
  token: localStorage.load(constants.LOCAL_STORAGE_KEYS.token),
};

// Auth reducer
export default (state = initialState, action = {}) => {
  const {token, wssURL, serverErrorAttempts} = action;

  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token,
      };
    case SET_SERVER_ERROR_ATTEMPTS:
      return {
        ...state,
        serverErrorAttempts,
      };
    case SET_WSS_URL:
      return {
        ...state,
        wssURL,
      };

    default:
      return state;
  }
};

// Auth action creators
export const loadToken = (token) => {
  return {type: GET_TOKEN, token};
};

export const loadWssURL = (wssURL) => {
  return {type: SET_WSS_URL, wssURL};
};

export const loadServerErrorAttempts = (serverErrorAttempts) => {
  return {type: SET_SERVER_ERROR_ATTEMPTS, serverErrorAttempts};
};

export const subscribe = () => async (dispatch) => {
  try {
    const {data} = await axiosInstance.get('/subscribe');
    dispatch(loadWssURL(data.url));
  } catch (error) {
    dispatch(
      addNotification({
        type: 'error',
        key: shortid.generate(),
        message: error.response.data.description,
      }),
    );
  }
};

export const login = (username, password) => async (dispatch, getState) => {
  try {
    const {headers} = await axiosInstance.post('/login', {
      username,
      password,
    });
    const token = headers['x-test-app-jwt-token'];

    dispatch(loadToken(token));
    localStorage.save(constants.LOCAL_STORAGE_KEYS.token, token);
  } catch (error) {
    const {status} = error.response;
    const {serverErrorAttempts} = getState().auth;
    const isAccessError = status === 400 || status === 401;
    let isAllowedShowServerError = false;

    if (!isAccessError) {
      const nextServerErrorAttempts = serverErrorAttempts + 1;
      const sendedAttempts =
        nextServerErrorAttempts === 3 ? 0 : nextServerErrorAttempts;

      if (!sendedAttempts) {
        isAllowedShowServerError = true;
      }
      dispatch(loadServerErrorAttempts(sendedAttempts));
    }

    const shouldShowNotifier = isAccessError || isAllowedShowServerError;

    if (shouldShowNotifier) {
      dispatch(
        addNotification({
          type: 'error',
          key: shortid.generate(),
          message: error.response.data.description,
        }),
      );
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch(loadToken(null));
  localStorage.remove(constants.LOCAL_STORAGE_KEYS.token);
};

// Auth selectors
export const selectState = (state) => state.auth;

export const selectToken = createSelector(
  selectState,
  (authState) => authState.token,
);

export const selectWssURL = createSelector(
  selectState,
  (authState) => authState.wssURL,
);
