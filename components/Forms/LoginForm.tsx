// Node Modules
import React from 'react';
import { SafeAreaView, View, TextInput } from 'react-native'
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '../../styles/text.styles'
import { container } from '../../styles/containers.styles'
// Components
import { Seperator_Text } from '../Views/PaddedView';
import { IconGoogleRound, IconFacebookRound } from '../../constants/Icons';
import CustomButton from '../Buttons/CustomButton';


export default function LoginForm() {
	const router = useRouter();
	return (
		<>
			{/* START OF FORM */}
			<View style={container.form}>
				<TextInput
					style={[container.input_text, text.black]}
					placeholderTextColor={'#BDBDBD'}
					placeholder='Email'
				/>
				<TextInput
					style={[container.input_text, text.black]}
					placeholderTextColor={'#BDBDBD'}
					placeholder="Password"
				/>
				<Seperator_Text style={{ marginVertical: 10 }}>{'Or Log In With'}</Seperator_Text>

				<View style={[container.flex_x, styles.side_buttons]}>
					<CustomButton
						loading={false}
						onPress={() => { }}
						onLongPress={() => { }}
						title="Google"
						iconLeft={<IconGoogleRound style={styles.brand_icon} height={'18'} width={'18'} />}
						iconRight={''}
						activeOpacity={0.8}
						width={'48%'}
						style={[container.bg_yellow, styles.side_button]}
						textStyle={[text.black, text.regular_button]}
						disabled={false}
					/>
					<CustomButton
						loading={false}
						onPress={() => { }}
						onLongPress={() => { }}
						title="Facebook"
						iconLeft={<IconFacebookRound style={styles.brand_icon} height={'18'} width={'18'} />}
						iconRight={''}
						activeOpacity={0.8}
						width={'48%'}
						style={[container.bg_yellow, styles.side_button]}
						textStyle={[text.black, text.regular_button]}
						disabled={false}
					/>
				</View>
			</View>

			{/* Bottom Buttons */}
			<View style={[container.bottom, { gap: 10 }]}>
				<CustomButton
					loading={false}
					onPress={() => { }}
					onLongPress={() => { }}
					title="Log In"
					iconLeft={''}
					iconRight={''}
					activeOpacity={0.8}
					width={'100%'}
					style={container.bg_yellow}
					textStyle={[text.primary_button, text.white]}
					disabled={false}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	side_buttons: {
		justifyContent: 'space-between'
	},
	side_button: {
		backgroundColor: 'rgba(231, 190, 96, .12)',
		borderStyle: 'solid',
		borderColor: '#e7be60',
		borderWidth: 1,
	},
	brand_icon: {
		paddingRight: 4,
		paddingTop: 3,
		backgroundColor: 'transparent'
	}
})