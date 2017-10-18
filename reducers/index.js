import { ADD_DECK, ADD_CARD, RECEIVE_DECKS } from '../actions'

function decks ( state = {}, action) {

	let name_of_deck = '';

	if(action.hasOwnProperty('deck')){
		name_of_deck = action.deck.toLowerCase()
	}

	switch(action.type){

		case ADD_DECK:

			return {
				...state,
				[name_of_deck]: {
					'title': action.deck,
					'questions': []
				}
			}

		case RECEIVE_DECKS:
		
			return {
				...state,
				...action.decks
			}

		case ADD_CARD:

			return {
				...state,
				[name_of_deck]: {
					...state[name_of_deck],
					'questions': state[name_of_deck].questions.concat([action.card])
				}
			}

		default:
			return state
	}
}

export default decks