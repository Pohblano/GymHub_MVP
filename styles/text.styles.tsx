import { StyleSheet } from 'react-native'

export const text = StyleSheet.create({
	// Color
	black: {
		color: '#454545',
	},
	yellow: {
		color: '#e7be60',
	},
	white: {
		color: 'white'
	},
	light_grey: {
		color: '#BDBDBD'
	},
	error:{
		color: 'red',
		fontSize: 12,
	},
	// Size
	small: {
		fontSize: 23
	},
	large: {
		fontSize: 36
	},
	largest: {
		fontSize: 50
	},
	icon:{
		fontSize: 30
	},
	// Categories
	primary_button: {
		fontFamily: 'Montserrat_Bold',
		fontSize: 16,
	},
	regular_button: {
		fontFamily: 'Montserrat_SemiBold',
		fontSize: 14
	},
	option_link:{
		alignSelf: 'center',
		fontSize: 13,
		fontWeight: 'bold'
	}
})
