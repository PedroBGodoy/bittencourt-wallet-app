import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, FlatList } from 'react-native'

import Swiper from 'react-native-swiper'

import api from '../services/api'
import SInfo from "react-native-sensitive-info";

import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Transaction from '../components/Transaction'
import AddTransactionButton from '../components/AddTransactionButton'

export default class accouts extends Component {

  state = {
    transactions: [],
    name: '',
    userID: '',
    isFetching: false
  }

  async componentDidMount(){
    this.setState({name: this.props.navigation.getParam('name', 'Nome do Usuário')})
    const userID = await SInfo.getItem('userID', {})
    this.setState({userID: userID})

    this.getList()
  }

  refreshList = () =>{
    this.getList()
  }

  getList = async () =>{
    this.setState({isFetching: true})
    try{
      const response = await api.get(`/transactions/${this.state.userID}`)
      this.setState({transactions: response.data})
    } catch(error){
      console.log(error)
    }
    this.setState({isFetching: false})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#212121"/>

        <Topbar topbar={{backButton: false, title: this.state.name, settingsButton: true}} navigation={this.props.navigation}/>

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
            onRefresh={this.refreshList}
            refreshing={this.state.isFetching}
          />
        </View>

        <AddTransactionButton navigation={this.props.navigation}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
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
