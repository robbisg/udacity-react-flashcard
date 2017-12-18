import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { removeEntry, submitEntry, decks } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import { Icon, Slider, Text, Divider } from 'react-native-elements';
import { Button, Card } from 'react-native-elements'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
import range from 'lodash/range';

export class QuizView extends Component {

  state = {
    currentQuestion: 0,
    responses: [],
    totalQuestions: 0

  }

  componentDidMount() {
    this.setState({totalQuestions: this.props.navigation.state.params.questions.length})

  }

  onRestart = () => {
    this.setState({
      currentQuestion: 0,
      responses: [],
    })
  }

  onCorrect = () => {
    this.setState({
      responses: [...this.state.responses, 1],
      currentQuestion: this.state.currentQuestion + 1
    })
  }

  onIncorrect = () => {

    this.setState({
      responses: [...this.state.responses, 0],
      currentQuestion: this.state.currentQuestion + 1
    })
  }


  render(){

    const { questions } = this.props.navigation.state.params
    const { currentQuestion, totalQuestions, responses } = this.state

    if (currentQuestion === totalQuestions){
      return <QuizResults
        responses={responses}
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
            <Text h4 style={{marginBottom: 10, textAlign:'center'}}>
              {question.question}
            </Text>
            { this.state.showAnswer ?
              <View style={{alignItems:'center'}}>
                <Text style={{fontSize: 20, textAlign:'center', marginBottom: 10}}>{question.answer}</Text>
                <TouchableOpacity onPress={this.onShowAnswer}>
                  <Text style={{color:'#000000', fontWeight:'bold'}}> Hide </Text>
                </TouchableOpacity>
              </View>

            :
            <View style={{alignItems:'center'}}>
              <TouchableOpacity onPress={this.onShowAnswer}>
                <Text style={{color:'#EF5350'}}> Show Answer </Text>
              </TouchableOpacity>
            </View>
            }
          </View>
          <Button
            //iconRight={{name: 'check'}}
            backgroundColor='#009688'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 10}}
            onPress={this.props.onCorrect}
          title='Correct' />
          <Button
            //iconRight={{name: 'clear'}}
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
    const { responses, totalQuestions } = this.props
    return(

      <Card title="Results">
        <Rating
          responses={responses}
          total={totalQuestions}
        />
        <Button
          //icon={{name: 'autorenew'}}
          backgroundColor='#009688'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 15}}
          onPress={this.props.onRestart}
        title='Restart' />
        <Button
          //icon={{name: 'home'}}
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
    const { responses, total } = this.props
    const correct = responses.reduce(function(a, b) {
        return a + b;
      }, 0);
    const ratio = (correct/total) * 100
    const percent = ratio.toFixed(2)
    return(
      <View>
        <Text h4 style={{textAlign:'center'}}>{percent} % correct</Text>
        {/**
          <View style={{flexDirection: 'row', justifyContent:'center', marginTop: 12}}>

          {/*
            responses.map((i, index) => {

          if (i == 1) {
            return <Icon key={index} name='check-circle' color="#26A69A" size={30}/>
          //<Icon key={index} name='check-circle' color="#26A69A" size={30}/>
          }
          else{
            return <Icon key={index} name='cancel' color="#F44336" size={30}/>
          }
            *}
            )
          */}
        </View>*/}
      </View>
    )
  }
}
