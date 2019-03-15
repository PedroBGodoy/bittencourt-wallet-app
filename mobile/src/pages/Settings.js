import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from "react-native";

import Topbar from "../components/Topbar";
import { primaryColor, statusColor } from "../styles/common.js";
import { connect } from "react-redux";
import { logout } from "../store/actions/userActions";
import { clearTransactions } from "../store/actions/transactionsActions";

export class Settings extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.goBack();
    return true;
  };

  goBack = () => {
    this.props.navigation.navigate("Main");
  };

  goToLogin = () => {
    this.props.navigation.navigate("Authentication");
  };

  handleLogout = () => {
    this.props.dispatch(logout());
    this.props.dispatch(clearTransactions());
    this.goToLogin();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={statusColor} />
        <Topbar
          topbar={{
            title: "Settings",
            leftButton: true,
            leftIcon: "arrow-left",
            leftMethod: this.goBack
          }}
          navigation={this.props.navigation}
        />

        <TouchableOpacity onPress={this.handleLogout}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor
  },
  item: {
    height: 60,
    backgroundColor: "#323C57",
    justifyContent: "center",
    padding: 20
  },
  itemText: {
    color: "#FFFFFF"
  }
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Settings);
