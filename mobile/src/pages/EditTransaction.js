import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  TextInput,
  TouchableOpacity
} from "react-native";

import SInfo from "react-native-sensitive-info";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInputMask } from "react-native-masked-text";
import { updateTransaction } from "../store/actions/transactionsActions";
import { connect } from "react-redux";
import Topbar from "../components/Topbar";

import { primaryColor, statusColor, lighColor } from "../styles/common.js";

export class EditTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionDescription: "NOME DA TRANSAÇÃO",
      transactionValue: "0",
      transactionType: "true",
      transactionID: ""
    };
    this.rawValueRef;
  }

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    const userID = await SInfo.getItem("userID", {});
    const apiToken = await SInfo.getItem("apiToken", {});

    this.setState({ user: userID });
    this.setState({ apiToken: apiToken });

    const { navigation } = this.props;

    await this.setState({
      transactionDescription: navigation.getParam("description"),
      transactionValue: parseFloat(navigation.getParam("value"))
        .toFixed(2)
        .toString(),
      transactionType: navigation.getParam("type"),
      transactionID: navigation.getParam("id")
    });

    console.log(this.state.transactionValue);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.goBack();
    return true;
  };

  handleEditTransaction = async () => {
    if (this.checkInput()) {
      await this.props.dispatch(
        updateTransaction(
          this.props.accessToken,
          this.state.transactionID,
          this.state.transactionDescription,
          this.rawValueRef.getRawValue(),
          this.state.transactionType
        )
      );
    }

    this.goBack();
  };

  checkInput = () => {
    if (this.state.transactionDescription === "NOME DA TRANSAÇÃO") {
      Alert.alert("Alerta", "Por favor altere o nome da transação");
      return false;
    }

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

  handleValueChange = text => {
    this.setState({ transactionValue: text });
  };

  goBack = async () => {
    this.props.navigation.navigate("Main");
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

            title: "EDITAR",

            rightButton: true,
            rightIcon: "check",
            rightMethod: this.handleEditTransaction
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
                  type={"money"}
                  value={this.state.transactionValue}
                  onChangeText={this.handleValueChange}
                  style={styles.bodyText}
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

export default connect(mapStateToProps)(EditTransaction);
