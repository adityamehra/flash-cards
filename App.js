import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import DeckListView from './components/DeckListView'
import SingleDeckView from './components/SingleDeckView'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import QuizView from './components/QuizView'
import { setLocalNotification } from './utils/helper'

const Stack = StackNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: () => ({
      title: 'Flashcards'
    })
  },
  SingleDeckView: {
    screen: SingleDeckView,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.deck.title}`,
    }),
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: () => ({
      title: 'New Deck',
    })
  },
  NewCard:{
    screen: NewCard,
    navigationOptions: () => ({
      title: 'New Card',
    })
  },
  QuizView:{
    screen: QuizView,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.deck}'s quiz`,
    })
  }
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
          <Stack />
      </Provider>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
