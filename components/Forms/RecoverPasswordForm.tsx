// Node Modules
import React, { useState, useEffect } from 'react';
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
import CustomButton from '../Buttons/CustomButton';
// Context
import { useAuth } from '@/context/Auth.context';
// Schema
import { RecoverPasswordSchema } from '@/utils/validation';
import CustomLink from '../Buttons/CustomLink';
import { BoldText } from '../Text/StyledText';
import email_sent from '@/assets/lottie/email_sent.json'
import LottieView from 'lottie-react-native';

export default function RecoverPasswordForm() {
	const router = useRouter();
	const [emailSent, setEmailSent] = useState(false)
	const { reset_password } = useAuth()


	const formik = useFormik({
		initialValues: { email: '' },
		validationSchema: RecoverPasswordSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			const response = await reset_password(values.email, setErrors, setSubmitting, setEmailSent)
		
		},
	});

	return (
		<>
			{(emailSent) ?
				<View style={{flex: 4, display:'flex'}}>
					<LottieView style={{ height: 200 }} source={email_sent} autoPlay loop/>
					<Text style={[text.black, {}, {alignSelf:'center'}]}>An email has been sent to <BoldText>{formik.values.email}</BoldText>. {'\nFollow the link to reset your password.'}</Text>		
				</View>
				:
				<>

					< View style={container.form}>
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

						<Text style={[text.black]}>Enter the email associated with your account and we will send you an email with a link and instructions to reset your password.</Text>
					</View >


					< View style={[container.bottom]} >
						<CustomButton
							loading={formik.isSubmitting}
							onPress={formik.handleSubmit}
							onLongPress={() => { }}
							title="Submit"
							iconLeft={''}
							iconRight={''}
							activeOpacity={0.8}
							width={'100%'}
							style={container.bg_yellow}
							textStyle={[text.primary_button, text.white]}
							disabled={formik.isSubmitting}
						/>
					</View >
				</>
			}
		</>
	)
}
