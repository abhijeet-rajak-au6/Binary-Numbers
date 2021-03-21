import axios from "axios";
import { keys } from "../config";
import {
  USER_LOGIN,
  USER_LOGOUT,
  ALL_USER_BALNACE,
  ALL_USER_BALNACE_ERR,
  SET_TRANSACTION,
  SET_ALERT,
  REMOVE_ALERT,
  SET_USER_TRANSACTION,
  SET_BALANCE,
} from "../ActionTypes";
import { setAlert, removeAlert } from "../actions/alertAction";

export const userLogin = (userLoginCredentials) => async (dispatch) => {

  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`${keys.BASE_URL_LOCAL}/login`, {
        ...userLoginCredentials,
      });

      dispatch({
        type: USER_LOGIN,
        payload: data,
      });
      console.log(data);
      resolve(data.message);
    } catch (err) {
      console.log(err.response.data.message);
      reject(err.response.data.message);
    }
  });
};

export const userRegister = (registerCtredentials) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`${keys.BASE_URL_LOCAL}/register`, {
        ...registerCtredentials,
      });
      console.log(data);
      resolve(data.message);
    } catch (err) {
      console.log(err.response);
      reject(err.response.data.message);
    }
  });
};

export const userLogout = () => async (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const acessToken = getState().userState.user.token;
    try {
      const { data } = await axios.delete(`${keys.BASE_URL_LOCAL}/logout`, {
        headers: {
          Authorization: `${acessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: USER_LOGOUT,
      });
      resolve(data.message);
    } catch (err) {
      console.log(err);
      dispatch({
        type: USER_LOGOUT,
      });
      // reject(err.response.data.message);
    }
  });
};

export const listAllUserBalance = () => async (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const acessToken = getState().userState.user.token;
    try {
      const { data } = await axios.get(
        `${keys.BASE_URL_LOCAL}/sell-alluser-transaction`,
        {
          headers: {
            Authorization: `${acessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: ALL_USER_BALNACE,
        payload: data.userdetails,
      });
    } catch (err) {
      // dispatch({
      //   type: USER_LOGOUT,
      // });
      dispatch({
        type: ALL_USER_BALNACE_ERR,
        payload: err.response.data.message,
      });
      reject(err.response.data);
    }
  });
};

export const depositmoney = (money) => async (dispatch, getState) => {
  try {
    const acessToken = getState().userState.user.token;
    const { data } = await axios.post(
      `${keys.BASE_URL_LOCAL}/deposit-money`,
      {
        deposited: parseInt(money),
      },
      {
        headers: {
          Authorization: `${acessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: SET_ALERT,
      payload: {
        message: data.message,
        messageType: "success",
      },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
      });
    }, 3000);
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ALERT,
      payload: {
        message: err.response.data.message,
        messageType: "error",
      },
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
      });
    }, 3000);
  }
};

export const withdrawMoney = (money) => async (dispatch, getState) => {
  try {
    const acessToken = getState().userState.user.token;
    const { data } = await axios.post(
      `${keys.BASE_URL_LOCAL}/withdraw-money`,
      {
        withdraw: parseInt(money),
      },
      {
        headers: {
          Authorization: `${acessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: SET_ALERT,
      payload: {
        message: data.message,
        messageType: "success",
      },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
      });
    }, 3000);
  } catch (err) {
    if (err.response.data.message === "jwt expired") {
      dispatch({
        type: USER_LOGOUT,
      });
    } else {
      dispatch({
        type: SET_ALERT,
        payload: {
          message: err.response.data.message,
          messageType: "error",
        },
      });
      setTimeout(() => {
        dispatch({
          type: REMOVE_ALERT,
        });
      }, 3000);
    }
  }
};

export const getUserTransaction = (id) => async (dispatch, getState) => {
  try {
    const acessToken = getState().userState.user.token;
    const { data } = await axios.get(
      `${keys.BASE_URL_LOCAL}/get-user-transaction/${id}`,
      {
        headers: {
          Authorization: `${acessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: SET_USER_TRANSACTION,
      payload: data.userTransaction,
    });
  } catch (err) {
    dispatch({
      type: SET_USER_TRANSACTION,
      payload: null,
    });
    
  }
};

export const getLoggedInUserTransaction = () => async (dispatch, getState) => {
  try {
    const acessToken = getState().userState.user.token;
    const { data } = await axios.get(
      `${keys.BASE_URL_LOCAL}/see-my-transaction`,
      {
        headers: {
          Authorization: `${acessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: SET_USER_TRANSACTION,
      payload: data.AllTransactions,
    });
  } catch (err) {
    dispatch({
      type: SET_USER_TRANSACTION,
      payload: null,
    });
  }
};

export const getBalance = () => async (dispatch, getState) => {
  try {
    const acessToken = getState().userState.user.token;
    const { data } = await axios.get(`${keys.BASE_URL_LOCAL}/me`, {
      headers: {
        Authorization: `${acessToken}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: SET_BALANCE,
      payload: data.balance,
    });
  } catch (err) {
    dispatch({
      type: SET_BALANCE,
      payload: null,
    });
  }
};

// export const listAllTransaction = ()=>async(dispath, getState)=>{
//   const acessToken = getState().userState.user.token;
//   console.log(acessToken);
//   try {
//     const { data } = await axios.get(`${keys.BASE_URL_LOCAL}/sell-alluser-transaction`, {
//       headers: {
//         Authorization: `${acessToken}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(data);
//     dispatch({
//       type: ALL_USER_BALNACE,
//       payload:data.userdetails
//     });
//   }catch(err){

//   }
// }
