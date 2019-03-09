import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, AsyncStorage } from 'react-native'

import Auth0 from 'react-native-auth0';
import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";
import RNRestart from 'react-native-restart'
import Config from 'react-native-config'

const auth0 = new Auth0({ domain: Config.DOMAIN_URL, clientId: Config.CLIENT_ID_AUTH0 });

export default class Login extends Component {

  state = {
    hasInitialized: false
  }

  async componentDidMount(){

    const accessToken = await this.getAccessTokenFromStorage();

    if(accessToken){
      try {
        const userData = await this.getUserData(accessToken);
        if(userData){
          this.changeScene(userData);
        }else{
          const newAccessToken = await this.getNewToken();
          const userData = await this.getUserData(newAccessToken);
          this.changeScene(userData);
        }
      } catch (err) {
        this.clearSession();
        RNRestart.Restart();
      }
    }else{
      this.setState({hasInitialized: true});
    }
  }

  handleLogin = async () => {
    this.setState({hasInitialized: false});

    try{
      const sessionData = await this.authenticateAndResponde();
      this.setSessionData(sessionData);
      const userData = await this.getUserData(sessionData.accessToken);
      this.changeScene(userData);
    }catch(err){
      console.log(err);
      this.setState({hasInitialized: true});
    }
  }

  getAccessTokenFromStorage = () =>{
    try{
      const accessToken = SInfo.getItem("accessToken", {});
      return accessToken;
    }catch(err){
      throw err;
    }
  }

  getUserData = async accessToken =>{
    try{
      const userData = await auth0.auth.userInfo({ token: accessToken });
      return userData;
    }catch(err){
      throw err;
    }
  }

  getNewToken = async () =>{
    try{
      const refreshToken = await SInfo.getItem("refreshToken", {});
      const newAccessToken = await auth0.auth.refreshToken({ refreshToken: refreshToken });
      return newAccessToken;
    }catch(err){
      throw err;
    }
  }

  clearSession = () =>{
    try {
      SInfo.deleteItem('accessToken', {});
      SInfo.deleteItem('refreshToken', {});
      SInfo.deleteItem('userID', {});
      SInfo.deleteItem('idToken', {});
    } catch (err) {
      throw err;
    }
  }

  authenticateAndResponde = async () =>{
    try{
      const response = await auth0.webAuth
      .authorize({
        scope: "openid offline_access profile email",
        audience: "https://bittencourt.auth0.com/userinfo",
        device: DeviceInfo.getUniqueID(),
        prompt: "login" 
      });

      return response;
    }catch(err){
      throw err;
    }
  }

  setSessionData = sessionData =>{
    try{
      SInfo.setItem("accessToken", sessionData.accessToken, {});
      SInfo.setItem("refreshToken", sessionData.refreshToken, {});
      SInfo.setItem("idToken", sessionData.idToken, {});
    }catch(err){
      console.log("Error saving session data");
    }               
  }

  changeScene = async data =>{
    await SInfo.setItem('userID', data.sub, {});
    await AsyncStorage.setItem("@WalletApp:name", data.name);
    this.props.navigation.navigate('Accounts');
  }

  render() {
    return ( 
      <View style={styles.container}>
        <StatusBar backgroundColor="#262F49"/>

        {this.state.hasInitialized && (
          <View style={styles.content}>
            <Text style={styles.title}>WALLET APP</Text>
            <TouchableOpacity 
            style={styles.loginButton}
            onPress={this.handleLogin}
            >
            <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}

        <ActivityIndicator
          size='large'
          color='#05a5d1'
          animating={!this.state.hasInitialized}
          style={styles.loading}
        />

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262F49'
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    color: '#8C97B5',
    fontWeight: '100',
    margin: 60,
    fontSize: 30
  },
  loginButton: {
    height: 50,
    width: 250,
    backgroundColor: '#323C57',
    borderRadius: 5,
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 5
  },
  loginText: {
    color: '#8C97B5',
    fontSize: 14,
    fontWeight: '100',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})