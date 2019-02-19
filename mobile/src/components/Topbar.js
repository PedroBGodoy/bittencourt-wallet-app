import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Topbar extends Component {

  goBack = () =>{
      this.props.navigation.navigate('Accounts')
  }
    
  render() {
    const { topbar } = this.props;
    const backButton = topbar.backButton
    const title = topbar.title
    const settingsButton = topbar.settingsButton

    if(backButton && settingsButton){
      return(
        <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
         <Icon 
            name="arrow-back"
            size={24}
            color="#FFF"
          />
        </View>

        <View style={styles.topBarCenter}>
          <Text style={styles.topBarCenterText}>{title}</Text>
        </View>

        <View style={styles.topBarRight}>
          <Icon 
              name="settings"
              size={24}
              color="#FFF"
            />
        </View>
      </View>
      )
    }
    else if(!backButton && settingsButton){
      return(
        <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
        </View>

        <View style={styles.topBarCenter}>
          <Text style={styles.topBarCenterText}>{title}</Text>
        </View>

        <View style={styles.topBarRight}>
            <Icon 
              name="settings"
              size={24}
              color="#FFF"
            />
        </View>
      </View>
      )
    }
    else if(backButton && !settingsButton){
      return(
        <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity
            onPress={this.goBack}
          >
            <Icon 
              name="arrow-back"
              size={24}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.topBarCenter}>
          <Text style={styles.topBarCenterText}>{title}</Text>
        </View>

        <View style={styles.topBarRight}>
        </View>
      </View>
      )
    }
    else{
      return(
        <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
        </View>

        <View style={styles.topBarCenter}>
          <Text style={styles.topBarCenterText}>{title}</Text>
        </View>

        <View style={styles.topBarRight}>
        </View>
      </View>
      )
    }
  }
}

const styles = StyleSheet.create({
    topBar: {
      height: 60,
      marginTop: 30,
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
      color: '#FFF',
      fontSize: 18
    }
  });