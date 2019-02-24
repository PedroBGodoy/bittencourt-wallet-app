import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Swipeout from 'react-native-swipeout'

import Icon from 'react-native-vector-icons/MaterialIcons'

import {ApiHandleDeleteTransaction} from '../services/api'

export default class Transaction extends Component {
  render() {
    const { transaction } = this.props;
    const day = parseDate(transaction.madeAt);

    function parseDate(date){
      let split = date.split('T');
      let day = split[0].split('-');
      let time = split[1].split(':', 2);
      let ret = day[2] + "/" + day[1] + "/" + day[0] + ", " + time[0] + ":" + time[1];
      return ret;
    }

    async function handleButtonPress(){
      await this.handleDeleteTransaction()
      this.refreshList()
    }

    handleDeleteTransaction = async () =>{
      await ApiHandleDeleteTransaction(transaction._id)
    }

    refreshList = () =>{
      this.props.method()
    }

    let swipeButtons = [
      {
        text: 'Delete',
        backgroundColor: '#CC3737',
        onPress: ()=>{
          handleButtonPress()
        }
      }
    ]

    return (
      <Swipeout right={swipeButtons} backgroundColor={'#212121'} autoClose={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.leftBox}>
            {transaction.transactionType && (
              <Icon style={styles.iconUp}
              name="arrow-back"
              size={30}
              />
            )}
            {!transaction.transactionType && (
              <Icon style={styles.iconDown}
              name="arrow-back"
              size={30}
              />
            )}
          </View>

          <View style={styles.centerBox}>
            <Text style={styles.description}>{transaction.transactionDescription}</Text>
            <Text style={styles.date}>{day}</Text>
          </View>

          <View style={styles.rightBox}> 
            <Text style={styles.description}>R${transaction.transactionValue},00</Text>
          </View>
        </View>
      </View>
      </Swipeout>
    )

  }
}

const styles = StyleSheet.create({
    container: {
      height: 80,
      borderBottomWidth: 0.5,
      borderColor: '#CBCBCB',
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 20
    },
    content: {
      flexDirection: 'row',
      flex: 0.8,
    },
    description: {
      color: "#FFF",
      marginLeft: 20,
      fontSize: 12,
      fontWeight: 'bold'
    },
    date: {
      color: "#FFF",
      marginLeft: 20,
      fontSize: 10,
    },
    value: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    leftBox: {
      flex: 0.2,
    },
    centerBox: {
      flex: 0.6,
    },
    rightBox: {
      flex: 0.4,
    },
    iconUp: {
      transform: [{ rotateZ: '125deg'}, {translateX: 15}],
      color: '#75CF26'
    },
    iconDown: {
      transform: [{ rotateZ: '-45deg'}, {translateX: 10}],
      color: '#CF2626'
    }
})
