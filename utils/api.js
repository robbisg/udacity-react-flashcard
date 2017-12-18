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

export function clear(){
  AsyncStorage.clear()
}

export function initDecks( data ){
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then((res) => {
    if (res === null){
      return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({...data}))
    }

  })
  .catch((error) => {console.log(error)}
  )


}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}


export async function getDeck({key}) {

  try {
    const results = await AsyncStorage.getItem(DECK_STORAGE_KEY);
    if (results !== null){
      const data = JSON.parse(results)
      return data[key]
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
      return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(data))

    })
}
