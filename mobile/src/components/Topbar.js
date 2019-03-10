import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import { lighColor } from "../styles/common.js";

export default class Topbar extends Component {
  goBack = () => {
    this.props.navigation.navigate("Accounts");
  };

  render() {
    const { topbar } = this.props;

    const title = topbar.title || "NULL";
    const rightButton = topbar.rightButton;
    const leftButton = topbar.leftButton;
    const rightMethod = topbar.rightMethod;
    const leftMethod = topbar.leftMethod;
    const rightIcon = topbar.rightIcon;
    const leftIcon = topbar.leftIcon;

    return (
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          {leftButton && (
            <TouchableOpacity onPress={leftMethod}>
              <Icon name={leftIcon} size={24} color={lighColor} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.topBarCenter}>
          <Text style={styles.topBarCenterText}>{title}</Text>
        </View>

        <View style={styles.topBarRight}>
          {rightButton && (
            <TouchableOpacity onPress={rightMethod}>
              <Icon name={rightIcon} size={24} color={lighColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    height: 80,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    flex: 0.1
  },
  topBarCenter: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  topBarRight: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  topBarLeft: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  topBarCenterText: {
    color: "#F8F8F8",
    fontSize: 16,
    fontWeight: "100"
  }
});
