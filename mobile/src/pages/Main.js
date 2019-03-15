import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";

import Topbar from "../components/Topbar";
import NewCard from "../components/NewCard.js";
import { primaryColor, statusColor } from "../styles/common.js";

export default class Main extends Component {
  state = {
    loading: false
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
