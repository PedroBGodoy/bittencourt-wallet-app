import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";

import { statusColor, primaryColor } from "../styles/common";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { connect } from "react-redux";

export class Authentication extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar backgroundColor={statusColor} />

        <Text style={styles.title}>WalletAPP</Text>

        {(!this.props.registering && (
          <LoginForm navigation={this.props.navigation} />
        )) || <RegisterForm navigation={this.props.navigation} />}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    color: "#FFF",
    fontSize: 45,
    margin: 50
  }
});

const mapStateToProps = state => ({
  loged: state.user.loged,
  registering: state.user.registering
});

export default connect(mapStateToProps)(Authentication);
