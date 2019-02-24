import axios from 'axios'
import SInfo from "react-native-sensitive-info";

export async function ApiRequestToken(){
    try{
      let response = await fetch('https://bittencourt.auth0.com/oauth/token', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"client_id":"9N2FKDAcGTeeVt5oiWgkpRddwMYf4Iw2","client_secret":"WHmZL3QwmXjiHR_Fu7L0ahVwEJYM9ZwwJdAir19MkPsVehwsdTfBeujSePFgpGYG","audience":"https://walletbittencourt.com/api","grant_type":"client_credentials"}'
      })
      let responseJson = await response.json()
      return responseJson.access_token
    }catch(err){
      console.log(err)
    }
  }

  export async function ApiRequestData(userID, apiToken){
    let responseJson = undefined
    try{
      let response = await fetch(`https://mighty-wave-79384.herokuapp.com/transactions/${userID}`, {
        headers: { 'authorization': `Bearer ${apiToken}` },
      })
      responseJson = await response.json()
    }catch(err){
      console.log(err)
    }
    if(responseJson !== undefined)
    {
      return responseJson
    }
  }

  export async function ApiHandleNewTransaction(accessToken, description, value, type, user){
    await fetch('https://mighty-wave-79384.herokuapp.com/transactions', {
      method: 'POST',
      headers: {'authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        transactionDescription: description,
        transactionValue: value,
        transactionType: type,
        user: user
      })
    })
  }

  export async function ApiHandleUpdateTransaction(accessToken, id, description, value, type, user){
    await fetch(`https://mighty-wave-79384.herokuapp.com/transactions/${id}`, {
      method: 'PUT',
      headers: {'authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        transactionDescription: description,
        transactionValue: value,
        transactionType: type,
        user: user
      })
    })
  }

  export async function ApiHandleDeleteTransaction(id){
    const accessToken = await SInfo.getItem('accessToken', {})
    await fetch(`https://mighty-wave-79384.herokuapp.com/transactions/${id}`, {
      method: 'DELETE',
      headers: {'authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
    })
  }