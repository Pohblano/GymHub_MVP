// Node Modules
import React, { useState, useEffect} from 'react';
import { useFormik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { form } from '@/styles/form.styles'
// Components
import { Text, View } from '../Themed';
import CustomButton from '../Buttons/CustomButton';
import ImagePreviewInput from './Utils/ImagePreviewInput'
import DisplayNameInput from './Utils/DisplayNameInput';
import GetLocationInput from './Utils/GetLocationInput';
// Context
import { useAuth } from '@/context/Auth.context';
// Schema
import { SetupProfileSchema } from '@/utils/validation';


export default function SetupProfileForm() {
	const router = useRouter();
	const [location, setLocation] = useState<Boolean>(false);
	const [imageUri, setImageUri] = useState<String>('');

	const [gyms, setGyms] = useState([])
	const [selectedGym, setSelectedGym] = useState('');
	const { user, update} = useAuth()

	useEffect(()=>{
	})


	const handleImagePreview = async () => {
		let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!result.granted) {
			alert("Permission to access gallery is required!");
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
			formik.setFieldValue('profile_img', uri);
		}
	};

	const handleGetLocation = async () => {
		setLocation(true);
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			alert("Permission to access location was denied");
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
		initialValues: { profile_img: '',name: '', location: '' },
		validationSchema: SetupProfileSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			const response = await update(user.uid, values, setErrors, setSubmitting)
		},
	});


	return (
		<>

			<View style={[{ flex: 2, gap: 15 }]}>

				{/* START OF FORM */}
				<ImagePreviewInput
					style={{ alignSelf: 'center' }}
					imageUri={imageUri}
					handleImagePreview={handleImagePreview} />
				{formik.touched.profile_img && formik.errors.profile_img ? (
					<Text style={text.error}>{formik.errors.profile_img}</Text>
				) : null}


				<DisplayNameInput
					iconStyle={{}}
					containerStyle={{}}
					inputStyle={[
						container.input_text, text.black,
						formik.touched.name && formik.errors.name ? form.error_input : null]}
					placeholder='Display Name'
					value={formik.values.name}
					setValue={formik.handleChange('name')}
					setBlur={formik.handleBlur('name')} />
				{formik.touched.name && formik.errors.name ? (
					<Text style={text.error} >{formik.errors.name}</Text>
				) : null}


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
				{formik.touched.location && formik.errors.location ? (
					<Text style={text.error}>{formik.errors.location}</Text>
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

			</View>


			{/* Bottom Buttons */}
			<View style={[container.bottom, { gap: 10 }]}>
				<CustomButton
					loading={formik.isSubmitting}
					onPress={formik.handleSubmit}
					onLongPress={() => { }}
					title="Complete"
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

})