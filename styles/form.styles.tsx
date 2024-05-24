import { StyleSheet } from 'react-native'

export const form = StyleSheet.create({
	form: {
		display: 'flex',
		gap: 10,
		flex:2
	},
	error_input: {
		borderColor: 'red',
		borderWidth: 1.5,
	},
	icon_right: {
		flex: 0,
		alignSelf: 'center',
		position: 'relative',
		right: 48
	},
	icon_left:{
		alignSelf: 'center',
		position: 'absolute',
		left: 15
		
	},
	brand_icon: {
		paddingRight: 4,
		paddingTop: 3,
		backgroundColor: 'transparent'
	}
})
