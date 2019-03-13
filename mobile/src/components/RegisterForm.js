import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  BackHandler
} from "react-native";

import { connect } from "react-redux";

import {
  primaryColor,
  darkBlue,
  lighColor,
  errorColor
} from "../styles/common";
import { register, registerFormToggle } from "../store/actions/userActions";

export class RegisterForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleRegisterBtn = async () => {
    if (this.checkInput()) {
      await this.props.dispatch(
        register(this.state.name, this.state.email, this.state.password)
      );
    }
  };

  handleBackButton = () => {
    this.props.dispatch(registerFormToggle());
    return true;
  };

  checkInput = () => {
    if (this.state.password === this.state.passwordConfirmation) {
      return true;
    }
  };

  handleNameChange = name => {
    this.setState({ name });
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handlePasswordConfirmationChange = passwordConfirmation => {
    this.setState({ passwordConfirmation });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{this.props.error}</Text>
        <View style={styles.horizontalWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Nome"
            onChangeText={this.handleNameChange}
            value={this.state.name}
          />
        </View>
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
          <TextInput
            style={styles.textInput}
            placeholder="Confirmar Senha"
            onChangeText={this.handlePasswordConfirmationChange}
            value={this.state.passwordConfirmation}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.horizontalWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleRegisterBtn}
          >
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleBackButton}
          >
            <Text style={styles.buttonText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>
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
  }
});

const mapStateToProps = state => ({
  error: state.user.error
});

export default connect(mapStateToProps)(RegisterForm);
