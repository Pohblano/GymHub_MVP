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
import { BoldText, SemiBoldText } from '../../components/Text/StyledText';
import { IconPressable } from '../../components/Buttons/CustomPressable';


export default function SelectionScreen() {
	const router = useRouter();
	return (
		<SafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				<IconPressable
					style={[container.back_button,text.black, text.icon]}
					icon={'chevron-left'}
					onPress={() => router.back()}
					></IconPressable>

				{/* Logo */}
				<View style={container.logo}>
					<BoldText style={[text.black, text.largest]}>
						GYM/<SemiBoldText style={text.yellow}>HUB</SemiBoldText>
					</BoldText>
				</View>

				{/* Bottom Buttons */}
				<View style={container.bottom}>
					<CustomButton
						loading={false}
						onPress={() => {router.push('(Active_User)/LoginScreen')}}
						onLongPress={() => { }}
						title="Log In"
						iconLeft={''}
						iconRight={''}
						activeOpacity={0.8}
						width={'100%'}
						style={container.bg_black}
						textStyle={[text.primary_button, text.white]}
						disabled={false}
					/>
					<CustomButton
						loading={false}
						onPress={() => {router.push('(New_User)/SignupScreen')}}
						onLongPress={() => { }}
						title="Sign Up"
						iconLeft={''}
						iconRight={''}
						activeOpacity={0.8}
						width={'100%'}
						style={container.bg_yellow}
						textStyle={[text.primary_button, text.white]}
						disabled={false}
					/>
				</View>
			</HorizontalPaddedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({

})