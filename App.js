import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { DeckNavigator, AddDeck } from './components/Home'
import { Constants } from 'expo'
import { initDecks, decks, clear } from './utils/api'
import { setLocalNotification } from './utils/notifications'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckNavigator,
  },
  Add: {
    screen: AddDeck,
  }},{
    tabBarPosition:'top'
  }
)



export default class App extends React.Component {


  componentDidMount() {
    //clear()
    //initDecks(decks)
    setLocalNotification()

  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{ backgroundColor: "#000", height: Constants.statusBarHeight }}>
          <StatusBar
            backgroundColor="black"
            barStyle="light-content"
          />

        </View>
        <View style={styles.container}>
          <Tabs />
        </View>
    </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop:10,
    //alignItems: 'center',
    justifyContent: 'center',
  },
});
