// Node Modules
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native'
import { useFormik } from 'formik';
import Animated, { FadeInRight } from 'react-native-reanimated';
// * Routing
import { useRouter } from 'expo-router';
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
import { LoginSchema } from '@/utils/validation';
import { useTranslation } from 'react-i18next';


export default function LoginForm() {
	const router = useRouter();
	const animation = useFadeInStyles(50, 50, 800, 0)
	const delayedAnimation = useFadeInStyles(50, 50, 800, 200)
	const delayeddAnimation = useFadeInStyles(50, 50, 800, 400)
	const [isPassVisible, setPassVisible] = useState(false)
	const { login } = useAuth()
	const { t } = useTranslation()
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
		initialValues: { email: '', password: '' },
		validationSchema: LoginSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			await login(values.email, values.password, setErrors, setSubmitting)
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
						<Animated.Text style={[text.error]} entering={FadeInRight.duration(500)}>
							{t(formik.errors.email)}{/* i18next-extract-disable-line */}
						</Animated.Text>
					) : null}
				</Animated.View>


				<Animated.View className='gap-1' style={delayedAnimation.fadeInStyle}>
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
							{t(formik.errors.password)} {/* i18next-extract-disable-line */}
						</Animated.Text>
					) : null}
				</Animated.View>

				{/* 
				<Animated.View style={delayedAnimation.fadeInStyle}>
					<Seperator_Text style={{ marginVertical: 10 }}>{t('Or Log In With')}</Seperator_Text>
				</Animated.View>

				<Animated.View style={[container.flex_x, styles.side_buttons, delayeddAnimation.fadeInStyle]}>
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
				</Animated.View> */}
			</View>

			{/* Bottom Buttons */}
			<Animated.View style={[container.bottom, { gap: 10 }, animation.slideUpStyle]}>
				<CustomButton
					loading={formik.isSubmitting}
					onPress={formik.handleSubmit}
					onLongPress={() => { }}
					title={t("Log In")}
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
	brand_icon: {
		paddingRight: 4,
		paddingTop: 3,
		backgroundColor: 'transparent'
	}
})