import { StyleSheet } from 'react-native'

export const container = StyleSheet.create({
	// Color
	bg_black: {
		backgroundColor: 'rgba(0, 0, 0, 0.842)',
	},
	bg_yellow: {
		backgroundColor: '#e7be60',
	},
	bg_white:{
		backgroundColor: '#FFFFFF',
	},
	bg_grey:{
		backgroundColor: '#F5F4F7'
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
	settings_header:{
		display: 'flex',
		marginTop: 30
	},
	bottom: {
		flex: 1,
		display: 'flex',
		gap: 10,
		justifyContent: 'flex-end',
	},
	logo: {
		flex:1,
		alignSelf: 'center',
		textAlign: 'center',
		justifyContent: 'flex-end',
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
