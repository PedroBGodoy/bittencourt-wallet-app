import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import Transaction from "../components/Transaction";

import { TextMask } from "react-native-masked-text";

import { secundaryColor, lighColor } from "../styles/common.js";

export default class NewCard extends Component {
  state = {
    transactions: [],
    loading: false,
    totalTransactionsValue: 0
  };

  componentDidMount() {
    this.updateTransactions();
  }

  updateTransactions = () => {
    this.setState({ transactions: this.props.transactions });
    let totalTransactionsValue = 0;
    this.props.transactions.map(transaction => {
      totalTransactionsValue = transaction.transactionType
        ? totalTransactionsValue + transaction.transactionValue
        : totalTransactionsValue - transaction.transactionValue;
    });
    this.setState({ totalTransactionsValue: totalTransactionsValue });
  };

  render() {
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
              data={this.state.transactions}
              keyExtractor={transaction => transaction._id}
              renderItem={({ item }) => (
                <Transaction
                  transaction={item}
                  refreshList={this.props.refreshList}
                  navigation={this.props.navigation}
                />
              )}
              onRefresh={this.props.refreshList}
              refreshing={this.state.loading}
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
