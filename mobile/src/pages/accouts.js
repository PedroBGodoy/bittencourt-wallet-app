import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import SInfo from "react-native-sensitive-info";

import Topbar from "../components/Topbar";
import Card from "../components/Card";
import Transaction from "../components/Transaction";
import AddTransactionButton from "../components/AddTransactionButton";
import NewCard from "../components/NewCard.js";

import { ApiRequestToken, ApiRequestData } from "../services/api";

import { primaryColor, statusColor } from "../styles/common.js";

export default class accouts extends Component {
  state = {
    transactions: [],
    name: "",
    userID: "",
    isFetching: false,
    loading: true,
    apiToken: ""
  };

  async componentDidMount() {
    const name = await AsyncStorage.getItem("@WalletApp:name");
    this.setState({ name: name });

    await this.getUserID();

    //await this.requestToken().then(res => this.requestData(res));

    this.setState({ loading: false });
  }

  getUserID = async () => {
    const userID = await SInfo.getItem("userID", {});
    this.setState({ userID: userID });
  };

  refreshList = () => {
    this.requestData();
  };

  requestToken = async () => {
    const token = await ApiRequestToken();
    this.setState({ apiToken: token });
    await SInfo.setItem("apiToken", token, {});
  };

  requestData = async () => {
    this.setState({ isFetching: true });
    const transactions = await ApiRequestData(
      this.state.userID,
      this.state.apiToken
    );
    this.setState({ transactions: transactions });
    this.setState({ isFetching: false });
  };

  handleSettings = () => {
    this.props.navigation.navigate("Settings");
  };

  handleNewTransactionButton = () => {
    this.props.navigation.navigate("NewTransaction");
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <StatusBar backgroundColor={statusColor} />

          <ActivityIndicator
            size="large"
            color="#05a5d1"
            animating={!this.state.hasInitialized}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={statusColor} />

          <Topbar
            topbar={{
              leftButton: true,
              leftIcon: "sliders-h",
              leftMethod: this.handleSettings,

              title: "Transações",

              rightButton: true,
              rightIcon: "plus",
              rightMethod: this.handleNewTransactionButton
            }}
            navigation={this.props.navigation}
          />

          <NewCard
            transactions={this.state.transactions}
            navigation={this.props.navigation}
            refreshList={this.refreshList}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor
  },
  swiperWrapper: {
    height: 230
  },
  activityContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  activityContent: {
    flex: 0.9
  },
  activityTitle: {
    fontSize: 18,
    color: "#F8F8F8",
    marginBottom: 10,
    marginLeft: 30,
    fontWeight: "100"
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryColor,
    flex: 1
  }
});
