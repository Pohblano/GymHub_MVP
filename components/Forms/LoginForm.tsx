// Node Modules
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Pressable } from 'react-native'
import { useFormik } from 'formik';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { form } from '@/styles/form.styles'
// Components
import { Text } from '../Themed';
import { Seperator_Text } from '../Views/PaddedView';
import { IconGoogleRound, IconFacebookRound, IconShowPassword, IconHidePassword } from '@/constants/Icons';
import CustomButton from '../Buttons/CustomButton';
import PasswordInput from './Utils/PasswordInput';
// Context
import { useAuth } from '@/context/Auth.context';
// Schema
import { LoginSchema } from '@/utils/validation';




export default function LoginForm() {
	const router = useRouter();
	const [isPassVisible, setPassVisible] = useState(false)
	const {login} = useAuth()

	useEffect(() => {
		let timer: string | number | NodeJS.Timeout | undefined;
		if (isPassVisible) {
			timer = setTimeout(() => {
				setPassVisible(false);
			}, 1000); // Hide confirm password after 1 second
		}

		return () => clearTimeout(timer);
	}, [isPassVisible]);

	const formik = useFormik({
		initialValues: { email: '', password: ''},
		validationSchema: LoginSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			await login(values.email, values.password, setErrors, setSubmitting)
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
					loading={formik.isSubmitting}
					onPress={formik.handleSubmit}
					onLongPress={() => { }}
					title="Log In"
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