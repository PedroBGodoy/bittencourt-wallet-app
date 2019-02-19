import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, FlatList } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'

import api from '../services/api'

import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Transaction from '../components/Transaction'
import AddTransactionButton from '../components/AddTransactionButton'

export default class accouts extends Component {

  state = {
    transactions: []
  }

  async componentDidMount(){
    try{
      const response = await api.get('transactions')

      this.setState({transactions: response.data})
    } catch(error){
      console.log(error)
    }
  }

  render() {
    return (
      <LinearGradient style={styles.container} colors={['#338FEB', '#0061BF']}>
        <StatusBar backgroundColor="#338FEB"/>

        <Topbar topbar={{backButton: false, title: 'Nome do Usuário', settingsButton: false}}/>

        <View style={styles.swiperWrapper}>
          <Swiper dotColor={"#FFF"} activeDotColor={"#43C545"}>
            <Card cardName={'Nome do Cartão'} transactions={this.state.transactions}/>
          </Swiper>
        </View>

        <View style={styles.activityWrapper}>
          <Text style={styles.activityTitle}>Transações Recentes</Text>
          <FlatList 
            data={this.state.transactions}
            keyExtractor={transaction => transaction._id}
            renderItem={({item}) => <Transaction transaction={item}/>}
          />
        </View>

        <AddTransactionButton navigation={this.props.navigation}/>

      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  swiperWrapper: {
    height: 230,
  },
  activityWrapper: {
    flex: 1,
  },
  activityTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: "#FFF",
    marginBottom: 30
  },
});
