import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Swipeout from 'react-native-swipeout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SInfo from 'react-native-sensitive-info'

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

    async function handleDeleteButtonPress(id){
      await this.handleDeleteTransaction(id)
      this.refreshList()
    }

    function handleEditButtonPress(data){
      this.handleEditButton(data)
    }

    handleDeleteTransaction = async id =>{
      const apiToken = await SInfo.getItem('apiToken', {});
      await ApiHandleDeleteTransaction(id, apiToken);
    }

    handleEditButton = data =>{
      this.props.navigation.navigate('EditTransaction', {
        description: data.transactionDescription,
        value: data.transactionValue.toString(),
        type: data.transactionType,
        id: data._id
      })
    }

    refreshList = () =>{
      this.props.method()
    }

    let swipeButtons = [
      {
        text: 'Edit',
        backgroundColor: '#262F49',
        onPress: () => {
          handleEditButtonPress(this.props.transaction)
        }
      },
      {
        text: 'Delete',
        backgroundColor: '#20273E',
        onPress: ()=>{
          handleDeleteButtonPress(this.props.transaction._id)
        }
      }
    ]

    return (
      
      <View style={styles.container}>
        <Swipeout right={swipeButtons} backgroundColor={'#262F49'} autoClose={true} style={styles.swipeBox}>
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
        </Swipeout>
      </View>
    )

  }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10,
      flexDirection: 'row',
      flex: 1
    },
    swipeBox: {
      height: 80,
      flex: 0.9,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      },
      elevation: 5
    },
    content: {
      height: 80,
      backgroundColor: '#323C57',
      borderRadius: 5,
      flexDirection: 'row',
      paddingTop: 25
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
