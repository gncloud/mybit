import React from 'react'
import { View, Text, SafeAreaView, AsyncStorage, Dimensions, ScrollView } from 'react-native'
import { config } from '~/Config'
import ccxt from 'ccxt'
import { Card } from '@ant-design/react-native'

const { width, height } = Dimensions.get('window')

export default class InvestHistory extends React.Component {
  constructor(props) {
    super(props)
    


    this.fetchBalance('upbit').then(balance => {
      console.log(balance)
    }, error => {
      alert(error)
    })

    this.state = {}
  }
  fetchBalance = async ( exchangeId ) => {
    // TODO 거래소 마다 스토리지에서 키정보가져오기
    console.log('exchange')
    const accessKey = await AsyncStorage.getItem('accessKey')
    const secretKey = await AsyncStorage.getItem('secretKey')
    let exchange = new ccxt[exchangeId]({
      apiKey: accessKey,
      secret: secretKey
    })
    return await exchange.fetchBalance()
  }


  render() {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>투자내역</Text>
        <ScrollView>

          <Card style={{marginTop: 20, height: 200, width: width - 20}}>
            <Card.Header 
              title="업비트"
              />
            <Card.Body style={{flex: 1, padding: 10}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 18, color: 'gray'}}>보유 KRW</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 18, color: 'black', textAlign: 'right'}}>25000 KRW</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 18, color: 'gray'}}>보유 BTC</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 18, color: 'black', textAlign: 'right'}}>1.00550522 BTC</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 18, color: 'gray'}}>보유 ETH</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 18, color: 'black', textAlign: 'right'}}>8315.00000000 ETH</Text>
                </View>
              </View>

            </Card.Body>
          </Card>

        </ScrollView>
        
      </SafeAreaView>
    )
  }
}