// Node Modules
import React from 'react';
import { SafeAreaView, View } from 'react-native'
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'


// Components
import CustomButton from '../../components/Buttons/CustomButton'
import { HorizontalPaddedView } from '../../components/Views/PaddedView'
import { BoldText, MediumText, SemiBoldText } from '../../components/Text/StyledText';


export default function StartUpScreen() {
	const router = useRouter()
	return (
		<SafeAreaView style={styles.container}>
			<HorizontalPaddedView>

				{/* Logo */}
				<View style={styles.logo}>
					<BoldText style={[styles.whiteText, styles.largestText]}>
						GYM/<SemiBoldText style={styles.displayText}>HUB</SemiBoldText>
					</BoldText>
				</View>

				{/* Bottom Text */}
				<View style={styles.bottom_container}>
					<MediumText style={[styles.whiteText, styles.smallText]}>
						{'Join the \n'}
						<MediumText style={[styles.whiteText, styles.largeText]}>{'Online Gym Community'}</MediumText>
					</MediumText>
					<CustomButton
						loading={false}
						onPress={() => router.push('SelectionScreen')}
						onLongPress={() => { }}
						title="Get Started"
						iconLeft={''}
						iconRight={''}
						activeOpacity={0.8}
						style={styles.customButton}
						textStyle={styles.customButtonText}
						disabled={false}
					/>
				</View>
			</HorizontalPaddedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		display: 'flex',
		backgroundColor: '#E7BE60',
	},
	bottom_container: {
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
	customButton: {
		alignSelf: 'center',
		backgroundColor: '#FFFFFF',
	},
	customButtonText: {
		color: '#454545',
		fontWeight: 'bold',
		fontSize: 16,
	},
	whiteText: {
		color: 'white'
	},
	displayText:{
		color: '#454545',
	},
	smallText: {
		fontSize: 23
	},
	largeText: {
		fontSize: 38
	},
	largestText:{
		fontSize: 50
	},
})