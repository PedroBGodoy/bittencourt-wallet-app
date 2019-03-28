import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import Topbar from "../components/Topbar";
import { addTransaction } from "../store/actions/transactionsActions";
import { TextInputMask } from "react-native-masked-text";

import { primaryColor, statusColor, lighColor } from "../styles/common.js";

export class newTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionDescription: "",
      transactionValue: 0,
      transactionType: "true",
      user: "",
      apiToken: "",
      showValue: "R$00,00"
    };

    this.rawValueRef = undefined;
  }

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

  goBack = async () => {
    this.props.navigation.navigate("Main");
  };

  handleAddNewTransaction = async () => {
    if (this.checkInput()) {
      await this.props.dispatch(
        addTransaction(
          this.props.accessToken,
          this.state.transactionDescription,
          this.rawValueRef.getRawValue(),
          this.state.transactionType
        )
      );

      this.goBack();
    }
  };

  checkInput = () => {
    if (this.state.transactionDescription.trim() === "") {
      Alert.alert("Alerta", "Por favor coloque um nome na transação");
      return false;
    }

    if (this.rawValueRef.getRawValue() === 0) {
      Alert.alert("Alerta", "Por favor coloque um valor para a transação");
      return false;
    }

    return true;
  };

  handleDescriptionChange = text => {
    this.setState({ transactionDescription: text });
  };

  handleBtnGanho = () => {
    this.setState({ transactionType: true });
  };

  handleBtnDespesa = () => {
    this.setState({ transactionType: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={statusColor} />
        <Topbar
          topbar={{
            leftButton: true,
            leftIcon: "arrow-left",
            leftMethod: this.goBack,

            title: "NOVA",

            rightButton: true,
            rightIcon: "check",
            rightMethod: this.handleAddNewTransaction
          }}
          navigation={this.props.navigation}
        />

        <View style={styles.contentWrapper}>
          <View style={styles.contentHead}>
            <TouchableOpacity
              style={
                this.state.transactionType
                  ? styles.headButtonSelected
                  : styles.headButton
              }
              onPress={this.handleBtnGanho}
            >
              <Text style={styles.headText}>GANHO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.transactionType
                  ? styles.headButton
                  : styles.headButtonSelected
              }
              onPress={this.handleBtnDespesa}
            >
              <Text style={styles.headText}>DESPESA</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentBody}>
            <View style={styles.contentBodyBox}>
              <View style={styles.editIcon}>
                <Icon name="edit" size={20} color="#878787" />
              </View>
              <View style={styles.bodyTextWrapper}>
                <TextInputMask
                  style={styles.bodyText}
                  type={"money"}
                  value={this.state.showValue}
                  onChangeText={text => {
                    this.setState({
                      showValue: text
                    });
                  }}
                  ref={ref => (this.rawValueRef = ref)}
                />
              </View>
            </View>
          </View>
          <View style={styles.contentFooter}>
            <View style={styles.contentFooterBox}>
              <View style={styles.editIcon}>
                <Icon name="edit" size={20} color="#878787" />
              </View>
              <TextInput
                style={styles.footerText}
                onChangeText={this.handleDescriptionChange}
                placeholder="NOME DA TRANSAÇÃO"
                placeholderTextColor="#FFF"
              >
                {this.state.transactionDescription}
              </TextInput>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    paddingTop: 50,
    flexDirection: "column"
  },
  contentHead: {
    flexDirection: "row"
  },
  headButton: {
    height: 60,
    backgroundColor: "#24293B",
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  headButtonSelected: {
    height: 60,
    backgroundColor: "#1A1E2D",
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3
  },
  headText: {
    textAlign: "center",
    color: "#FFF"
  },
  contentBody: {
    flexDirection: "row",
    elevation: 8
  },
  contentFooter: {
    flexDirection: "row"
  },
  editIcon: {
    alignSelf: "flex-end",
    paddingRight: 10,
    paddingTop: 10
  },
  bodyText: {
    fontSize: 30,
    color: "#303030",
    textAlign: "center",
    padding: 0
  },
  bodySmallText: {
    fontSize: 15,
    color: "#303030",
    textAlign: "center",
    paddingTop: 15
  },
  footerText: {
    height: 50,
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center"
  },
  contentBodyBox: {
    flex: 1,
    height: 130,
    backgroundColor: lighColor
  },
  contentFooterBox: {
    flex: 1,
    height: 80,
    backgroundColor: "#24293B",
    elevation: 5
  },
  bodyTextWrapper: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 15
  }
});

const mapStateToProps = state => ({
  accessToken: state.user.accessToken
});

export default connect(mapStateToProps)(newTransaction);
