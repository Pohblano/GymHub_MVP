import { StyleSheet } from 'react-native'

export const container = StyleSheet.create({
	// Color
	bg_black: {
		backgroundColor: '#454545',
	},
	bg_yellow: {
		backgroundColor: '#e7be60',
	},
	bg_white:{
		backgroundColor: '#FFFFFF',
	},
	// Containers
	wrapper: {
		flex: 1,
		height: '100%',
		display: 'flex',
	},
	flex_x: {
		display: 'flex',
		flexDirection: 'row'
	},
	form: {
		display: 'flex',
		gap: 10,
		flex:2
	},
	header:{
		flex:1,
		justifyContent: 'flex-end',
		marginBottom: 100
	},
	bottom: {
		flex: 1,
		display: 'flex',
		gap: 20,
		justifyContent: 'flex-end',
		marginBottom: 10
	},
	logo: {
		flex:1,
		alignSelf: 'center',
		textAlign: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 60,
	},
	back_button:{
		flex:0,
		paddingTop: 10
	},
	input_text: {
		width: '100%',
		height: 50,
		paddingHorizontal: 20,
		fontSize: 16,
		fontWeight: 'medium',
		borderColor: '#e7be60',
		borderRadius: 8,
		borderStyle: 'solid',
		borderWidth: 1.5,
	}
})
