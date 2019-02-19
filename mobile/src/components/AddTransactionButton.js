import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

export default class AddTransactionButton extends Component {

  handleAddNew = () =>{
    this.props.navigation.navigate('NewTransaction', {backButton: true, title: 'Nova Transação', settingsButton: false})
  }

  render() {
    return (
        <View style={styles.addTransaction}>
          <TouchableOpacity 
            style={styles.addTransactionButton}
            onPress={this.handleAddNew}
          >
              <Icon 
                name="plus"
                size={24}
                color="#FFF"
              />
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    addTransaction: {
        height: 100,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center"
      },
      addTransactionButton: {
        height: 55,
        width: 55,
        borderRadius: 50,
        backgroundColor: '#43C545',
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
      }
})