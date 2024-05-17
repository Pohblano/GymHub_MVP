// Node Modules
import React from 'react';
import { SafeAreaView, View } from 'react-native'
// * Routing
import { useNavigation, useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
// Components
import CustomButton from '../../components/Buttons/CustomButton'
import { HorizontalPaddedView } from '../../components/Views/PaddedView'
import { BoldText, SemiBoldText } from '../../components/Text/StyledText';
import { IconPressable } from '../../components/Buttons/CustomPressable';


export default function SelectionScreen() {
	const navigation = useNavigation();
	const router = useRouter();
	return (
		<SafeAreaView style={styles.wrapper}>
			<HorizontalPaddedView>
				<IconPressable
					style={[styles.back_button, styles.text_black, styles.largeText]}
					icon={'chevron-left'}
					size={30}
					onPress={() => router.back()}
					activeOpacity={0.8}
					></IconPressable>

				{/* Logo */}
				<View style={styles.logo}>
					<BoldText style={[styles.text_black, styles.largestText]}>
						GYM/<SemiBoldText style={styles.text_yellow}>HUB</SemiBoldText>
					</BoldText>
				</View>

				{/* Bottom Buttons */}
				<View style={styles.bottom_container}>
					<CustomButton
						loading={false}
						onPress={() => {}}
						onLongPress={() => { }}
						title="Log In"
						iconLeft={''}
						iconRight={''}
						activeOpacity={0.8}
						style={styles.bg_black}
						textStyle={[styles.button_text, styles.text_yellow]}
						disabled={false}
					/>
					<CustomButton
						loading={false}
						onPress={() => {}}
						onLongPress={() => { }}
						title="Sign Up"
						iconLeft={''}
						iconRight={''}
						activeOpacity={0.8}
						style={styles.bg_yellow}
						textStyle={styles.button_text}
						disabled={false}
					/>
				</View>
			</HorizontalPaddedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		height: '100%',
		display: 'flex',
		// backgroundColor: '#E7BE60',
	},
	bottom_container: {
		flex: 1,
		display: 'flex',
		gap: 20,
		justifyContent: 'flex-end',
		marginBottom: 10
	},
	logo: {
		flex: 1,
		alignSelf: 'center',
		textAlign: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 60
	},
	back_button:{
		flex:0,
		paddingTop: 10
	},
	bg_black: {
		backgroundColor: '#454545',
	},
	bg_yellow: {
		backgroundColor: '#e7be60',
	},
	button_text: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	text_black: {
		color: '#454545',
	},
	text_yellow: {
		color: '#e7be60',
	},
	smallText: {
		fontSize: 23
	},
	largeText: {
		fontSize: 38
	},
	largestText: {
		fontSize: 50
	},
})