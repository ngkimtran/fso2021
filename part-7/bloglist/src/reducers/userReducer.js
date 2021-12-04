import loginService from '../services/login';

import storage from '../utils/storage';

export const login = (user) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login(user);
    storage.saveUser(loggedInUser);
    dispatch({
      type: 'LOGIN',
      data: loggedInUser,
    });
  };
};

export const logout = () => {
  storage.logoutUser();
  return {
    type: 'LOGOUT',
    data: null,
  };
};

export const loadUser = () => {
  const user = storage.loadUser();
  return {
    type: 'LOAD_USER',
    data: user,
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOAD_USER':
      return action.data;
    case 'LOGOUT':
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
