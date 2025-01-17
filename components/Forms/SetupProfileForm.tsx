// Modules
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Animated from 'react-native-reanimated';
import { generateUsername } from '@/utils/generators';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { form } from '@/styles/form.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import CustomButton from '../Buttons/CustomButton';
import UserImagePreviewInput from './Utils/UserImagePreviewInput'
import DisplayNameInput from './Utils/DisplayNameInput';
import GetLocationInput from './Utils/GetLocationInput';
// Context
import { useAuth } from '@/context/Auth.context';
// Schema
import { SetupProfileSchema } from '@/utils/validation';
import { useTranslation } from 'react-i18next';

export default function SetupProfileForm() {
	const router = useRouter();
	const [location, setLocation] = useState<Boolean>(false);
	const [imageUri, setImageUri] = useState<string>('');
	const animation = useFadeInStyles(50, 50, 800, 0)
	const delayedAnimation = useFadeInStyles(50, 50, 800, 200)
	const delayeddAnimation = useFadeInStyles(50, 50, 800, 400)
	const { user, update, upload_image } = useAuth()
	const { t } = useTranslation()

	const handleImagePreview = async () => {
		let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!result.granted) {
			alert(`${t("Permission to access gallery is required!")}`);
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!pickerResult.canceled) {
			const uri = pickerResult.assets[0].uri
			setImageUri(uri);
			formik.setFieldValue('profile_img', uri)
		}
	};

	const handleGetLocation = async () => {
		setLocation(true);
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			alert(`${t("Permission to access location was denied")}`);
			setLocation(false);
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		let geocode = await Location.reverseGeocodeAsync({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude
		});

		if (geocode.length > 0) {
			const { city, country } = geocode[0];
			formik.setFieldValue('location', `${city}, ${country}`);
		}
		setLocation(false);
	};

	const formik = useFormik({
		initialValues: { profile_img: '', username: '', location: '', name: '' },
		validationSchema: SetupProfileSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			const newValues = {
				profile_img: values.profile_img,
				name: values.name,
				username: values.username,
				username_lower: values.username.toLowerCase(),
				location: (values.location) ? values.location : ''
			}
			await update(user.uid, newValues, setErrors, setSubmitting)
		},
	});

	return (
		<>
			<Animated.View style={[{ flex: 2, gap: 15 }]}>

				{/* START OF FORM */}
				<Animated.View style={animation.fadeInStyle}>
					<UserImagePreviewInput
						style={{ alignSelf: 'center' }}
						imageUri={imageUri}
						handleImagePreview={handleImagePreview} 
						setImageUri={setImageUri}/>
				</Animated.View>

				{formik.touched.profile_img && formik.errors.profile_img ? (
					<Animated.Text style={[text.error, animation.fadeInStyle]}>
						{formik.errors.profile_img}
					</Animated.Text>
				) : null}


				<Animated.View style={delayedAnimation.fadeInStyle}>
					<DisplayNameInput
						iconStyle={{}}
						containerStyle={{}}
						inputStyle={[
							container.input_text, text.black,
							formik.touched.username && formik.errors.username ? form.error_input : null]}
						placeholder={t('Display Name')}
						value={formik.values.username}
						setValue={formik.handleChange('username')}
						setBlur={formik.handleBlur('username')} />
				</Animated.View>
				{formik.touched.username && formik.errors.username ? (
					<Animated.Text style={[text.error, animation.fadeInStyle]}>
						{t(formik.errors.username)}{/* i18next-extract-disable-line */}
					</Animated.Text>
				) : null}

				<Animated.View style={delayedAnimation.fadeInStyle}>
					<DisplayNameInput
						iconStyle={{}}
						containerStyle={{}}
						inputStyle={[
							container.input_text, text.black,
							formik.touched.name && formik.errors.name ? form.error_input : null]}
						placeholder={t('Name')}
						value={formik.values.name}
						setValue={formik.handleChange('name')}
						setBlur={formik.handleBlur('name')} />
				</Animated.View>
				{formik.touched.name && formik.errors.name ? (
					<Animated.Text style={[text.error, animation.fadeInStyle]}>
						{t(formik.errors.name)}{/* i18next-extract-disable-line */}
					</Animated.Text>
				) : null}

				<Animated.View style={delayeddAnimation.fadeInStyle}>
					<GetLocationInput
						iconStyle={{}}
						containerStyle={[]}
						inputStyle={[
							container.input_text,
							text.black,
							formik.touched.location && formik.errors.location ? form.error_input : null]}
						location={location}
						handleGetLocation={handleGetLocation}
						value={formik.values.location} />
				</Animated.View>
				{formik.touched.location && formik.errors.location ? (
					<Animated.Text style={[text.error, animation.fadeInStyle]}>
						{formik.errors.location}
					</Animated.Text>
				) : null}

			</Animated.View>

			{/* Bottom Buttons */}
			< Animated.View style={[container.bottom, { gap: 10 }, animation.slideUpStyle]} >
				<CustomButton
					loading={formik.isSubmitting}
					onPress={formik.handleSubmit}
					onLongPress={() => { }}
					title={t("Complete")}
					iconLeft={''}
					iconRight={''}
					activeOpacity={0.8}
					width={'100%'}
					style={container.bg_yellow}
					textStyle={[text.primary_button, text.white]}
					disabled={formik.isSubmitting}
				/>
			</Animated.View >
		</>
	)
}

const styles = StyleSheet.create({

})