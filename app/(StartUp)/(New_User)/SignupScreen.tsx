// Node Modules
import React,{useState} from 'react';
import { SafeAreaView, View, TextInput } from 'react-native'
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '../../../styles/text.styles'
import { container } from '../../../styles/containers.styles'
// Components
import { HorizontalPaddedView } from '../../../components/Views/PaddedView'
import { BoldText } from '../../../components/Text/StyledText';
import { IconPressable } from '../../../components/Buttons/CustomPressable';
import CustomLink from '../../../components/Buttons/CustomLink';
import SignupForm from '../../../components/Forms/SignupForm';

export default function SignupScreen() {
	const router = useRouter();
	const [screenLoading, setScreenLoading] = useState(false)
	return (
		<SafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				{/* Back Button */}
				<IconPressable
					style={[container.back_button, text.black, text.icon]}
					icon={'chevron-left'}
					onPress={() => router.back()}
				></IconPressable>

				{/* Header */}
				<View style={container.header}>
					<BoldText style={[text.large, text.black]}>{'Create\nAccount.'}</BoldText>
				</View>

				{/* Form */}
				<SignupForm setScreenLoading={setScreenLoading}/>

				{/* Recover Password */}
				<CustomLink
					loading={false}
					onPress={() => { router.push('../(Active_User)/LoginScreen') }}
					onLongPress={() => { }}
					title="Sign In"
					iconLeft={'Have an account? '}
					iconRight={''}
					style={{alignSelf: 'center', marginBottom: 0}}
					textStyle={text.option_link}
					disabled={false}
				/>
			</HorizontalPaddedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	side_buttons:{
		justifyContent: 'space-between'
	},
	side_button: {
		backgroundColor: 'rgba(231, 190, 96, .12)',
		borderStyle:'solid',
		borderColor: '#e7be60',
		borderWidth: 1,
	},
	brand_icon:{
		paddingRight: 4,
		paddingTop: 3,
		backgroundColor: 'transparent'
	}
})