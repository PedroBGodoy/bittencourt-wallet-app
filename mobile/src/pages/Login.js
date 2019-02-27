import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, AsyncStorage } from 'react-native'

import Auth0 from 'react-native-auth0';
import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";

const auth0 = new Auth0({ domain: 'bittencourt.auth0.com', clientId: '4U4Qkc8IxtVEL1kc0MDu6LlCgTcmmhXi' });

export default class Login extends Component {

  state = {
    hasInitialized: false
  }

  async componentDidMount(){

    const accessToken = await this.getAccessTokenStorage()

    if(accessToken){
      const userData = await this.getUserData(accessToken)
      if(userData){
        this.changeScene(userData)
      }else{
        const newAccessToken = await this.getNewToken()
        if(newAccessToken === "[a0.response.invalid: unknown error]"){
          this.clearSession()
        }else{
          this.changeScene(await this.getUserData(newAccessToken))
        }
      }
    }else{
      this.setState({hasInitialized: true})
    }

  }

  handleLogin = async () => {
    this.setState({hasInitialized: false})

    try{
      const sessionData = await this.authenticateAndResponde()
      this.setSessionData(sessionData)
      const userData = await this.getUserData(sessionData.accessToken)
      this.changeScene(userData)
    }catch(err){
      console.log(err)
      this.setState({hasInitialized: true})
    }
  }

  getAccessTokenStorage = () =>{
    try{
      const accessToken = SInfo.getItem("accessToken", {})
      return accessToken
    }catch(err){
      throw err
    }
  }

  getUserData = accessToken =>{
    try{
      const userData = auth0.auth.userInfo({ token: accessToken })
      return userData
    }catch(err){
      throw err
    }
  }

  getNewToken = async () =>{
    const refreshToken = await SInfo.getItem("refreshToken", {})

    try{
      const newAccessToken = await auth0.auth.refreshToken({ refreshToken: refreshToken })
      return newAccessToken
    }catch(err){
      throw err
    }
  }

  clearSession = () =>{
    SInfo.deleteItem('accessToken', {})
    SInfo.deleteItem('refreshToken', {})
    SInfo.deleteItem('userID', {})
    SInfo.deleteItem('idToken', {})
  }

  authenticateAndResponde = async () =>{
    try{
      const response = await auth0.webAuth
      .authorize({
        scope: "openid offline_access profile email",
        audience: "https://bittencourt.auth0.com/userinfo",
        device: DeviceInfo.getUniqueID(),
        prompt: "login" 
      })

      return response
    }catch(err){
      throw err
    }
  }

  setSessionData = sessionData =>{
    try{
      SInfo.setItem("accessToken", sessionData.accessToken, {});
      SInfo.setItem("refreshToken", sessionData.refreshToken, {});
      SInfo.setItem("idToken", sessionData.idToken, {})
    }catch(err){
      console.log("Error saving session data")
    }               
  }

  changeScene = async data =>{
    await SInfo.setItem('userID', data.sub, {})
    await AsyncStorage.setItem("@WalletApp:name", data.name)
    this.props.navigation.navigate('Accounts')
  }

  render() {
    return ( 
      <View style={styles.container}>
        <StatusBar backgroundColor="#212121"/>
        <ActivityIndicator
          size='large'
          color='#05a5d1'
          animating={!this.state.hasInitialized}
        />
        {this.state.hasInitialized && (
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={this.handleLogin}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121'
  },
  loginButton: {
    height: 50,
    width: 250,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: '#000000',
    fontSize: 14
  }
})