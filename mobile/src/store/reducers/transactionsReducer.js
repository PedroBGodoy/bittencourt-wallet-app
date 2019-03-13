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
  ADD_TRANSACTIONS_ERROR
} from "../actions/transactionsActions";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
  totalTransactionsValue: 0
};

function calculateTotalTransactionsValue(transactions) {
  let res = 0;
  transactions.map(transaction => {
    res = transaction.type ? res + transaction.value : res - transaction.value;
  });
  return res;
}

function removeTransactionFromArray(transactionID, transactions) {
  return transactions.filter(transaction => {
    return transaction._id !== transactionID;
  });
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
      return {
        ...state,
        loading: false,
        transactions: transactions,
        totalTransactionsValue: totalTransactionsValue
      };
    case FETCH_TRANSACTIONS_ERROR:
      const errorFetch = action.payload.error;
      if (errorFetch.response) {
        if (
          errorFetch.response.status === 400 ||
          errorADD.response.status === 401
        ) {
          errorMessage = errorFetch.response.data.error;
        } else {
          errorMessage = "Erro desconhecido!";
        }
      } else {
        errorMessage = "Erro desconhecido!";
      }
      console.log(errorMessage);
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
      return {
        ...state,
        transactions: transactions,
        loading: false,
        totalTransactionsValue: totalTransactionsValue
      };
    case DELETE_TRANSACTIONS_ERROR:
      const errorDelete = action.payload.error;
      if (errorDelete.response) {
        if (
          errorDelete.response.status === 400 ||
          errorADD.response.status === 401
        ) {
          errorMessage = errorDelete.response.data.error;
        } else {
          errorMessage = "Erro desconhecido!";
        }
      } else {
        errorMessage = "Erro desconhecido!";
      }
      console.log(errorMessage);
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
        // transactions: state.transactions.map(transaction => {
        //   transaction =
        //     transaction._id === action.payload.transaction.data._id
        //       ? action.payload.transaction.data
        //       : transaction;
        // }),
        loading: false
      };
    case UPDATE_TRANSACTIONS_ERROR:
      const errorUpdate = action.payload.error;
      if (errorUpdate.response) {
        if (
          errorUpdate.response.status === 400 ||
          errorADD.response.status === 401
        ) {
          errorMessage = errorUpdate.response.data.error;
        } else {
          errorMessage = "Erro desconhecido!";
        }
      } else {
        errorMessage = "Erro desconhecido!";
      }
      console.log(errorMessage);
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
      console.log("ERROR ADD TRANSACION");
      const errorADD = action.payload.error;
      if (errorADD.response) {
        if (
          errorADD.response.status === 400 ||
          errorADD.response.status === 401
        ) {
          errorMessage = errorADD.response.data.error;
        } else {
          errorMessage = "Erro desconhecido!";
        }
      } else {
        errorMessage = "Erro desconhecido!";
      }
      console.log(errorADD);
      return {
        ...state,
        error: errorMessage,
        loading: false
      };

    default:
      return state;
  }
}
