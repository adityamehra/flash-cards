import { AsyncStorage } from 'react-native'


const FLASH_CARD_KEY = 'FLASH_CARD_KEY';

export function getDecks() {
	return AsyncStorage.getItem(FLASH_CARD_KEY)
		.then(result => {
			console.log(result);
			return JSON.parse(result);
		})
}

export function getDeck(deck) {
	return AsyncStorage.getItem(FLASH_CARD_KEY)
		.then(result => {
			json_result = JSON.parse(result)
			console.log(json_result);
			return json_result[deck]
		})
}

const checkIfDeckExists = (name_of_deck) => {
	return AsyncStorage.getItem(FLASH_CARD_KEY)
		.then(result => {
			json_result = JSON.parse(result)
			console.log(json_result);
			if(json_result !== null && json_result.hasOwnProperty(name_of_deck)){
				return true
			}else{
				return false
			}
		})
}

export function saveDeckTitle(name_of_deck) {

	deck = name_of_deck.toLowerCase()
	deck_title = name_of_deck

	const data = {
		title: deck_title,
		questions: []
	}

	return checkIfDeckExists(deck)
		.then(result => {
			if(result){
				return true
			}else{
				AsyncStorage.mergeItem(FLASH_CARD_KEY, JSON.stringify({
					[deck]:data
				}))
				return false
			}
		})
}

export function addCardToDeck({deck, card}) {

	deck = deck.toLowerCase()

	AsyncStorage.getItem(FLASH_CARD_KEY)
		.then(result => {
			const data = JSON.parse(result)
			console.log(data)
			console.log(data[deck])
			data[deck]['questions'].push(card)
			AsyncStorage.mergeItem(FLASH_CARD_KEY, JSON.stringify({
				[deck]: data[deck]
			}))
		}) 
}
