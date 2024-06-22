// Modules
import React from "react";
import { Pressable, Image, StyleSheet, ViewStyle } from "react-native";
// Styles
import { text } from "@/styles/text.styles";
// Components
import { IconCameraPlus } from "@/constants/Icons";

export type ImagePreviewInputProps = {
	style?: ViewStyle;
	imageUri?: string;
	setImageUri: (uri: string) => void;
	handleImagePreview: () => void;
  };
  

export default function UserImagePreviewInput({
	style, 
	imageUri,
	setImageUri,
	handleImagePreview
}: ImagePreviewInputProps) {
	return (
		<Pressable onPress={handleImagePreview} style={[styles.imageUploader, style]}>
			<IconCameraPlus 
				iconStyle={text.white}
				containerStyle={styles.icon_container}
				height={30}
				width={30}/>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
			<Image source={require('@/assets/images/new_user.jpg')} style={styles.imagePreview}/>		
          )}
        </Pressable>
	)
}

const styles = StyleSheet.create({
	imageUploader: {
	  height: 125,
	  width: 125,
	  justifyContent: 'center',
	  borderRadius: 100,
	  marginBottom: 40
	},
	imagePreview: {
	  height: 125,
	  width: 125,
	  borderRadius: 100,
	},
	icon_container: {
		backgroundColor: '#e7be60',
		padding: 10,
		width: 50,
		borderRadius: 100,
		position: 'relative',
		top: 40,
		left: 80,
		zIndex: 100
	}

  });