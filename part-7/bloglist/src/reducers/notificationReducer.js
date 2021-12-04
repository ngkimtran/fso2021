const showNoti = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    message,
  };
};

const hideNoti = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  };
};

let timeoutID = undefined;
export const setNotification = (message, timeout) => {
  clearTimeout(timeoutID);
  return async (dispatch) => {
    dispatch(showNoti(message));

    timeoutID = setTimeout(() => {
      dispatch(hideNoti());
    }, timeout);
  };
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.message;
    case 'HIDE_NOTIFICATION':
      return null;

    default:
      return state;
  }
};

export default notificationReducer;
