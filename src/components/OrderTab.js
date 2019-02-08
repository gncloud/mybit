import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {
  Progress,
  Button,
  WhiteSpace,
  List
} from 'antd-mobile-rn'
import store from '@redux/store'

export default class OrderBook extends Component {
  constructor(props) {
    super(props)
    const exchange = props.navigation.state.params.exchange
    const base = props.navigation.state.params.base
    const coin = props.navigation.state.params.coin
    let orderbook = store.getState().exchanges[exchange][base][coin]['orderbook']
    this.updateState = this.updateState.bind(this)
    this.state = {
      orderbook: orderbook,
      unsubscribe: store.subscribe(this.updateState),
      exchange: exchange,
      base: base,
      coin: coin
    }
  }
  componentWillUnmount() {
    this.state.unsubscribe()
  }
  updateState() {
    const exchange = this.state.exchange
    const base = this.state.base
    const coin = this.state.coin
    let orderbook = store.getState().exchanges[exchange][base][coin]['orderbook']
    this.setState({
      orderbook: orderbook
    })
  }
  render() {
    let askList = this.state.orderbook.reverse().filter((o, i) => i < 5).map((ob, index) => {
      return (
        <List.Item key={index} >
          <TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{color: 'red', textAlign: 'right', paddingRight: 5}}>
                  {ob.ask_price}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <View>
                  <Progress style={{backgroundColor: 'red'}}/>
                </View>
                <View style={{paddingTop: 5}}>
                  <Text style={{fontSize: 10}}>
                    {Number(ob.ask_size).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </List.Item>
      )
    })
    let bidList = this.state.orderbook.reverse().filter((o, i) => i < 5).map((ob, index) => {
      return (
        <List.Item key={index} >
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <TouchableOpacity>
                  <Text style={{color: 'green', textAlign: 'right', paddingRight: 5}}>
                    {ob.ask_price}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity>
                  <View>
                    <Progress style={{backgroundColor: 'green'}}/>
                  </View>
                  <View style={{paddingTop: 5}}>
                    <Text style={{fontSize: 10}}>
                      {Number(ob.ask_size).toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        </List.Item>
      )
    })
    return (
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <List>
              {askList}
              {bidList}
            </List>
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity>
                <Text>구매</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>판매</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}