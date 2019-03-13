export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";
export const USER_BEGIN = "USER_BEGIN";
export const USER_TOGGLE_REGISTER_FORM = "USER_TOGGLE_REGISTER_FORM";
export const USER_LOG_OUT = "USER_LOG_OUT";

import { ApiHandleLogin, ApiHandleRegister } from "../../services/api";

export function login(email, password) {
  return async dispatch => {
    dispatch(authenticationBegin());
    try {
      const res = await ApiHandleLogin(email, password);
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
    dispatch(logoutDispatcher());
  };
}

export function registerFormToggle() {
  return dispatch => {
    dispatch(registerFormToggleDispatcher());
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
