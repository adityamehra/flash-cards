import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'

class SingleDeckView extends React.Component {
  render() {
    const deck_title = this.props.navigation.state.params.deck.title
    return (
      <View style={styles.container}>
        <Text style={styles.deckNameText}>{deck_title}</Text>
        <Text style={styles.deckCardText}>{this.props.number_of_cards  + ' cards'}</Text>
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={() => this.props.navigation.navigate('NewCard', {deck: deck_title })}>
          <Text style={styles.submitBtnText}>Add Question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iosSubmitBtn}>
          <Text style={styles.submitBtnText}>Start Quiz</Text>
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
  iosSubmitBtn: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  deckNameText: {
    color: white,
    fontSize: 30,
    textAlign: 'center',
    marginTop: 50
  },
  deckCardText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
    marginTop: 5
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
})

function mapStateToProps(decks, ownProps){
  return {
    number_of_cards: decks[ownProps.navigation.state.params.deck.title.toLowerCase()].questions.length
  }
}

export default connect(mapStateToProps)(SingleDeckView)