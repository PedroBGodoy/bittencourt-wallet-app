import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import Transaction from "../components/Transaction";
import { secondaryColor, lighColor } from "../styles/common.js";

import { connect } from "react-redux";
import { fetchTransactions } from "../store/actions/transactionsActions";

class NewCard extends Component {
  state = {
    loading: false,
    month: "ABR"
  };

  async componentDidMount() {
    await this.requestTransactions();
  }

  requestTransactions = async () => {
    await this.props.dispatch(fetchTransactions(this.props.accessToken));
  };

  render() {
    const { transactions, loading } = this.props;

    return (
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.monthSelector}>{this.state.month}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.cardHeadText}>
              {this.props.totalTransactionsValue}
            </Text>
          </View>
          <View style={styles.cardBody}>
            {this.props.transactions && (
              <FlatList
                data={transactions}
                keyExtractor={transaction => transaction._id}
                renderItem={({ item }) => (
                  <Transaction
                    transaction={item}
                    navigation={this.props.navigation}
                    refreshList={this.requestTransactions}
                  />
                )}
                onRefresh={this.requestTransactions}
                refreshing={loading}
                showsVerticalScrollIndicator={false}
              />
            )}
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
    color: secondaryColor,
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "500"
  },
  card: {
    flex: 1
  },
  cardHead: {
    flex: 0.13,
    backgroundColor: secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
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
  error: state.transactions.error,
  accessToken: state.user.accessToken,
  totalTransactionsValue: state.transactions.totalTransactionsValue
});

export default connect(mapStateToProps)(NewCard);
