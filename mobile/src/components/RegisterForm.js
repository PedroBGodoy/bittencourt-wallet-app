import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

import {
  borderColor,
  errorColor,
  darkColor,
  secondaryColor
} from "../styles/common";
import { register, registerFormToggle } from "../store/actions/userActions";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export class RegisterForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    error: ""
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleRegisterBtn = async () => {
    if (!this.validateInput()) {
      await this.props.dispatch(
        register(this.state.name, this.state.email, this.state.password)
      );
      if (this.props.loged) {
        this.props.navigation.navigate("Main");
      }
    } else {
      this.setState({ error: this.validateInput() });
    }
  };

  handleBackButton = () => {
    this.props.dispatch(registerFormToggle());
    return true;
  };

  validateInput = () => {
    const { email, password, passwordConfirmation, name } = this.state;

    if (name.trim() === "") {
      return "Por favor preencha seu nome!";
    }

    if (name.trim().length < 3) {
      return "Seu nome deve conter no mínimo 3 letras!";
    }

    if (email.trim() === "") {
      return "Por favor preencha seu email!";
    }

    if (!validateEmail(email)) {
      return "Email inválido!";
    }

    if (password.trim() === "") {
      return "Por favor preencha sua senha!";
    }

    if (password.trim().length < 5) {
      return "Sua senha deve conter no mínimo 5 dígitos!";
    }

    if (password !== passwordConfirmation) {
      return "Sua senha e confirmação são diferentes!";
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
    if (this.props.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" style={styles.activityIndicator} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Wallet</Text>
          <Text style={styles.errorText}>
            {this.props.error || this.state.error}
          </Text>
          <View style={styles.horizontalWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Nome"
              onChangeText={this.handleNameChange}
              value={this.state.name}
              maxLength={16}
              placeholderTextColor="#FFFFFF"
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
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <View style={styles.horizontalWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Senha"
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              secureTextEntry={true}
              maxLength={16}
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <View style={styles.horizontalWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Confirmar Senha"
              onChangeText={this.handlePasswordConfirmationChange}
              value={this.state.passwordConfirmation}
              secureTextEntry={true}
              maxLength={16}
              placeholderTextColor="#FFFFFF"
            />
          </View>

          <View style={styles.horizontalWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleRegisterBtn}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.horizontalWrapper}>
            <Text style={styles.text}>Have an account? </Text>
            <TouchableOpacity onPress={this.handleBackButton}>
              <Text style={styles.clickText}>Sign In</Text>
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
    height: 60,
    flex: 0.8,
    backgroundColor: secondaryColor,
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
    marginBottom: 20
  },
  textInput: {
    height: 60,
    flex: 0.8,
    backgroundColor: darkColor,
    borderRadius: 3,
    borderColor: borderColor,
    borderWidth: 1,
    padding: 15,
    color: "#FFFFFF"
  },
  errorText: {
    color: errorColor
  },
  activivityIndicator: {
    paddingTop: 150
  },
  text: {
    color: "#FFF"
  },
  clickText: {
    color: secondaryColor
  },
  title: {
    color: "#FFF",
    fontSize: 65,
    marginTop: 50,
    marginBottom: 25,
    fontFamily: "Caveat-Bold"
  }
});

const mapStateToProps = state => ({
  error: state.user.error,
  loading: state.user.loading,
  loged: state.user.loged
});

export default connect(mapStateToProps)(RegisterForm);
