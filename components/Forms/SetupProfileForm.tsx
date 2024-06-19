// Node Modules
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
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { form } from '@/styles/form.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import CustomButton from '../Buttons/CustomButton';
import ImagePreviewInput from './Utils/ImagePreviewInput'
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
	const [imageUri, setImageUri] = useState<String>('');
	const animation = useFadeInStyles(50, 50, 800, 0)
	const delayedAnimation = useFadeInStyles(50, 50, 800, 200)
	const delayeddAnimation = useFadeInStyles(50, 50, 800, 400)
	const [gyms, setGyms] = useState([])
	const [selectedGym, setSelectedGym] = useState('');
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


	// IF no name randomly generate one and check if you need location
	const formik = useFormik({
		initialValues: { profile_img: '', name: '', location: '' },
		validationSchema: SetupProfileSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			if (imageUri) {
				const downloadURL = await upload_image(imageUri)
				if (downloadURL) {
					formik.values.profile_img = downloadURL
				}
			}
			else {
				const default_image = `https://firebasestorage.googleapis.com/v0/b/gym24-7.appspot.com/o/profile_images%2Fdefault-image.jpg?alt=media&token=67031391-86e9-4311-b9c1-77a49008c557`
				formik.values.profile_img = default_image
			}
			if (!formik.values.name) {
				formik.values.name = generateUsername();
			}
			const response = await update(user.uid, values, setErrors, setSubmitting)
		},
	});

	return (
		<>

			<Animated.View style={[{ flex: 2, gap: 15 }]}>

				{/* START OF FORM */}
				<Animated.View style={animation.fadeInStyle}>
					<ImagePreviewInput
						style={[{ alignSelf: 'center' }]}
						imageUri={imageUri}
						handleImagePreview={handleImagePreview} />
				</Animated.View>

				{formik.touched.profile_img && formik.errors.profile_img ? (
					<Animated.Text style={[text.error, animation.fadeInStyle]}>
						{t(formik.errors.profile_img)}{/* i18next-extract-disable-line */}
					</Animated.Text>
				) : null}


				<Animated.View style={delayedAnimation.fadeInStyle}>
					<DisplayNameInput
						iconStyle={{}}
						containerStyle={{}}
						inputStyle={[
							container.input_text, text.black,
							formik.touched.name && formik.errors.name ? form.error_input : null]}
						placeholder={t('Display Name')}
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
						{t(formik.errors.location)}{/* i18next-extract-disable-line */}
					</Animated.Text>
				) : null}

				{/* <Picker
					selectedValue={selectedGym}
					onValueChange={(itemValue: React.SetStateAction<string>) => {
						setSelectedGym(itemValue);
						formik.setFieldValue('home_gym', itemValue);
					}}
					style={[container.input_text, text.black]}
				>
					<Picker.Item label="Select Home Gym" value="" />
					<Picker.Item label="20-7 Gym" value="20/7" />
					<Picker.Item label="Golds Gym" value="Golds" />
				 {gyms.map((gym) => (
						<Picker.Item key={gym.id} label={gym.name} value={gym.id} />
					))} 
				</Picker>
				{formik.touched.home_gym && formik.errors.home_gym ? (
					<Text style={text.error}>{formik.errors.home_gym}</Text>
				) : null} */}

			</Animated.View>

			{/* Bottom Buttons */}
			<Animated.View style={[container.bottom, { gap: 10 }, animation.slideUpStyle]}>
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
			</Animated.View>
		</>
	)
}

const styles = StyleSheet.create({

})