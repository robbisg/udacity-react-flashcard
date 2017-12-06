import React, { Component } from 'react'
import { View, TouchableOpacity, Text, FlatList, TextInput } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { getDecks, saveDeckTitle } from '../utils/api'
import { DeckView, AddQuestion } from './DeckView'
import { QuizView, QuizResults } from './Quiz'
import { FormLabel, FormInput } from 'react-native-elements'
import { Button, Card } from 'react-native-elements'

export class AddDeck extends Component {

  state = {
    title: ""
  }

  onAddDeck = () => {
    saveDeckTitle({title: this.state.title})
    this.props.navigation.navigate("DeckList")
  }

  render(){
    return(

      <Card title="Add Deck">
        <FormLabel>Deck title</FormLabel>
        <FormInput
          onChangeText={(text) => this.setState({title: text})}
          textInputRef={this.state.title}
        />
        <Button
          iconRight={{name: 'add'}}
          backgroundColor='#FFC107'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 10}}
          onPress={this.onAddDeck}
        title='Add Deck' />
      </Card>
    )
  }
}




export class DeckItem extends Component {

  static defaultProps = {
        deck: {
          title: "Undefined",
          questions: []
        }
      }

  render(){
    const { deck } = this.props
    return (

      <Card
        title={deck.title}>
        <Text style={{textAlign:'center'}}>This deck contains {deck.questions.length} questions</Text>
        <Button
          iconRight={{name: 'arrow-forward'}}
          backgroundColor='#03A9F4'
          onPress={() => this.props.navigation.navigate('Deck', {deck: deck.title})}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
        title='Go to deck' />
      </Card>
    )
  }
}


export class DeckList extends Component {

  state = {
    decks: {}
  }


  updateDecks = () => {
    getDecks().then((data) => {
      this.setState({decks: JSON.parse(data)})
    })
  }

  componentWillReceiveProps() {
    this.updateDecks()
  }


  componentDidMount() {
    this.updateDecks()
  }


  render(){
    return (
      <View>
        <FlatList
          data={Object.keys(this.state.decks)}
          renderItem={({item}) => <DeckItem key={item} deck={this.state.decks[item]} navigation={this.props.navigation}/>}
          keyExtractor={(item, index) => index} 
        />

      </View>
    )
  }
}

export const DeckNavigator = StackNavigator({
        Home: {screen: DeckList,},
        Deck: {screen: DeckView,},
        Questions: {screen: AddQuestion},
        QuizView: {screen: QuizView},
        QuizResults: {screen: QuizResults}
      })
