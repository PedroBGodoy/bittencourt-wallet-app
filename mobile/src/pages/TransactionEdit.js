import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Topbar from '../components/Topbar'

export default class TransactionEdit extends Component {

    state = {
        transactionDescription: '',
        transactionValue: '',
        transactionType: 'true',
        user: '',
        accessToken: ''
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
    

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#212121"/>

        <Topbar topbar={{backButton: true, title: 'Editar Transação', settingsButton: false}} navigation={this.props.navigation}/>



      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121'
    }
})