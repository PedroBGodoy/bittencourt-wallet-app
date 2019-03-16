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
  primaryColor,
  darkBlue,
  lighColor,
  errorColor
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
              maxLength={16}
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
  },
  activityIndicator: {
    padding: 150
  }
});

const mapStateToProps = state => ({
  error: state.user.error,
  loading: state.user.loading,
  loged: state.user.loged
});

export default connect(mapStateToProps)(RegisterForm);
