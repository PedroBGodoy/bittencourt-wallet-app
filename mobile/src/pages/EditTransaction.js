import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, BackHandler, TextInput, Picker, TouchableOpacity } from 'react-native'

import SInfo from "react-native-sensitive-info";

import Topbar from '../components/Topbar'
import { ApiHandleUpdateTransaction } from '../services/api'

export default class EditTransaction extends Component {

  state = {
      transactionDescription: '',
      transactionValue: '',
      transactionType: 'true',
      user: '',
      transactionID: '',
      apiToken: ''
  }

  async componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      const userID = await SInfo.getItem('userID', {});
      const apiToken = await SInfo.getItem('apiToken', {});

      this.setState({user: userID});
      this.setState({apiToken: apiToken});

      const { navigation } = this.props

      await this.setState({
        transactionDescription: navigation.getParam('description'),
        transactionValue: navigation.getParam('value'),
        transactionType: navigation.getParam('type'),
        transactionID: navigation.getParam('id')
      })
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
      this.goBack();
      return true;
  }

  handleEditTransaction = () =>{
    ApiHandleUpdateTransaction(this.state.transactionID, this.state.transactionDescription, this.state.transactionValue, this.state.transactionType, this.state.user, this.state.apiToken)
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

  goBack = async () => {
      this.props.navigation.navigate('Accounts')
  }
    

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#212121"/>
        <Topbar topbar={{backButton: true, title: 'Editar Transação', settingsButton: false}} navigation={this.props.navigation}/>

        <View style={styles.content}>
          <TextInput placeholder="Descrição" style={styles.textInput} autoCapitalize='sentences' autoCorrect={true} onChangeText={this.handleDescriptionChange} value={this.state.transactionDescription}/>
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
              onPress={this.handleEditTransaction}
            >
              <Text>Editar</Text>
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