import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import Transaction from "../components/Transaction";
import { TextMask } from "react-native-masked-text";
import { secundaryColor, lighColor } from "../styles/common.js";

import { connect } from "react-redux";
import { fetchTransactions } from "../store/actions/transactionsActions";

import SInfo from "react-native-sensitive-info";
import { ApiRequestToken } from "../services/api";

class NewCard extends Component {
  state = {
    loading: false,
    totalTransactionsValue: 0
  };

  async componentDidMount() {
    const userID = await this.getUserID();
    const apiToken = await this.requestToken();
    await this.props.dispatch(fetchTransactions(userID, apiToken));
    this.updateTransactions();
  }

  requestToken = async () => {
    const token = await ApiRequestToken();
    return token;
  };

  getUserID = async () => {
    const userID = await SInfo.getItem("userID", {});
    return userID;
  };

  updateTransactions = () => {
    let totalTransactionsValue = 0;
    this.props.transactions.map(transaction => {
      totalTransactionsValue = transaction.transactionType
        ? totalTransactionsValue + transaction.transactionValue
        : totalTransactionsValue - transaction.transactionValue;
    });
    this.setState({ totalTransactionsValue: totalTransactionsValue });
  };

  render() {
    const { error, transactions, loading } = this.props;

    return (
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.monthSelector}>MÊS</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <TextMask
              style={styles.cardHeadText}
              value={this.state.totalTransactionsValue}
              type={"money"}
            />
          </View>
          <View style={styles.cardBody}>
            <FlatList
              data={transactions}
              keyExtractor={transaction => transaction._id}
              renderItem={({ item }) => (
                <Transaction
                  transaction={item}
                  navigation={this.props.navigation}
                />
              )}
              onRefresh={this.props.refreshList}
              refreshing={loading}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    alignContent: "center",
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    flexDirection: "column"
  },
  monthSelector: {
    textAlign: "center",
    color: secundaryColor,
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "500"
  },
  card: {
    flex: 1
  },
  cardHead: {
    flex: 0.13,
    backgroundColor: secundaryColor,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  cardBody: {
    flex: 0.87,
    backgroundColor: lighColor,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    elevation: 3
  },
  cardHeadText: {
    color: lighColor,
    fontSize: 25,
    fontWeight: "600"
  }
});

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
  loading: state.transactions.loading,
  error: state.transactions.error
});

export default connect(mapStateToProps)(NewCard);
