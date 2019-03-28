import {
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_ERROR,
  DELETE_TRANSACTIONS_BEGIN,
  DELETE_TRANSACTIONS_SUCCESS,
  DELETE_TRANSACTIONS_ERROR,
  UPDATE_TRANSACTIONS_BEGIN,
  UPDATE_TRANSACTIONS_SUCCESS,
  UPDATE_TRANSACTIONS_ERROR,
  ADD_TRANSACTIONS_BEGIN,
  ADD_TRANSACTIONS_SUCCESS,
  ADD_TRANSACTIONS_ERROR,
  CLEAR_TRANSACTIONS
} from "../actions/transactionsActions";

const initialState = {
  transactions: [],
  loading: false,
  error: "",
  totalTransactionsValue: 0
};

function calculateTotalTransactionsValue(transactions) {
  let res = 0;
  transactions.map(transaction => {
    res = transaction.type ? res + transaction.value : res - transaction.value;
  });
  return res;
}

function formatTransactionsValue(value) {
  let prefix = "R$";
  let signal = value < 0 ? "-" : "";
  let valueReturn = Math.abs(Math.floor(value));
  let decimals = value
    .toFixed(2)
    .toString()
    .split(".")[1];
  decimals = decimals === undefined ? "00" : decimals;
  return signal + prefix + valueReturn + "." + decimals;
}

function removeTransactionFromArray(transactionID, transactions) {
  return transactions.filter(transaction => {
    return transaction._id !== transactionID;
  });
}

function handleErrorMessage(error) {
  let errorReturn = "";
  if (error.response) {
    if (error.response.status === 400) {
      errorReturn = error.response.data.error;
    } else {
      errorReturn = "Erro desconhecido!";
    }
  } else {
    errorReturn = "Erro desconhecido!";
  }
  console.log(error);
  return errorReturn;
}

export default function transactionsReducer(state = initialState, action) {
  let errorMessage = "";
  let totalTransactionsValue = 0;
  let transactions = [];

  switch (action.type) {
    case FETCH_TRANSACTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      transactions = action.payload.transactions.data;
      totalTransactionsValue = calculateTotalTransactionsValue(transactions);
      totalTransactionsValue = formatTransactionsValue(totalTransactionsValue);
      return {
        ...state,
        loading: false,
        transactions: transactions,
        totalTransactionsValue: totalTransactionsValue
      };
    case FETCH_TRANSACTIONS_ERROR:
      errorMessage = handleErrorMessage(action.payload.error);
      return {
        ...state,
        loading: false,
        error: errorMessage,
        transactions: []
      };

    case DELETE_TRANSACTIONS_BEGIN:
      return {
        ...state,
        error: null,
        loading: true
      };
    case DELETE_TRANSACTIONS_SUCCESS:
      transactions = removeTransactionFromArray(
        action.payload.transaction.data._id,
        state.transactions
      );
      totalTransactionsValue = calculateTotalTransactionsValue(transactions);
      totalTransactionsValue = formatTransactionsValue(totalTransactionsValue);
      return {
        ...state,
        transactions: transactions,
        loading: false,
        totalTransactionsValue: totalTransactionsValue
      };
    case DELETE_TRANSACTIONS_ERROR:
      errorMessage = handleErrorMessage(action.payload.error);

      return {
        ...state,
        error: errorMessage,
        loading: false
      };

    case UPDATE_TRANSACTIONS_BEGIN:
      return {
        ...state,
        error: null,
        loading: true
      };
    case UPDATE_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case UPDATE_TRANSACTIONS_ERROR:
      errorMessage = handleErrorMessage(action.payload.error);

      return {
        ...state,
        error: errorMessage,
        loading: false
      };

    case ADD_TRANSACTIONS_BEGIN:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ADD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        //transactions: state.transactions.push(action.payload.transaction.data),
        loading: false
      };
    case ADD_TRANSACTIONS_ERROR:
      errorMessage = handleErrorMessage(action.payload.error);

      return {
        ...state,
        error: errorMessage,
        loading: false
      };

    case CLEAR_TRANSACTIONS:
      return {
        ...state,
        transactions: [],
        loading: false,
        error: "",
        totalTransactionsValue: 0
      };

    default:
      return state;
  }
}
