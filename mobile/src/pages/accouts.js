import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, FlatList, ActivityIndicator } from 'react-native'

import SInfo from "react-native-sensitive-info";

import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Transaction from '../components/Transaction'
import AddTransactionButton from '../components/AddTransactionButton'

import { ApiRequestToken, ApiRequestData } from '../services/api'

export default class accouts extends Component {

  state = {
    transactions: [],
    name: '',
    userID: '',
    isFetching: false,
    apiToken: '',
    loading: true
  }

  async componentDidMount(){
    this.setState({name: this.props.navigation.getParam('name', 'Nome do Usuário')})
    
    await this.getUserID()

    await this.
    requestToken().then(res =>
    this.requestData(res))

    this.setState({loading: false})
  }

  getUserID = async () =>{
    const userID = await SInfo.getItem('userID', {})
    this.setState({userID: userID})
  }

  refreshList = () =>{
    this.requestData()
  }

  requestToken = async () =>{
    const token = await ApiRequestToken()
    this.setState({apiToken: token})
    SInfo.setItem("apiToken", token, {})
  }

  requestData = async () =>{
    this.setState({isFetching: true})
    const transactions = await ApiRequestData(this.state.userID, this.state.apiToken)
    this.setState({transactions: transactions})
    this.setState({isFetching: false})
  }

  render() {
    if(this.state.loading)
    {
      return(
        <View style={styles.loadingContainer}>
          <StatusBar backgroundColor="#212121"/>
          <ActivityIndicator
          size='large'
          color='#05a5d1'
          animating={!this.state.hasInitialized}
          />
        </View>
      )
    }else{
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#212121"/>
  
          <Topbar topbar={{backButton: false, title: this.state.name, settingsButton: true}} navigation={this.props.navigation}/>
  
          <Card cardName={'Nome do Cartão'} transactions={this.state.transactions}/>
  
          <View style={styles.activityWrapper}>
            <Text style={styles.activityTitle}>Transações Recentes</Text>
            <FlatList 
              data={this.state.transactions}
              keyExtractor={transaction => transaction._id}
              renderItem={({item}) => <Transaction transaction={item} method={this.refreshList}/>}
              onRefresh={this.refreshList}
              refreshing={this.state.loading}
            />
          </View>
  
          <AddTransactionButton navigation={this.props.navigation}/>
  
        </View>
      )
    }
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
    marginTop: 50
  },
  activityTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: "#FFF",
    marginBottom: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121'
  }
});
