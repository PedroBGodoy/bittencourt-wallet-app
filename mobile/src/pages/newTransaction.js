import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, BackHandler, TouchableOpacity, TextInput, Picker } from 'react-native'

import SInfo from "react-native-sensitive-info";

import Topbar from '../components/Topbar'

import { ApiHandleNewTransaction } from '../services/api'

export default class newTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactionDescription: '',
      transactionValue: '',
      transactionType: 'true',
      user: '',
      accessToken: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    SInfo.getItem('userID', {}).then(userID => this.setState({user: userID}))
    SInfo.getItem('apiToken', {}).then(accessToken => this.setState({accessToken: accessToken}))
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.goBack();
    return true;
  }

  goBack = async () => {
    this.props.navigation.navigate('Accounts')
  }

  handleAddNewTransaction = () => {
    ApiHandleNewTransaction(this.state.accessToken, this.state.transactionDescription, this.state.transactionValue, this.state.transactionType, this.state.user)

    this.goBack()
  }

  handleDescriptionChange = (text) => {
    this.setState({transactionDescription: text})
  }

  handleValueChange = (text) => {
    let newText = ''
    let numbers = '0123456789'

    for (let i = 0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1)
      {
        newText = newText + text[i]
      }else{
        
      }
    }
    this.setState({transactionValue: newText})
  }

  render() {
    const { navigation } = this.props;
    const backButton = navigation.getParam('backButton', true)
    const title = navigation.getParam('title', 'Nome Do Usuário')
    const settingsButton = navigation.getParam('settingsButton', true)

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#212121"/>
        <Topbar topbar={{backButton, title, settingsButton}} navigation={this.props.navigation}/>

        <View style={styles.content}>
          <TextInput placeholder="Descrição" style={styles.textInput} autoCapitalize='sentences' autoCorrect={true} onChangeText={this.handleDescriptionChange}/>
          <TextInput placeholder="R$00,00" style={styles.textInput} onChangeText={this.handleValueChange} value={this.state.transactionValue} keyboardType='numeric'/>
          <Picker
            selectedValue={this.state.transactionType}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({transactionType: itemValue})
            }>
            <Picker.Item label="Depósito" value='true' />
            <Picker.Item label="Gasto" value='false' />
          </Picker>
          <View>
            <TouchableOpacity
              style={styles.addTransactionButton}
              onPress={this.handleAddNewTransaction}
            >
              <Text>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#212121'
    },
    content: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 50
    },
    addTransactionButton: {
      height: 40,
      width: 300,
      backgroundColor: 'white',
      borderColor: '#D4D4D4',
      borderWidth: 0.5,
      justifyContent: "center",
      alignItems: "center",
      margin: 10
    },
    textInput: {
      height: 40,
      width: 300,
      backgroundColor: 'white',
      borderColor: '#D4D4D4',
      borderWidth: 0.5,
      margin: 10
    },
    picker: {
      height: 40,
      width: 300,
      backgroundColor: 'white',
      borderColor: '#D4D4D4',
      borderWidth: 0.5,
      justifyContent: "center",
      alignItems: "center",
      margin: 10
    }
})