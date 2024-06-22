// Modules
import React from "react";
import { Pressable, Image, StyleSheet, ViewStyle, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
// Styles
import { text } from "@/styles/text.styles";
import { container } from "@/styles/containers.styles";
// Components
import { IconCameraPlus } from "@/constants/Icons";
// Props
import { ImagePreviewInputProps } from "./UserImagePreviewInput";
import { Feather } from "@expo/vector-icons";



export default function ImagePreviewInput({
	style,
	imageUri,
	setImageUri,
	handleImagePreview
}: ImagePreviewInputProps) {
	const { t } = useTranslation()
	return (
		<Pressable onPress={handleImagePreview} style={[styles.imageUploader, style, container.bg_grey]}>

			{imageUri ? (
				<>
					<Pressable onPress={()=> setImageUri('')} style={styles.exit_icon}>
						<Feather name="x-circle" size={24} color="black" />
					</Pressable>
					<Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode='contain' />
				</>
			) : (
				<View className="d-flex items-center justify-center gap-1" style={[{ height: 150, width: '100%' }]}>
					<IconCameraPlus
						iconStyle={text.black}
						containerStyle={styles.icon_block}
						color="#818181"
						height={30}
						width={30} />
					<Text style={[text.regular, text.grey, { fontWeight: 400, width: '75%', textAlign: 'center' }]}>{t('Add photo (optional)')}</Text>
				</View>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	imageUploader: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginBottom: 40,
	},
	imagePreview: {
		height: 350,
		width: '100%',
		borderRadius: 8,
		borderWidth: 2,
		borderColor: '#F5F4F7',
	},
	icon_block: {
		backgroundColor: 'transparent',
	},
	exit_icon: {
        position: 'absolute',
		zIndex: 100,
        top: 10,
        right: 10,
	}
});