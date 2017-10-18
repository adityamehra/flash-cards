import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import DeckListView from './components/DeckListView'
import SingleDeckView from './components/SingleDeckView'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

const Stack = StackNavigator({
  DeckListView: {
    screen: DeckListView
  },
  SingleDeckView: {
    screen: SingleDeckView
  },
  NewDeck: {
    screen: NewDeck
  },
  NewCard:{
    screen: NewCard
  }
})

export default class App extends React.Component {
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
