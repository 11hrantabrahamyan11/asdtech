import {APP_BASE_NAME} from './constants';

const load = (item) => {
  try {
    const serializedState = localStorage.getItem(item);

    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

const save = (name, value) => {
  const serializedState = JSON.stringify(value);
  localStorage.setItem(name, serializedState);
};

const remove = (name) => {
  localStorage.removeItem(name);
};

const createKey = (key) => `${APP_BASE_NAME}/${key}`;

export default {
  load,
  save,
  remove,
  createKey,
};
