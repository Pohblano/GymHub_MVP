// Node Modules
import React from 'react';
import { SafeAreaView, View } from 'react-native'
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import {text} from '../../styles/text.styles'
import {container} from '../../styles/containers.styles'

// Components
import CustomButton from '../../components/Buttons/CustomButton'
import { HorizontalPaddedView } from '../../components/Views/PaddedView'
import { BoldText, MediumText, SemiBoldText } from '../../components/Text/StyledText';


export default function StartUpScreen() {
	const router = useRouter()
	return (
		<SafeAreaView style={[container.bg_yellow, container.wrapper]}>
			<HorizontalPaddedView>

				{/* Logo */}
				<View style={container.logo}>
					<BoldText style={[text.white, text.largest]}>
						GYM/<SemiBoldText style={text.black}>HUB</SemiBoldText>
					</BoldText>
				</View>

				{/* Bottom Text */}
				<View style={container.bottom}>
					<MediumText style={[text.white, text.small]}>
						{'Join the \n'}
						<MediumText style={[text.white, text.large]}>{'Online Gym Community'}</MediumText>
					</MediumText>
					<CustomButton
						loading={false}
						onPress={() => router.push('SelectionScreen')}
						onLongPress={() => { }}
						title="Get Started"
						iconLeft={''}
						iconRight={''}
						activeOpacity={0.8}
						width={'100%'}
						style={container.bg_white}
						textStyle={[text.black, text.primary_button] }
						disabled={false}
					/>
				</View>
			</HorizontalPaddedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	
	
	
})