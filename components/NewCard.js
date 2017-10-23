import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StyeSheet, TextInput } from 'react-native';
import { white, black, red, pink , orange, purple, lightPurp, blue } from '../utils/colors';
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'

class NewCard extends Component {

  state = {
    question: '',
    answer: '',
    deck: ''
  }

  addNewCard = ({deck, card}) => {
    if(this.state.question.length >= 4 && this.state.answer.length >= 2){
      this.setState({question:'', answer:''})
      addCardToDeck({deck, card})
      console.log(this.props.decks)
      this.props.dispatch(addCard({deck, card}))
      // console.log(this.props.decks)
      // this.setState({question:'' ,answer: ''})
      alert('Card is added')
    }else{
      alert('Question/Answer is missing')
    }
  }

  componentDidMount() {
    this.setState({deck: this.props.navigation.state.params.deck})
  }

  render() {
    const deck_title = this.state.deck
    // console.log(deck_title)
    // console.log(this.state.question)
    // console.log(this.state.answer)
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>Question:</Text>
        <TextInput
          style={{height: 40, borderColor: 'steelblue', borderWidth: 1, borderRadius: 7, marginLeft:40, marginRight:40, marginTop: 10}}
          onChangeText={(text) => this.setState({question:text})}
          value={this.state.question}
        />
        <Text style={styles.headingText}>Answer:</Text>
        <TextInput
          style={{height: 40, borderColor: 'steelblue', borderWidth: 1, borderRadius: 7,  marginLeft:40, marginRight:40, marginTop: 10}}
          onChangeText={(text) => this.setState({answer:text})}
          value={this.state.answer}
        />
        <TouchableOpacity style={styles.iosAddBtn} onPress={() => {this.addNewCard({deck: deck_title, card: {question: this.state.question, answer: this.state.answer}})}}>
          <Text style={styles.addBtnText}>Add new Card</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'powderblue'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosAddBtn: {
    borderColor: 'steelblue',
    borderRadius: 7,
    borderWidth: 1,
    padding: 10,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 50
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: 'steelblue',
    fontSize: 22,
    textAlign: 'center',
  },
  headingText: {
    color: 'steelblue',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(NewCard)
