import React, { Component } from 'react'
import store from '@redux/store'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {
  Flex,
  Progress,
  Button,
  WhiteSpace,
  List
} from 'antd-mobile-rn'

const Header = () => {
  return (
    <View style={{flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 10}}>
      <View style={{justifyContent: 'center'}}>
        <View>
          <Text style={{marginLeft: 20, fontSize: 15}}>코인명</Text>
        </View>
      </View>
      <View style={{}}>
        <Text style={{marginLeft: 30, fontSize: 15}}>가격</Text>
      </View>
      <View style={{}}>
        <Text style={{marginLeft: 20, fontSize: 15}}>전일대비</Text>
      </View>
      <View style={{}}>
        <Text style={{fontSize: 15}}>거래량</Text>
      </View>
    </View>
  )
}

const Coin = (coin, base, price) => {
  return (
    <View>
      <TouchableOpacity onPress={this._handlePress} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{}}>
          <View>
              <Text style={{fontSize: 20}}>이더리움</Text>
          </View>
          <View>
            <Text style={{fontSize: 12}}>ETH/KRW</Text>
          </View>
        </View>
        <View>
          <Text>998,000</Text>
        </View>
        <View style={{color: 'green'}}>
          <Text>+11.46%</Text>
        </View>
        <View style={{}}>
          <Text>64억</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default class MarketTicker extends Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.state = {
      subscribe: store.getState(),
      unsubscribe: store.subscribe(this.updateState)
    }
  }
  componentWillUnmount() {
    this.state.unsubscribe()
  }
  updateState() {
    this.setState({
      subscribe: store.getState()
    })
  }
  render() {
    console.log(this.props.exchange, this.props.base, this.state.subscribe.exchanges[this.props.exchange][this.props.base])
    return (
      <View style={{marginBottom: 85}}>
        <Header/>
        <ScrollView>
          <List>
            <List.Item>
              <Coin />
            </List.Item>
            <List.Item>
              <Coin />
            </List.Item>

          </List>
        </ScrollView>
      </View>
    )
  }

}