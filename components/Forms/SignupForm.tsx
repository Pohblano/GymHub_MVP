// Node Modules
import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Pressable } from 'react-native'
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '../../styles/text.styles'
import { container } from '../../styles/containers.styles'
// Components
import { Text } from '../Themed';
import { Seperator_Text } from '../Views/PaddedView';
import { IconGoogleRound, IconFacebookRound, IconShowPassword, IconHidePassword } from '../../constants/Icons';
import CustomButton from '../Buttons/CustomButton';



export default function SignupForm() {
	const router = useRouter();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isPassVisible, setPassVisible] = useState(false)
	const [isConfirmPassVisible, setConfirmPassVisible] = useState(false)
	const [error, setError] = useState({})

	const handleSignUp = () => {
		if (password !== confirmPassword) {
			setError({ message: 'Passwords do not match.' })
			console.log('Passwords do not match')
		}
	}

	return (
		<>
			{/* START OF FORM */}
			<View style={container.form}>
				<TextInput
					style={[container.input_text, text.black]}
					placeholderTextColor={'#BDBDBD'}
					placeholder='Email'
					value={email}
					onChangeText={setEmail}
				/>
				<PasswordInput
					value={password}
					setValue={setPassword}
					visible={isPassVisible}
					setVisible={setPassVisible}
					placeholder={'Password'}
					containerStyle={{}}
					inputStyle={[container.input_text, text.black]}
					iconStyle={{}}
				/>
				<PasswordInput
					value={confirmPassword}
					setValue={setConfirmPassword}
					visible={isConfirmPassVisible}
					setVisible={setConfirmPassVisible}
					placeholder={'Confirm Password'}
					containerStyle={{}}
					inputStyle={[container.input_text, text.black]}
					iconStyle={{}}
				/>

				<Seperator_Text style={{ marginVertical: 10 }}>{'Or Sign Up With'}</Seperator_Text>

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
	},
	container_password: {
		flex: 0,
		alignSelf: 'center',
		position: 'relative',
		right: 48
	}

})


function PasswordInput({ value, setValue, visible, setVisible, placeholder, containerStyle, inputStyle, iconStyle }) {
	return (
		<View style={[containerStyle, container.flex_x, text.light_grey]}>
			<TextInput
				style={inputStyle}
				placeholderTextColor={'#BDBDBD'}
				placeholder={placeholder}
				value={value}
				onChangeText={setValue}
				secureTextEntry={!visible}
			/>
			<Pressable onPress={() => setVisible(!visible)} style={[styles.container_password]}>
				{visible ? 
				<IconShowPassword height={'32'} width={'32'} iconStyle={{fill: '#898989'}} containerStyle={{}}/> 
				: 
				<IconHidePassword height={'32'} width={'32'} containerStyle={{}} iconStyle={{fill: '#898989'}} />
				}

			</Pressable>
		</View>
	)
}