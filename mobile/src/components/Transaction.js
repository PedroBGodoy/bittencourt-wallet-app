import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Transaction extends Component {

  render() {
    const { transaction } = this.props;
    const dia = parseDate(transaction.madeAt);

    function parseDate(date){
      let split = date.split('T');
      let day = split[0].split('-');
      let time = split[1].split(':', 2);
      let ret = day[2] + "/" + day[1] + "/" + day[0] + ", " + time[0] + ":" + time[1];
      return ret;
    }

    if(transaction.transactionType){
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.leftBox}>
              <Icon style={styles.iconUp}
                name="arrow-back"
                size={30}
              />
            </View>
  
            <View style={styles.centerBox}>
              <Text style={styles.description}>{transaction.transactionDescription}</Text>
              <Text style={styles.date}>{dia}</Text>
            </View>
  
            <View style={styles.rightBox}> 
              <Text style={styles.description}>R${transaction.transactionValue}</Text>
            </View>
          </View>
        </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.leftBox}>
              <Icon style={styles.iconDown}
                name="arrow-back"
                size={30}
              />
            </View>
  
            <View style={styles.centerBox}>
              <Text style={styles.description}>{transaction.transactionDescription}</Text>
              <Text style={styles.date}>{dia}</Text>
            </View>
  
            <View style={styles.rightBox}> 
              <Text style={styles.description}>R${transaction.transactionValue}</Text>
            </View>
          </View>
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center"
    },
    content: {
      height: 65,
      borderBottomWidth: 0.5,
      borderColor: '#CBCBCB',
      flexDirection: 'row',
      flex: 0.8,
      marginBottom: 20,
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
