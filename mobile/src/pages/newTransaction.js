import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, BackHandler, TouchableOpacity, TextInput, Picker, KeyboardAvoidingView } from 'react-native'

import api from '../services/api'

import LinearGradient from 'react-native-linear-gradient'

import Topbar from '../components/Topbar'

export default class newTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactionDescription: '',
      transactionValue: '',
      transactionType: 'true'
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
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

  handleAddNewTransaction = async () => {
    await api.post('transactions',
      {
        "transactionDescription": this.state.transactionDescription,
        "transactionValue": this.state.transactionValue,
        "transactionType": this.state.transactionType
      }
    )

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
      <LinearGradient style={styles.container} colors={['#338FEB', '#0061BF']}>
        <StatusBar backgroundColor="#338FEB"/>
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
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
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