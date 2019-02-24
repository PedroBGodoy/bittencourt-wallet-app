import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Card extends Component {

  state = {
    balance: 0
  }

  componentDidMount(){
    this.calculateBalance()
  }

  componentDidUpdate(){
    this.calculateBalance()
  }

  calculateBalance = () =>{
    if(this.props.transactions !== undefined){
      let _balance = 0
      this.props.transactions.forEach(transaction => {
        _balance = transaction.transactionType ? (_balance + transaction.transactionValue) : (_balance - transaction.transactionValue)
      })
      if(this.state.balance !== _balance){
        this.setState({balance: _balance})
      }
    }
  }

  render() {
    return (
      <View style={styles.card}>
          <Text style={styles.cardBalance}>R${this.state.balance},00</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 10,
        borderBottomColor: '#CBCBCB',
        borderBottomWidth: 0.5,
        borderTopColor: '#CBCBCB',
        borderTopWidth: 0.5,
      },
      cardName: {
        color: '#EFEFEF',
        fontSize: 14,
      },
      cardBalance: {
        color: '#EFEFEF',
        fontSize: 32,
        marginTop: 0
      }
})