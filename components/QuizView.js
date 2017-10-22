import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'

class SingleDeckView extends React.Component {

  constructor(props){
    super(props)
  }

  state = {
    see_question: true,
    current_card: 0,
    total_cards: 0,
    correct_cards: 0,
    correct_pressed: false,
    incorrect_pressed: false
  }

  componentDidMount(){
    this.setState({
      total_cards: this.props.cards_in_deck.length
    })
  }


  flipTheCard = () => {
    this.setState({see_question:!this.state.see_question})
  }

  correctPressed = () => {
    if(!this.state.correct_pressed){
      this.setState((prevState) => {
        return {
          correct_cards: prevState.correct_cards + 1,
          correct_pressed: true,
          incorrect_pressed: false,
        }
      })
    }
    this.nextCard()
  }

  incorrectPressed = () => {
    if(!this.state.incorrect_pressed){
      this.setState((prevState) => {
        return {
          // correct_cards: prevState.correct_cards>0?prevState.correct_cards-1:prevState.correct_cards,
          incorrect_pressed: true,
          correct_pressed: false
        }
      })
    }
    this.nextCard()
  }

  nextCard = () => {
    if(this.state.current_card <= this.state.total_cards){
      this.setState((prevState) => {
        return {
          current_card:prevState.current_card + 1,
          incorrect_pressed: false,
          correct_pressed: false
        }
      })
    }else{
      alert(this.state.current_card + ' out of ' + this.state.total_cards)
    }
  }

  restartQuiz = () => {
    this.props.navigation.navigate('QuizView', {deck: this.props.navigation.state.params.deck})
  }

  backToDeck = () => {

    const item = {
      title: this.props.navigation.state.params.deck,
      cards: this.state.total_cards
    }

    this.props.navigation.navigate('SingleDeckView', {deck: item})

  }



  render() {
    const deck_title = this.props.navigation.state.params.deck
    return (
      <View style={styles.container}>
        {
          (this.state.current_card < this.state.total_cards) ? (
            <View>
              <View style={{marginLeft: 40, marginRight: 40, marginTop: 20, borderRadius: 7}}>
                <Text style={styles.deckCounterText}>{ (this.state.current_card + 1) + '/' + this.state.total_cards}</Text>
                {
                 <Text style={styles.deckCardText}>{ this.state.correct_cards }</Text>
                }
              </View>
              <View style={{borderColor: 'steelblue', borderWidth: 1, borderRadius: 7, height: 100, marginLeft: 40, marginRight: 40, marginTop: 20}}>
                {this.state.see_question ? <Text style={styles.deckCardText}>{this.props.cards_in_deck[this.state.current_card].question}</Text>:<Text style={styles.deckCardText}>{this.props.cards_in_deck[this.state.current_card].answer}</Text>}
              </View>
              <TouchableOpacity style={styles.ans_quesBtn} onPress={this.flipTheCard}>
                <Text style={styles.ans_quesBtnText}>{this.state.see_question ? 'See Answer':'See Question'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.correctBtn} onPress={this.correctPressed}>
                <Text style={styles.submitBtnText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.incorrectBtn} onPress={this.incorrectPressed}>
                <Text style={styles.submitBtnText}>Incorrect</Text>
              </TouchableOpacity>
              {
                // <TouchableOpacity style={styles.incorrectBtn} onPress={this.nextCard}>
                //   <Text style={styles.submitBtnText}>Next</Text>
                // </TouchableOpacity>
              }
            </View>
          ) : (
            <View>
              <View style={{marginLeft: 40, marginRight: 40, marginTop: 20, borderRadius: 7}}>
                <Text style={styles.resest_back_BtnText}>{(this.state.correct_cards / this.state.total_cards) * 100 + '% correct'}</Text>
              </View>
              <TouchableOpacity style={styles.resest_back_Btn} onPress={this.restartQuiz}>
                <Text style={styles.resest_back_BtnText}> Restart Quiz </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resest_back_Btn} onPress={this.backToDeck}>
                <Text style={styles.resest_back_BtnText}> Back to Deck </Text>
              </TouchableOpacity>
            </View>
          )
        }
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
  ans_quesBtn: {
    padding: 10,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'steelblue',
    height: 35,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 80
  },
  ans_quesBtnText: {
    color: 'steelblue',
    fontSize: 15,
    textAlign: 'center',
  },
  correctBtn: {
    padding: 10,
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor: 'green',
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30
  },
  incorrectBtn: {
    padding: 10,
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor: 'red',
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
  resest_back_Btn: {
    padding: 10,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'steelblue',
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
  resest_back_BtnText: {
    color: 'steelblue',
    fontSize: 22,
    textAlign: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  deckCounterText: {
    color: 'steelblue',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 5
  },
  deckCardText: {
    color: 'steelblue',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
})

function mapStateToProps(decks, ownProps){

  const name_of_deck = ownProps.navigation.state.params.deck.toLowerCase()

  return {
    cards_in_deck: decks[name_of_deck].questions,
    number_of_cards: decks[name_of_deck].questions.length
  }
}

export default connect(mapStateToProps)(SingleDeckView)