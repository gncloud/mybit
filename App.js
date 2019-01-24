import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image 
} from 'react-native'
import {
  TabBar
} from 'antd-mobile-rn'
import { 
  SafeAreaView 
} from 'react-navigation'
import Exchange from '@screens/Exchange'
import Assets from '@screens/Assets'
import Chart from '@screens/Chart'
import Account from '@screens/Account'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'Exchange'
    }
    this.onChangeTab = this.onChangeTab.bind(this)
  }
  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    })
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}} 
                    forceInset={{bottom: 'never'}}>
        <TabBar unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="#f5f5f5">
          <TabBar.Item title="거래소"
                       selected={this.state.selectedTab === 'Exchange'}
                       onPress={() => this.onChangeTab('Exchange')}>
            <Exchange />
          </TabBar.Item>
          <TabBar.Item title="차트"
                       selected={this.state.selectedTab === 'Chart'}
                       onPress={() => this.onChangeTab('Chart')}>
            <Chart />
          </TabBar.Item>
          <TabBar.Item title="자산관리"
                       selected={this.state.selectedTab === 'Assets'}
                       onPress={() => this.onChangeTab('Assets')}>
            <Assets />
          </TabBar.Item>
          <TabBar.Item title="마이페이지"
                       selected={this.state.selectedTab === 'Account'}
                       onPress={() => this.onChangeTab('Account')}>
            <Account />
          </TabBar.Item>
        </TabBar>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})


// {
//   "navTheme": "dark",
//   "primaryColor": "#1890FF",
//   "layout": "sidemenu",
//   "contentWidth": "Fluid",
//   "fixedHeader": false,
//   "autoHideHeader": false,
//   "fixSiderbar": false,
//   "title": "Ant Design Pro",
//   "collapse": true
// }