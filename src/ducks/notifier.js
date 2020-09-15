import {createSelector} from 'reselect';
import {redux} from '~/helpers';

// Notifier action types
const ADD_NOTIFICATION = redux.buildActionType(
  redux.reducers.notifier,
  redux.actions.POST,
);
const REMOVE_NOTIFICATION = redux.buildActionType(
  redux.reducers.notifier,
  redux.actions.DELETE,
);

// Notifier initial state
const initialState = {
  nextNotification: -1,
  notifications: [],
};

// Notifier reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      const key = state.nextNotification + 1;

      return {
        ...state,
        nextNotification: key,
        notifications: [{...action.notification, key}, ...state.notifications],
      };
    }
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key,
        ),
      };
    default:
      return state;
  }
};

// Notifier action creators
export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  notification,
});

export const removeNotification = (key) => ({
  type: REMOVE_NOTIFICATION,
  key,
});

// Notifier selectors
export const selectState = (state) => state.notifier;

export const selectNotifications = createSelector(
  selectState,
  (notifierState) => notifierState.notifications,
);
