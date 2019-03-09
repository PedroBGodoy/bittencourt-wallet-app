import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, FlatList, ActivityIndicator, AsyncStorage } from 'react-native'

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
    loading: true,
    apiToken: ''
  }

  async componentDidMount(){
    const name = await AsyncStorage.getItem("@WalletApp:name")
    this.setState({name: name})
    
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
    this.setState({ apiToken: token })
    await SInfo.setItem("apiToken", token, {})
  }

  requestData = async () =>{
    this.setState({isFetching: true})
    const transactions = await ApiRequestData(this.state.userID, this.state.apiToken)
    this.setState({transactions: transactions})
    this.setState({isFetching: false})
  }

  render() {

    if(this.state.loading){
      return(
        <View style={styles.loadingContainer}>
          <StatusBar backgroundColor="#262F49"/>

          <ActivityIndicator
          size='large'
          color='#05a5d1'
          animating={!this.state.hasInitialized}
          />
        </View>
      )
    }else
    {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#262F49"/>
  
          <Topbar topbar={{backButton: false, title: 'CARTEIRA', settingsButton: true}} navigation={this.props.navigation}/>
  
          <Card transactions={this.state.transactions}/>
  
          <View style={styles.activityContainer}>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Transações</Text>
              <FlatList 
                data={this.state.transactions}
                keyExtractor={transaction => transaction._id}
                renderItem={({item}) => <Transaction transaction={item} method={this.refreshList} navigation={this.props.navigation}/>}
                onRefresh={this.refreshList}
                refreshing={this.state.loading}
                showsVerticalScrollIndicator={false}
              />
            </View>
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
    backgroundColor: "#262F49",
  },
  swiperWrapper: {
    height: 230,
  },
  activityContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityContent: {
    flex: 0.9
  },
  activityTitle: {
    fontSize: 18,
    color: "#8C97B5",
    marginBottom: 10,
    marginLeft: 30,
    fontWeight: '100'
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262F49',
    flex: 1
  }
});
