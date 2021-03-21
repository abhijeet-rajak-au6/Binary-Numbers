import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  ALL_USER_BALNACE,
  ALL_USER_BALNACE_ERR,
  SET_USER_TRANSACTION,
  SET_BALANCE
} from "../ActionTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  allUserBalance: null,
  allUserBalanceErr: null,
  transactionMessage: null,
  userTransaction: null,
  balance: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
      };
    case USER_LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        allUserBalance: null,
        allUserBalanceErr: null,
        transactionMessage: null,
        userTransaction: null,
      };
    case ALL_USER_BALNACE:
      return {
        ...state,
        allUserBalance: payload,
      };
    case ALL_USER_BALNACE_ERR:
      return {
        ...state,
        allUserBalanceErr: payload,
      };

    case SET_USER_TRANSACTION: {
      return {
        ...state,
        userTransaction: payload,
      };
    }
    case SET_BALANCE: {
      console.log(payload)
      return {
        ...state,
        balance: payload,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
