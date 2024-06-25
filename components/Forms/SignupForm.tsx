// Node Modules
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native'
import { useFormik } from 'formik';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Trans, useTranslation } from 'react-i18next';
// * Routing
import { Link, useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { form } from '@/styles/form.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import { Seperator_Text } from '../Views/PaddedView';
import { IconGoogleRound, IconFacebookRound } from '@/constants/Icons';
import CustomButton from '../Buttons/CustomButton';
import PasswordInput from './Utils/PasswordInput';
// Context
import { useAuth } from '@/context/Auth.context';
// Schema
import { SignupSchema } from '@/utils/validation';
import { useGym } from '@/context/Gym.context';
import i18n from '@/utils/i118n';

export default function SignupForm() {
	const router = useRouter();
	const animation = useFadeInStyles(50, 50, 800, 0)
	const delayedAnimation = useFadeInStyles(50, 50, 800, 200)
	const delayeddAnimation = useFadeInStyles(50, 50, 800, 400)
	const [isPassVisible, setPassVisible] = useState(false)
	const [isConfirmPassVisible, setConfirmPassVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const { register } = useAuth()
	const { t } = useTranslation();
	const { gym } = useGym()

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
			await register(values.email, values.password, setErrors, setSubmitting)
		},
	});

	return (
		<>
			{/* START OF FORM */}
			<View style={[container.form]}>
				<Animated.View className={'gap-1'} style={animation.fadeInStyle}>
					<TextInput
						style={[
							container.input_text, text.black,
							formik.touched.email && formik.errors.email ? form.error_input : null]}
						placeholderTextColor={'#BDBDBD'}
						placeholder={t('Email')}
						value={formik.values.email}
						onChangeText={formik.handleChange('email')}
						onBlur={formik.handleBlur('email')} />

					{formik.touched.email && formik.errors.email ? (
						<Animated.Text entering={FadeInRight.duration(500)} style={[text.error]}>
							{t(formik.errors.email)}{/* i18next-extract-disable-line */}
						</Animated.Text>
					) : null}
				</Animated.View>


				<Animated.View className={'gap-1'} style={delayedAnimation.fadeInStyle}>
					<PasswordInput
						value={formik.values.password}
						setValue={formik.handleChange('password')}
						visible={isPassVisible}
						setVisible={setPassVisible}
						placeholder={t('Password')}
						containerStyle={{}}
						inputStyle={[
							container.input_text, text.black,
							formik.touched.password && formik.errors.password ? form.error_input : null]}
						iconStyle={{}} />

					{formik.touched.password && formik.errors.password ? (
						<Animated.Text entering={FadeInRight.duration(500)} style={[text.error]}>
							{t(formik.errors.password)}{/* i18next-extract-disable-line */}
						</Animated.Text>
					) : null}
				</Animated.View>


				<Animated.View className={'gap-1'} style={delayeddAnimation.fadeInStyle}>
					<PasswordInput
						value={formik.values.confirmPassword}
						setValue={formik.handleChange('confirmPassword')}
						visible={isConfirmPassVisible}
						setVisible={setConfirmPassVisible}
						placeholder={t('Confirm Password')}
						containerStyle={{}}
						inputStyle={[
							container.input_text, text.black,
							formik.touched.confirmPassword && formik.errors.confirmPassword ? form.error_input : null]}
						iconStyle={{}} />

					{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
						<Animated.Text entering={FadeInRight.duration(500)} style={[text.error]}>
							{t(formik.errors.confirmPassword)} {/* i18next-extract-disable-line */}
						</Animated.Text>
					) : null}
				</Animated.View>



				{/* <Animated.View style={delayedAnimation.fadeInStyle}>
					<Seperator_Text style={{ marginVertical: 10 }}>{t('Or Sign Up With')}</Seperator_Text>
				</Animated.View>

				<Animated.View style={[container.flex_x, styles.side_buttons, delayeddAnimation.fadeInStyle]}>
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
				</Animated.View> */}

				{/* Terms & COnditions / Privacy Policy */}
				<Animated.View style={[delayeddAnimation.fadeInStyle, { marginTop: 8 }]}>
					<Text className=' text-center' style={[text.grey, { fontWeight: 300 }]}>
						<Trans i18nKey="registration.agreement" components={{
							terms: <Link style={text.yellow} href='(Legal)/Terms_Conditions' />,
							privacy: <Link style={text.yellow} push href='(Legal)/Privacy_Policy' />
						}} />

					</Text>
				</Animated.View>
			</View>

			{/* Bottom Buttons */}
			<Animated.View style={[container.bottom, { gap: 10 },]}>
				<CustomButton
					loading={formik.isSubmitting}
					onPress={formik.handleSubmit}
					onLongPress={() => { router.replace('SetupProfileScreen') }}
					title={t("Sign Up")}
					iconLeft={''}
					iconRight={''}
					activeOpacity={0.8}
					width={'100%'}
					style={container.bg_yellow}
					textStyle={[text.primary_button, text.white]}
					disabled={formik.isSubmitting}
				/>
			</Animated.View>
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

})


