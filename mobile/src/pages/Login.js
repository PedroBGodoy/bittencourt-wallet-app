import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'bittencourt.auth0.com', clientId: '4U4Qkc8IxtVEL1kc0MDu6LlCgTcmmhXi' });
import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";
import RNRestart from "react-native-restart";

export default class Login extends Component {

  state = {
    hasInitialized: false
  }

  componentDidMount(){
    SInfo.getItem("accessToken", {}).then(accessToken => {
      if(accessToken){
        auth0.auth
        .userInfo({ token: accessToken })
        .then(data => {
          this.changeScene(data);
        })
        .catch(err => {
          SInfo.getItem("refreshToken", {}).then(refreshToken => { // get the refresh token from the secure storage
            // request for a new access token using the refresh token 
            auth0.auth
              .refreshToken({ refreshToken: refreshToken })
              .then(newAccessToken => {
                SInfo.setItem("accessToken", newAccessToken);
                RNRestart.Restart();
              })
              .catch(accessTokenErr => {
                console.log("error getting new access token: ", accessTokenErr);
              });
          });
        });
      }else {
        this.setState({hasInitialized: true})
      }
    })
  }

  handleLogin = () => {
    auth0.webAuth
      .authorize({
        scope: "openid offline_access profile email",
        audience: "https://bittencourt.auth0.com/userinfo",
        device: DeviceInfo.getUniqueID(),
        prompt: "login" 
      })
      .then(res => {
        SInfo.setItem("accessToken", res.accessToken, {});
        SInfo.setItem("refreshToken", res.refreshToken, {});

        auth0.auth
        .userInfo({ token: res.accessToken })
        .then(data => {
          this.changeScene(data); // go to the Account screen
        })
        .catch(err => {
          console.log("error occurred while trying to get user details: ", err);
        });    
      })
      .catch(error => {
        console.log("error occurred while trying to authenticate: ", error);
      });
  }

  changeScene = data =>{
    this.setState({
      hasInitialized: true
    });
    console.log(data)
    this.props.navigation.navigate('Accounts', {name: data.name})
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={this.handleLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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