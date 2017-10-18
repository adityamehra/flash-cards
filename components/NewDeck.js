import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { white, black, red, pink , orange, purple, lightPurp, blue } from '../utils/colors';
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class NewDeck extends React.Component {

  state = {
    text: ''
  }

  addNewDeckTitle = () => {
    if (this.state.text.length > 0) {
      saveDeckTitle(this.state.text)
      .then(result => {
        if(result){
          alert('Deck already exists')
        }else{
          this.props.dispatch(addDeck(this.state.text))
        }
      })
    } else {
      alert('Deck name cannot be empty!')
    } 
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>What is the name of the new Deck?</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, margin:40}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={this.addNewDeckTitle}>
          <Text style={styles.submitBtnText}>Add new Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
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
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  headingText: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default connect()(NewDeck)
