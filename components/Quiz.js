import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { removeEntry, submitEntry, decks } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import { Icon, Slider, Text } from 'react-native-elements';
import { Button, Card } from 'react-native-elements'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
import range from 'lodash/range';

export class QuizView extends Component {

  state = {
    currentQuestion: 0,
    correctAnswers: 0,
    totalQuestions: 0

  }

  componentDidMount() {
    this.setState({totalQuestions: this.props.navigation.state.params.questions.length})

  }

  onRestart = () => {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
    })
  }

  onCorrect = () => {

    this.setState({
      correctAnswers: this.state.correctAnswers + 1,
    })
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })

  }

  onIncorrect = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })
  }


  render(){

    const { questions } = this.props.navigation.state.params
    const { currentQuestion, totalQuestions, correctAnswers } = this.state

    if (currentQuestion === totalQuestions){
      return <QuizResults
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
        onRestart={this.onRestart}
        navigation={this.props.navigation}
      />

    }
    else {

          return (
            <View>
              <Text style={{textAlign:'center'}}>Quiz Progress {currentQuestion+1} / {totalQuestions}</Text>
              <Slider
                disabled
                value={currentQuestion}
                maximumValue={totalQuestions}
                step={1}
              />
              <QuizItem
                question={questions[currentQuestion]}
                onCorrect={this.onCorrect}
                onIncorrect={this.onIncorrect}
              />

            </View>
          )
        }
      }
}



export class QuizItem extends Component {


  state = {
    showAnswer: false
  }

  onShowAnswer = () => {
    this.setState({showAnswer: !this.state.showAnswer})
  }

    render(){
      const { question } = this.props
      return(

        <Card title="Question">
          <View >
            <Text style={{marginBottom: 10, textAlign:'center'}}>
              {question.question}
            </Text>
            { this.state.showAnswer ?
              <View style={{alignItems:'center'}}>
                <Text>{question.answer}</Text>
                <TouchableOpacity onPress={this.onShowAnswer}>
                  <Text> Hide </Text>
                </TouchableOpacity>
              </View>

            :
            <View style={{alignItems:'center'}}>
              <TouchableOpacity onPress={this.onShowAnswer}>
                <Text> Show Answer </Text>
              </TouchableOpacity>
            </View>
            }
          </View>
          <Button
            iconRight={{name: 'check'}}
            backgroundColor='#009688'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 10}}
            onPress={this.props.onCorrect}
          title='Correct' />
          <Button
            iconRight={{name: 'clear'}}
            backgroundColor='#EF5350'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
            onPress={this.props.onIncorrect}
          title='Incorrect' />
        </Card>

    )
    }

  }

export class QuizResults extends Component {


  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  render(){
    const { correctAnswers, totalQuestions } = this.props
    return(

      <Card title="Results">
        <Rating
          correct={correctAnswers}
          total={totalQuestions}
        />
        <Button
          icon={{name: 'autorenew'}}
          backgroundColor='#009688'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 15}}
          onPress={this.props.onRestart}
        title='Restart' />
        <Button
          icon={{name: 'home'}}
          backgroundColor='#009688'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 15}}
          onPress={() => this.props.navigation.navigate("Home")}
        title='Home' />

      </Card>

  )
  }

}

export class Rating extends Component {
  render(){
    return(
      <View>
        <Text h4 style={{textAlign:'center'}}>{100*this.props.correct/this.props.total} % correct</Text>
        <View style={{flexDirection: 'row', justifyContent:'center', marginTop: 12}}>

          {
            range(this.props.total).map((i) => {

              if (i < this.props.correct) {
                return <Icon name='check-circle' color="#26A69A" size={30}/>
              }
              else{
                return <Icon name='cancel' color="#F44336" size={30}/>
              }
            }
            )
          }
        </View>
      </View>
    )
  }
}
