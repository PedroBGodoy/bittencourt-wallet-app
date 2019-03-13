import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";

import { ApiHandleDeleteTransaction } from "../services/api";

import { lighColor } from "../styles/common.js";

import { TextMask } from "react-native-masked-text";
import { deleteTransaction } from "../store/actions/transactionsActions";

export class Transaction extends Component {
  render() {
    const { transaction } = this.props;
    const day = parseDate(transaction.madeAt);

    function parseDate(date) {
      let split = date.split("T");
      let day = split[0].split("-");
      let time = split[1].split(":", 2);
      let ret =
        day[2] + "/" + day[1] + "/" + day[0] + ", " + time[0] + ":" + time[1];
      return ret;
    }

    async function handleDeleteButtonPress(id) {
      await this.handleDeleteTransaction(id);
      //this.refreshList();
    }

    function handleEditButtonPress(data) {
      this.handleEditButton(data);
    }

    handleDeleteTransaction = async id => {
      await this.props.dispatch(deleteTransaction(this.props.accessToken, id));
    };

    handleEditButton = data => {
      this.props.navigation.navigate("EditTransaction", {
        description: data.description,
        value: data.value.toString(),
        type: data.type,
        id: data._id
      });
    };

    refreshList = () => {
      this.props.refreshList();
    };

    let swipeButtons = [
      {
        text: "Editar",
        backgroundColor: "#C8C8C8",
        onPress: () => {
          handleEditButtonPress(this.props.transaction);
        }
      },
      {
        text: "Deletar",
        backgroundColor: "#959595",
        onPress: () => {
          handleDeleteButtonPress(this.props.transaction._id);
        }
      }
    ];

    return (
      <Swipeout
        right={swipeButtons}
        backgroundColor={lighColor}
        autoClose={true}
        style={styles.swipeBox}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.centerBox}>
              <Text style={styles.description}>{transaction.description}</Text>
              <Text style={styles.date}>{day}</Text>
            </View>

            <View style={styles.rightBox}>
              <View style={styles.icon} />
              <TextMask
                style={
                  transaction.type ? styles.valuePositive : styles.valueNegative
                }
                type={"money"}
                value={transaction.value}
              />
            </View>
          </View>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#D4D4D4"
  },
  swipeBox: {
    flex: 1
  },
  content: {
    backgroundColor: lighColor,
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10
  },
  description: {
    color: "#000000",
    marginLeft: 20,
    fontSize: 15,
    fontWeight: "bold"
  },
  date: {
    color: "#787878",
    marginLeft: 20,
    fontSize: 12
  },
  valuePositive: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2BAB40",
    paddingTop: 10
  },
  valueNegative: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#C52929",
    paddingTop: 10
  },
  centerBox: {
    flex: 0.7
  },
  rightBox: {
    flex: 0.3,
    flexDirection: "row"
  },
  icon: {
    height: 10,
    width: 10,
    paddingTop: 15,
    paddingRight: 3
  }
});

const mapStateToProps = state => ({
  accessToken: state.user.accessToken
});

export default connect(mapStateToProps)(Transaction);
