import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helper'

class SingleDeckView extends React.Component {

  _onPress = () => {
    if(this.props.number_of_cards > 0) {
      this.props.navigation.navigate('QuizView', {deck: this.props.navigation.state.params.deck.title})
      clearLocalNotification()
        .then(setLocalNotification)
    } else {
      alert('There are no cards in the deck.')
    }
  }

  render() {
    const deck_title = this.props.navigation.state.params.deck.title
    return (
      <View style={styles.container}>
        <View style={{borderWidth: 1, borderColor: 'steelblue', borderRadius: 7, marginLeft: 40, marginRight: 40, marginTop: 20}}>
          <Text style={styles.deckTitleText}>{deck_title}</Text>
          <Text style={styles.deckCardText}>{this.props.number_of_cards  + ' cards'}</Text>
        </View>
        <TouchableOpacity style={styles.iosAddBtn} onPress={() => this.props.navigation.navigate('NewCard', {deck: deck_title })}>
          <Text style={styles.addBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iosAddBtn} onPress={this._onPress}>
          <Text style={styles.addBtnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'powderblue',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosAddBtn: {
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'steelblue',
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
  addBtnText: {
    color: 'steelblue',
    fontSize: 22,
    textAlign: 'center',
  },
  deckTitleText: {
    color: 'steelblue',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 30
  },
  deckCardText: {
    color: 'steelblue',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
})

function mapStateToProps(decks, ownProps){

  const name_of_deck = ownProps.navigation.state.params.deck.title.toLowerCase()

  return {
    number_of_cards: decks[name_of_deck].questions.length
  }

}

export default connect(mapStateToProps)(SingleDeckView)
