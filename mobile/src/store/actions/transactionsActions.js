export const FETCH_TRANSACTIONS_BEGIN = "FETCH_TRANSACTIONS_BEGIN";
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
export const FETCH_TRANSACTIONS_ERROR = "FETCH_TRANSACTIONS_ERROR";

export const DELETE_TRANSACTIONS_BEGIN = "DELETE_TRANSACTIONS_BEGIN";
export const DELETE_TRANSACTIONS_SUCCESS = "DELETE_TRANSACTIONS_SUCCESS";
export const DELETE_TRANSACTIONS_ERROR = "DELETE_TRANSACTIONS_ERROR";

export const UPDATE_TRANSACTIONS_BEGIN = "UPDATE_TRANSACTIONS_BEGIN";
export const UPDATE_TRANSACTIONS_SUCCESS = "UPDATE_TRANSACTIONS_SUCCESS";
export const UPDATE_TRANSACTIONS_ERROR = "UPDATE_TRANSACTIONS_ERROR";

export const ADD_TRANSACTIONS_BEGIN = "ADD_TRANSACTIONS_BEGIN";
export const ADD_TRANSACTIONS_SUCCESS = "ADD_TRANSACTIONS_SUCCESS";
export const ADD_TRANSACTIONS_ERROR = "ADD_TRANSACTIONS_ERROR";

import {
  ApiRequestData,
  ApiHandleDeleteTransaction,
  ApiHandleNewTransaction,
  ApiHandleUpdateTransaction
} from "../../services/api";

export function fetchTransactions(accessToken) {
  return async dispatch => {
    dispatch(fetchTransactionsBegin());
    try {
      const res = await ApiRequestData(accessToken);
      dispatch(fetchTransactionsSuccess(res));
    } catch (err) {
      dispatch(fetchTransactionsError(err));
    }
  };
}

export function deleteTransaction(accessToken, id) {
  return async dispatch => {
    dispatch(deleteTransactionBegin());
    try {
      const res = await ApiHandleDeleteTransaction(id, accessToken);
      dispatch(deleteTransactionSuccess(res));
    } catch (err) {
      dispatch(deleteTransactionError(err));
    }
  };
}

export function updateTransaction(accessToken, id, description, value, type) {
  return async dispatch => {
    dispatch(updateTransactionBegin());
    try {
      const res = await ApiHandleUpdateTransaction(
        id,
        accessToken,
        description,
        value,
        type
      );
      dispatch(updateTransactionSuccess(res));
    } catch (err) {
      dispatch(updateTransactionError(err));
    }
  };
}

export function addTransaction(accessToken, description, value, type) {
  return async dispatch => {
    dispatch(addTransactionBegin());
    try {
      const res = await ApiHandleNewTransaction(
        accessToken,
        description,
        value,
        type
      );
      dispatch(addTransactionSuccess(res));
    } catch (err) {
      dispatch(addTransactionError(err));
    }
  };
}

export const fetchTransactionsBegin = () => ({
  type: FETCH_TRANSACTIONS_BEGIN
});
export const fetchTransactionsSuccess = transactions => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: { transactions }
});

export const fetchTransactionsError = error => ({
  type: FETCH_TRANSACTIONS_ERROR,
  payload: { error }
});

export const deleteTransactionBegin = () => ({
  type: DELETE_TRANSACTIONS_BEGIN
});
export const deleteTransactionSuccess = transaction => ({
  type: DELETE_TRANSACTIONS_SUCCESS,
  payload: { transaction }
});
export const deleteTransactionError = error => ({
  type: DELETE_TRANSACTIONS_ERROR,
  payload: { error }
});

export const updateTransactionBegin = () => ({
  type: UPDATE_TRANSACTIONS_BEGIN
});
export const updateTransactionSuccess = transaction => ({
  type: UPDATE_TRANSACTIONS_SUCCESS,
  payload: { transaction }
});
export const updateTransactionError = error => ({
  type: UPDATE_TRANSACTIONS_ERROR,
  payload: { error }
});

export const addTransactionBegin = () => ({
  type: ADD_TRANSACTIONS_BEGIN
});
export const addTransactionSuccess = transaction => ({
  type: ADD_TRANSACTIONS_SUCCESS,
  payload: { transaction }
});
export const addTransactionError = error => ({
  type: ADD_TRANSACTIONS_ERROR,
  payload: { error }
});
