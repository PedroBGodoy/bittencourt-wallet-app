import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native'

import Auth0 from 'react-native-auth0';
import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";
import RNRestart from "react-native-restart";

const auth0 = new Auth0({ domain: 'bittencourt.auth0.com', clientId: '4U4Qkc8IxtVEL1kc0MDu6LlCgTcmmhXi' });

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
          SInfo.getItem("refreshToken", {}).then(refreshToken => {
            auth0.auth
              .refreshToken({ refreshToken: refreshToken })
              .then(newAccessToken => {
                SInfo.setItem("accessToken", newAccessToken, {});
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
          this.changeScene(data);
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
    let userID = data.sub.split('|')[1]
    SInfo.setItem('userID', userID, {})
    this.props.navigation.navigate('Accounts', {name: data.name, userID: userID})
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