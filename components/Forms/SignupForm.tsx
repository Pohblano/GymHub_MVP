// Node Modules
import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable } from 'react-native'
import { useFormik } from 'formik';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
// import {text, container, form} from '@/styles'
// import container from '@/styles';
// import form from '@/styles';
import{ text} from '../../styles/text.styles'
import {container} from '../../styles/containers.styles'
import {form} from '../../styles/form.styles'
// Components
import { Text } from '../Themed';
import { Seperator_Text } from '../Views/PaddedView';
import { IconGoogleRound, IconFacebookRound, IconShowPassword, IconHidePassword } from '../../constants/Icons';
import CustomButton from '../Buttons/CustomButton';
// Api
import AuthApi from '../../api/Auth.api'
// // Firebase
// import {auth, db} from '../../firebase.config'
// import {createUserWithEmailAndPassword } from '@firebase/auth'
// // import {getFirestore, collection, getDocs} from'@firebase/firestore'

// const create_user = async (response) =>{
// 	const newUser = response.user
// 	db.collection('users').add({
// 		email: newUser.email,
// 		password: newUser.passWord,
// 		created_on: ',',

// 	})
// 	.then((docRef) => {
// 		console.log("Document written with ID: ", docRef.id);
// 	})
// 	.catch((error) => {
// 		console.error("Error adding document: ", error);
// 	}); 
// }

// Schema
import { SignupSchema } from '@/utils/validation';
import { useAuth } from '@/context/Auth.context';


export default function SignupForm({setScreenLoading}) {
	const router = useRouter();
	const [isPassVisible, setPassVisible] = useState(false)
	const [isConfirmPassVisible, setConfirmPassVisible] = useState(false)
	const [loading, setLoading] = useState(false)

	const {register} = useAuth()

	useEffect(() => {
		let timer: string | number | NodeJS.Timeout | undefined;
		if (isConfirmPassVisible) {
			timer = setTimeout(() => {
				setConfirmPassVisible(false);
			}, 1000); // Hide confirm password after 1 second
		} else if (isPassVisible) {
			timer = setTimeout(() => {
				setPassVisible(false);
			}, 1000); // Hide confirm password after 1 second
		}

		return () => clearTimeout(timer);
	}, [isConfirmPassVisible, isPassVisible]);


	const formik = useFormik({
		initialValues: { email: '', password: '', confirmPassword: '' },
		validationSchema: SignupSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {

			let response = await register(values.email, values.password, setErrors, setSubmitting)
			
			// AuthApi.RegisterUserWithEmailAndPassword(values.email, values.password, setErrors, setSubmitting)

			
		},
	});



	return (
		<>
			{/* START OF FORM */}
			<View style={container.form}>
				<TextInput
					style={[
						container.input_text, text.black,
						formik.touched.email && formik.errors.email ? form.error_input : null]}
					placeholderTextColor={'#BDBDBD'}
					placeholder='Email'
					value={formik.values.email}
					onChangeText={formik.handleChange('email')}
					onBlur={formik.handleBlur('email')}
				/>
				{formik.touched.email && formik.errors.email ? (
					<Text style={text.error} >{formik.errors.email}</Text>
				) : null}
				<PasswordInput
					value={formik.values.password}
					setValue={formik.handleChange('password')}
					visible={isPassVisible}
					setVisible={setPassVisible}
					placeholder={'Password'}
					containerStyle={{}}
					inputStyle={[
						container.input_text, text.black,
						formik.touched.password && formik.errors.password ? form.error_input : null]}
					iconStyle={{}}
				/>
				{formik.touched.password && formik.errors.password ? (
					<Text style={text.error}>{formik.errors.password}</Text>
				) : null}

				<PasswordInput
					value={formik.values.confirmPassword}
					setValue={formik.handleChange('confirmPassword')}
					visible={isConfirmPassVisible}
					setVisible={setConfirmPassVisible}
					placeholder={'Confirm Password'}
					containerStyle={{}}
					inputStyle={[
						container.input_text, text.black,
						formik.touched.confirmPassword && formik.errors.confirmPassword ? form.error_input : null]}
					iconStyle={{}}
				/>
				{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
					<Text style={text.error}>{formik.errors.confirmPassword}</Text>
				) : null}


				<Seperator_Text style={{ marginVertical: 10 }}>{'Or Sign Up With'}</Seperator_Text>

				<View style={[container.flex_x, styles.side_buttons]}>
					<CustomButton
						loading={false}
						onPress={() => { }}
						onLongPress={() => { }}
						title="Google"
						iconLeft={<IconGoogleRound style={form.brand_icon} height={'18'} width={'18'} />}
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
						iconLeft={<IconFacebookRound style={form.brand_icon} height={'18'} width={'18'} />}
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
					loading={formik.isSubmitting}
					onPress={formik.handleSubmit}
					onLongPress={() => { }}
					title="Sign Up"
					iconLeft={''}
					iconRight={''}
					activeOpacity={0.8}
					width={'100%'}
					style={container.bg_yellow}
					textStyle={[text.primary_button, text.white]}
					disabled={formik.isSubmitting}
				/>
			</View>
		</>
	)
}


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
			<Pressable onPress={() => setVisible(!visible)} style={[form.icon_right]}>
				{visible ?
					<IconShowPassword height={'32'} width={'32'} iconStyle={{ fill: '#898989' }} containerStyle={{}} />
					:
					<IconHidePassword height={'32'} width={'32'} containerStyle={{}} iconStyle={{ fill: '#898989' }} />
				}

			</Pressable>
		</View>
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

})


