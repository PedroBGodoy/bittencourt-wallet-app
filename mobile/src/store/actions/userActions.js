export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";
export const USER_BEGIN = "USER_BEGIN";
export const USER_TOGGLE_REGISTER_FORM = "USER_TOGGLE_REGISTER_FORM";
export const USER_LOG_OUT = "USER_LOG_OUT";
export const USER_GET_LOGIN = "USER_GET_LOGIN";

import { ApiHandleLogin, ApiHandleRegister } from "../../services/api";
import { AsyncStorage } from "react-native";

export function login(email, password) {
  return async dispatch => {
    dispatch(authenticationBegin());
    try {
      const res = await ApiHandleLogin(email, password);

      await AsyncStorage.multiSet([
        ["@Wallet:email", res.user.email],
        ["@Wallet:name", res.user.name],
        ["@Wallet:token", res.token]
      ]);

      dispatch(authenticationSuccess(res));
    } catch (err) {
      dispatch(authenticationError(err));
    }
  };
}

export function register(name, email, password) {
  return async dispatch => {
    dispatch(authenticationBegin());
    try {
      const res = await ApiHandleRegister(name, email, password);
      dispatch(authenticationSuccess(res));
    } catch (err) {
      dispatch(authenticationError(err));
    }
  };
}

export function logout() {
  return async dispatch => {
    await AsyncStorage.multiSet([
      ["@Wallet:email", ""],
      ["@Wallet:name", ""],
      ["@Wallet:token", ""]
    ]);

    dispatch(logoutDispatcher());
  };
}

export function registerFormToggle() {
  return dispatch => {
    dispatch(registerFormToggleDispatcher());
  };
}

export function getLoginInfo() {
  return async dispatch => {
    dispatch(authenticationBegin());

    let email = "";
    let name = "";
    let token = "";
    let firstTime = false;
    let loged = false;
    await AsyncStorage.multiGet(
      ["@Wallet:email", "@Wallet:name", "@Wallet:token"],
      (err, response) => {
        if (!err) {
          email = response[0][1];
          name = response[1][1];
          token = response[2][1];
        } else {
          console.log(err);
          firstTime = true;
        }
      }
    );

    if (!firstTime && token != "") {
      loged = true;
    } else {
      loged = false;
    }

    const userReturn = JSON.parse(
      `{"email": "${email}",
       "name": "${name}",
       "token": "${token}",
       "loged": ${loged}}`
    );

    dispatch(getLoginInfoDispatcher(userReturn));
  };
}

export const authenticationBegin = () => ({
  type: USER_BEGIN
});

export const authenticationSuccess = user => ({
  type: USER_SUCCESS,
  payload: { user }
});

export const authenticationError = error => ({
  type: USER_ERROR,
  payload: { error }
});

export const registerFormToggleDispatcher = () => ({
  type: USER_TOGGLE_REGISTER_FORM
});

export const logoutDispatcher = () => ({
  type: USER_LOG_OUT
});

export const getLoginInfoDispatcher = user => ({
  type: USER_GET_LOGIN,
  payload: { user }
});
