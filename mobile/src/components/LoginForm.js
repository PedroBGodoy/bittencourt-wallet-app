import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

import { darkBlue, lighColor, errorColor } from "../styles/common";
import { login, registerFormToggle } from "../store/actions/userActions";

export class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleLoginBtn = async () => {
    await this.props.dispatch(login(this.state.email, this.state.password));
    if (this.props.loged) {
      this.props.navigation.navigate("Main");
    }
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleRegisterButton = () => {
    this.props.dispatch(registerFormToggle());
  };

  render() {
    if (this.props.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" style={styles.activivityIndicator} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>{this.props.error}</Text>
          <View style={styles.horizontalWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={this.handleEmailChange}
              value={this.state.email}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          </View>
          <View style={styles.horizontalWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Senha"
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.horizontalWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleLoginBtn}
            >
              <Text style={styles.buttonText}>LOGAR</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleRegisterButton}
            >
              <Text style={styles.buttonText}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  button: {
    height: 50,
    flex: 0.8,
    backgroundColor: darkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    elevation: 3
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18
  },
  horizontalWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 10
  },
  textInput: {
    height: 50,
    flex: 0.8,
    backgroundColor: lighColor,
    borderRadius: 3,
    borderColor: "#D4D4D4",
    elevation: 3
  },
  errorText: {
    color: errorColor
  },
  activivityIndicator: {
    paddingTop: 150
  }
});

const mapStateToProps = state => ({
  error: state.user.error,
  loged: state.user.loged,
  loading: state.user.loading
});

export default connect(mapStateToProps)(LoginForm);
