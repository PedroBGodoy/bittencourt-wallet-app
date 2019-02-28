import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Topbar extends Component {

  goBack = () =>{
      this.props.navigation.navigate('Accounts')
  }

  handleSettings = () =>{ 
    this.props.navigation.navigate("Settings")
  }

  render() {
    const { topbar } = this.props;
    const backButton = topbar.backButton
    const title = topbar.title
    const settingsButton = topbar.settingsButton

    return(
      <View style={styles.topBar}>
      <View style={styles.topBarLeft}>
      {backButton && (
          <TouchableOpacity onPress={this.goBack}>
          <Icon 
          name="arrow-back"
          size={24}
          color="#4C5B84"
          />
          </TouchableOpacity>
      )}
      </View>

      <View style={styles.topBarCenter}>
        <Text style={styles.topBarCenterText}>{title}</Text>
      </View>

      <View style={styles.topBarRight}>
      {settingsButton && (
          <TouchableOpacity onPress={this.handleSettings}>
          <Icon 
            name="settings"
            size={24}
            color="#4C5B84"
          />
          </TouchableOpacity>
      )}
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    topBar: {
      height: 80,
      padding: 15,
      flexDirection: 'row',
      flex: 0.1,
      
    },
    topBarCenter: {
      flex: 0.8,
      justifyContent: "center",
      alignItems: "center"
    },
    topBarRight: {
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center"
    },
    topBarLeft: {
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center"
    },
    topBarCenterText: {
      color: '#8C97B5',
      fontSize: 14,
      fontWeight: '100'
    }
  });