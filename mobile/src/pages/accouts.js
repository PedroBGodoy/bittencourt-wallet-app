import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, FlatList } from 'react-native'

import Swiper from 'react-native-swiper'

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
    isFetching: false,
    idToken: '',
    accessToken: '',
    apiToken: ''
  }

  async componentDidMount(){
    this.setState({name: this.props.navigation.getParam('name', 'Nome do Usuário')})
    const userID = await SInfo.getItem('userID', {})
    const idToken = await SInfo.getItem('idToken', {})
    const accessToken = await SInfo.getItem('accessToken', {})
    this.setState({idToken: idToken})
    this.setState({userID: userID})
    this.setState({accessToken: accessToken})

    //this.getList()
    this.
    apiRequestToken().then(res =>
    this.apiRequestData(res))
  }

  refreshList = () =>{
    this.apiRequestData()
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

  apiRequestToken = async () =>{
    try{
      let response = await fetch('https://bittencourt.auth0.com/oauth/token', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"client_id":"9N2FKDAcGTeeVt5oiWgkpRddwMYf4Iw2","client_secret":"WHmZL3QwmXjiHR_Fu7L0ahVwEJYM9ZwwJdAir19MkPsVehwsdTfBeujSePFgpGYG","audience":"https://walletbittencourt.com/api","grant_type":"client_credentials"}'
      })
      let responseJson = await response.json()
      this.setState({apiToken: responseJson.access_token})
      SInfo.setItem("apiToken", responseJson.access_token, {})
      return responseJson
    }catch(err){
      console.log(err)
    }
  }

  apiRequestData = async () =>{
    let responseJson = undefined
    try{
      let response = await fetch(`https://mighty-wave-79384.herokuapp.com/transactions/${this.state.userID}`, {
        headers: { 'authorization': `Bearer ${this.state.apiToken}` },
      })
      responseJson = await response.json()
    }catch(err){
      console.log(err)
    }
    if(responseJson !== undefined)
    {
      this.setState({transactions: responseJson})
    }
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
