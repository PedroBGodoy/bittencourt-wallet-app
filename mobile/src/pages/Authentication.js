import React, { Component } from "react";
import { StyleSheet, StatusBar, View } from "react-native";

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
      <View style={styles.container} behavior="padding">
        <StatusBar backgroundColor={statusColor} />
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
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  loged: state.user.loged,
  registering: state.user.registering
});

export default connect(mapStateToProps)(Authentication);
