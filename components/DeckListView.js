import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { getDecks } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import { white, gray, black, red, pink , orange, purple, lightPurp, blue } from '../utils/colors';
import { connect } from 'react-redux'
import { receiveDecks, addDeck } from '../actions'

class DeckListView extends React.Component {

  componentDidMount() {
    console.log("Component Did Mount");

    getDecks()
      .then(decks => {
        this.props.dispatch(receiveDecks(decks))
      })
    // AsyncStorage.removeItem('FLASH_CARD_KEY');
  }

  componentWillMount() {
    console.log("Component Will Mount");
  }

  onPress = (item) => {
    this.props.navigation.navigate('SingleDeckView', {deck: item})
  }

  render() {
    return (
      <View>
        <View style={{height: 600}}>
          <FlatList
            data={this.props.decks}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => {
              return (
                <View style={styles.center}>
                  <TouchableOpacity style={styles.eachDeckRow} onPress={() => this.onPress(item)}>
                    <Text style={styles.deckNameText}>{item.title}</Text>
                    <Text style={styles.deckCardText}>{`${item.cards} cards`}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        </View>
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={() => this.props.navigation.navigate('NewDeck')}>
          <Text style={styles.submitBtnText}> Add new Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  eachDeckRow: {
    flex: 1,
    alignItems: 'center',
    height: 80,
    backgroundColor: 'steelblue',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginTop: 5
  },
  deckNameText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 12
  },
  deckCardText: {
    color: white,
    fontSize: 14,
    textAlign: 'center'
  },
  center: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
})

function mapStateToProps(decks){

  console.log(decks)

  return {
    decks: Object.keys(decks).map(deck => {return {title: decks[deck].title, cards:decks[deck].questions.length}})
  }

}

export default connect(mapStateToProps)(DeckListView)

