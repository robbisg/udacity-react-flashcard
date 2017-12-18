import React, { Component } from 'react'
import { View, TouchableOpacity, Text, FlatList, TextInput, KeyboardAvoidingView } from 'react-native'
import { removeEntry, submitEntry, decks } from '../utils/api'
import { Button, Card } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { addCardtoDeck, getDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'

export class DeckView extends Component {

  state = {
    deck: {
      title:"",
      questions:[]
    }
  }


  updateDeck = () => {
    const deckKey = this.props.navigation.state.params.deck
    const nn = getDeck({key: deckKey }).then((r) => {
      console.log(r)
      this.setState({deck: r})
    })

  }
  componentWillReceiveProps(){
    this.updateDeck()
  }

  componentDidMount(){
    this.updateDeck()
  }

  render(){

    const deck = this.state.deck

    return(

      <Card title={deck.title}>
        <Text style={{marginTop: 10, marginBottom:15, textAlign:'center'}}>
          This is the {deck.title} deck, that contains {deck.questions.length} questions.
        </Text>

        <Button
          disabled={ deck.questions.length === 0 ? true : false}
          //iconRight={{name: 'question-answer'}}
          backgroundColor='#009688'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
          onPress={() => this.props.navigation.navigate("QuizView", {questions: deck.questions})}
        title='Start Quiz' />
        <Button
          //iconRight={{name: 'add'}}
          backgroundColor='#FFC107'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
          onPress={() => this.props.navigation.navigate("Questions", {deck: deck.title})}
        title='Add Card' />
      </Card>

    )
  }
}


export class AddQuestion extends Component {

  state = {
    question: "",
    answer:""
  }

 addQuestion = () => {
   const deck = this.props.navigation.state.params.deck
   const data = {
     key: deck,
     card: this.state
   }

   addCardtoDeck(data).then((d) => {

   const navigateAction = NavigationActions.reset({
       index: 1,
       actions: [
         NavigationActions.navigate({ routeName: 'Home'}),
         NavigationActions.navigate({ routeName: 'Deck',
            params: {deck: deck}
       })
       ]
   })

   this.props.navigation.dispatch(navigateAction)
 })
 }


  render(){
    const { deck } = this.props.navigation.state.params
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior='position'>
        <Card title={deck}>

          <Text style={{marginBottom: 10}}>
            Insert new questions.
          </Text>
          <FormLabel>Question</FormLabel>
          <FormInput
            onChangeText={(text) => this.setState({question: text})}
            textInputRef={this.state.question}
          />

          <FormLabel>Answer</FormLabel>
          <FormInput
            onChangeText={(text) => this.setState({answer: text})}
            textInputRef={this.state.question}
          />

          <Button
            //iconRight={{name: 'add'}}
            backgroundColor='#FFC107'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 10}}
            disabled={(question === "" ) || (answer === "") ? true : false }
            onPress={this.addQuestion}
          title='Add Question' />

        </Card>
      </KeyboardAvoidingView>

    )
  }
}
