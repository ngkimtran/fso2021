import userService from '../services/users';

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: 'GET_USERS',
      data: users,
    });
  };
};

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data;
    default:
      return state;
  }
};

export default usersReducer;
