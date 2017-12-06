import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Udacity:flashcard'


export const decks = {
                React: {
                  title: 'React',
                  questions: [
                    {
                      question: 'What is React?',
                      answer: 'A library for managing user interfaces'
                    },
                    {
                      question: 'Where do you make Ajax requests in React?',
                      answer: 'The componentDidMount lifecycle event'
                    }
                  ]
                },
                JavaScript: {
                  title: 'JavaScript',
                  questions: [
                    {
                      question: 'What is a closure?',
                      answer: 'The combination of a function and the lexical environment within which that function was declared.'
                    }
                  ]
                }
              }


export function initDecks( data ){
  console.log(data)
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({}))
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY,
                                JSON.stringify({...data}))
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export async function getDeck({key}) {


  try {
    const results = await AsyncStorage.getItem(DECK_STORAGE_KEY);
    if (results !== null){
      return JSON.parse(results)[key]
    }
  }
  catch (error) {
    console.log(error)
  }

}


export function saveDeckTitle({title}){
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY,
                                JSON.stringify({[title]:{
                                  title:title,
                                  questions:[]
                                }

                                }))
}

export function addCardtoDeck ({ card, key }){
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key].questions.push(card)
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(data))

    })
}
