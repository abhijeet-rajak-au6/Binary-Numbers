import { REMOVE_ALERT, SET_ALERT } from "../ActionTypes";

export const setAlert = (message, messageType) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        message,
        messageType,
      },
    });
  });
};

export const removeAlert = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: REMOVE_ALERT,
    });
  });
};
