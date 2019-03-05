import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, BackHandler, Platform } from 'react-native'

import Topbar from '../components/Topbar'

import Auth0 from 'react-native-auth0';
import SInfo from "react-native-sensitive-info";

const auth0 = new Auth0({ domain: 'bittencourt.auth0.com', clientId: '4U4Qkc8IxtVEL1kc0MDu6LlCgTcmmhXi' });

export default class Settings extends Component {

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    this.goBack();
    return true;
  }

  goBack = () =>{
    this.props.navigation.navigate("Accounts")
  }

  goToLogin = () =>{
      this.props.navigation.navigate('Login')
  }

  handleLogout = () =>{
      SInfo.deleteItem('accessToken', {})
      SInfo.deleteItem('refreshToken', {})
      SInfo.deleteItem('userID', {})
      SInfo.deleteItem('idToken', {})
  
      if(Platform.OS === 'ios'){
        auth0.webAuth
        .clearSession()
        .catch(err => {
          console.log('error clearing session: ', err)
        })
      }
  
      this.goToLogin()
  }
    
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#262F49"/>
        <Topbar topbar={{backButton: true, title: 'Settings', settingsButton: false}} navigation={this.props.navigation}/>

        <TouchableOpacity onPress={this.handleLogout}>
        <View style={styles.item}>
            <Text style={styles.itemText}>Logout</Text>
        </View> 
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262F49'
    },
    item: {
        height: 60,
        backgroundColor: '#323C57',
        justifyContent: 'center',
        padding: 20
    },
    itemText: {
        color: '#FFFFFF'
    }
})