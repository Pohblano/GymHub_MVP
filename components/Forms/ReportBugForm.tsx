// Modules
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Keyboard, View, Text} from 'react-native'
import { useFormik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeIn, FadeInDown, FadeInRight, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { form } from '@/styles/form.styles'
import computer_guy from '@/assets/lottie/computer_guy.json'
// Components
import CustomButton from '../Buttons/CustomButton';
import ImagePreviewInput from './Utils/ImagePreviewInput';
import MultilineTextInput from './Utils/MultilineTextInput';
import { BoldText } from '../Text/StyledText';
// Context
import { useAuth } from '@/context/Auth.context';
// Schema
import { ReportBugSchema } from '@/utils/validation';

export default function ReportBugForm() {
	const router = useRouter();
	const [imageUri, setImageUri] = useState<string>('');
	const [sent, setSent] = useState(false)
	const { user, register_bug } = useAuth()
	const { t } = useTranslation()

	const handleImagePreview = async () => {
		let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!result.granted) {
			alert(`${t("Permission to access gallery is required!")}`);
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		});

		if (!pickerResult.canceled) {
			const uri = pickerResult.assets[0].uri
			setImageUri(uri);
			formik.setFieldValue('img', uri)
		}
	};

	const formik = useFormik({
		initialValues: { img: '', description: '' },
		// validationSchema: ReportBugSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			await register_bug(values, setErrors, setSubmitting, setSent)
		},
	});

	return (
		<>
			{(sent) ?
				<Animated.View entering={FadeInUp.duration(800)} style={[{ flex: 1, display: 'flex', marginTop: '40%'}]}>
					<LottieView style={{ height: 200, marginBottom: 20}} source={computer_guy} autoPlay loop />
					<Text style={[text.black, text.regular, { alignSelf: 'center', width: '85%'}]}>
						{t('Thank you for reporting the issue. We will review it as soon as possible.\n\nYour feedback is greatly appreciated and will help make the app better.')}
					</Text>
				</Animated.View>
				:
				<>
					<Pressable style={[{ flex: 2, gap: 15, paddingTop: 60 }]} onPress={() => Keyboard.dismiss()}>

						<Animated.View className={'gap-1'} exiting={FadeOutDown}>
							<BoldText style={[text.black, text.sub_heading, { marginBottom: 6 }]}>
								{t('Description')}
							</BoldText>

							<MultilineTextInput
								iconStyle={{}}
								containerStyle={{}}
								inputStyle={[
									styles.input_text, text.black,
									formik.touched.description && formik.errors.description ? form.error_input : null]}
								placeholder={t('Give a brief description of any issues with the app.')}
								value={formik.values.description}
								setValue={formik.handleChange('description')}
								setBlur={formik.handleBlur('description')} />

							{formik.touched.description && formik.errors.description ? (
								<Animated.Text style={[text.error]} entering={FadeInRight.duration(500)}>
									{t(formik.errors.description)}{/* i18next-extract-disable-line */}
								</Animated.Text>
							) : null}
						</Animated.View>

						<Animated.View className={'gap-1'}>
							<ImagePreviewInput
								handleImagePreview={handleImagePreview}
								style={{}}
								imageUri={imageUri}
								setImageUri={setImageUri} />

							{formik.touched.img && formik.errors.img ? (
								<Animated.Text style={[text.error]} entering={FadeInRight.duration(500)}>
									{formik.errors.img}
								</Animated.Text>
							) : null}
						</Animated.View>

					</Pressable>

					<View style={[{ justifyContent: 'flex-end' }]}>
						<CustomButton
							loading={formik.isSubmitting}
							onPress={formik.handleSubmit}
							onLongPress={() => { }}
							title={t("Submit")}
							iconLeft={''}
							iconRight={''}
							activeOpacity={0.8}
							width={'100%'}
							style={container.bg_yellow}
							textStyle={[text.primary_button, text.white]}
							disabled={formik.isSubmitting} />
					</View>
				</>
			}
		</>
	)
}

const styles = StyleSheet.create({
	input_text: {
		width: '100%',
		height: 70,
		paddingHorizontal: 20,
		paddingVertical: 10,
		paddingBottom: 20,
		fontSize: 16,
		fontWeight: 'medium',
		backgroundColor: "#F5F4F7",
		borderRadius: 8,
	}
})