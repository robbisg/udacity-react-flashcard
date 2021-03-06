import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { getDecks, saveDeckTitle, initDecks, decks } from '../utils/api'
import { DeckView, AddQuestion } from './DeckView'
import { QuizView, QuizResults } from './Quiz'
import { FormLabel, FormInput } from 'react-native-elements'
import { Button, Card, Text } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'




export class AddDeck extends Component {

  state = {
    title: ""
  }

  onAddDeck = () => {
    saveDeckTitle({title: this.state.title})
      .then(() => {
    const navigateAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
          NavigationActions.navigate({ routeName: 'Deck', params:{deck: this.state.title}})
        ]
    })

    this.props.navigation.dispatch(navigateAction)
  })
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
          //iconRight={{name: 'add'}}
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
          title: "",
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
            //iconRight={{name: 'arrow-forward'}}
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

  importDecks = () => {
    initDecks(decks).then(() => {
      this.updateDecks()
    })
  }

  updateDecks = () => {
    getDecks().then((data) => {
      this.setState({decks: JSON.parse(data)})
    })
  }

  componentWillReceiveProps() {
    //console.log("ReceiveProps")
    this.updateDecks()
  }


  componentDidMount() {
    //console.log("DidMount")
    this.updateDecks()
  }


  render(){
    //console.log(this.state.decks)
    if (this.state.decks === null){
      return (
        <View>
          <Text h4 style={{textAlign:'center', margin: 30}}>Decks not present in the database!</Text>
          <Button
            //iconRight={{name: 'arrow-forward'}}
            backgroundColor='#03A9F4'
            onPress={() => this.props.navigation.navigate('Add')}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
          title='Add Deck!' />
          <Button
            //iconRight={{name: 'arrow-forward'}}
            backgroundColor='#03A9F4'
            onPress={this.importDecks}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
          title='Import custom decks' />
        </View>
      )
    }


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
