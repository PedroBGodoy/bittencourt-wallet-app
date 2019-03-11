export const FETCH_TRANSACTIONS_BEGIN = "FETCH_TRANSACTIONS_BEGIN";
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
export const FETCH_TRANSACTIONS_ERROR = "FETCH_TRANSACTIONS_ERROR";

import { ApiRequestData } from "../../services/api";

export function fetchTransactions(apiToken, userID) {
  return async dispatch => {
    dispatch(fetchTransactionsBegin());
    try {
      const res = await ApiRequestData(apiToken, userID);
      dispatch(fetchTransactionsSuccess(res));
    } catch (err) {
      dispatch(fetchTransactionsError(err));
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
