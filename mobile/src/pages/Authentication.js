import React, { Component } from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";

import { statusColor, primaryColor } from "../styles/common";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

import { connect } from "react-redux";
import { getLoginInfo } from "../store/actions/userActions";

export class Authentication extends Component {
  componentDidMount() {
    this.props.dispatch(getLoginInfo());
  }

  componentDidUpdate() {
    if (this.props.loged) {
      this.props.navigation.navigate("Main");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={statusColor} />
        <Text>{this.props.loged}*</Text>
        {this.props.registering ? (
          <RegisterForm navigation={this.props.navigation} />
        ) : (
          <LoginForm navigation={this.props.navigation} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: "flex-end",
    alignItems: "center"
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

const mapStateToProps = state => ({
  loged: state.user.loged,
  registering: state.user.registering,
  loading: state.user.loading
});

export default connect(mapStateToProps)(Authentication);
