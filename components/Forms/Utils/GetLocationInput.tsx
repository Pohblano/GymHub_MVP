// Modules
import React from "react";
import { ActivityIndicator, Pressable, TextInput, StyleSheet } from "react-native";
// Styles
import { container } from "@/styles/containers.styles";
import { form } from "@/styles/form.styles";
import { text } from "@/styles/text.styles";
// Components
import { View, Text } from "@/components/Themed";
import { IconLocation, IconUser } from "@/constants/Icons";



export default function GetLocationInput({
	location,
	handleGetLocation,
	containerStyle,
	inputStyle,
	iconStyle,
	value,
}) {
	// const []
	return (
		<>
			<Pressable
				onPress={handleGetLocation}
				style={[containerStyle, container.flex_x, text.light_grey, {}]}>
					
				{({ pressed }) => (
					<>
						{(location)  ? (
							<ActivityIndicator style={form.icon_left} size="small" color="#454545" />
						) : (
							<IconLocation containerStyle={form.icon_left} iconStyle={[]} height={25} width={25} fill={ '#454545'}/>
							
						)}
						<Text style={[text.light_grey, inputStyle, { paddingLeft: 48, display: 'flex', alignItems: 'center', paddingVertical: 14 }]}>
							{(value)? value : 'Tap here to get location'
							}
						</Text>
					</>
				)}
			</Pressable>
		</>
	)
}


const styles = StyleSheet.create({
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	locationButtonText: {
		color: '#fff',
	},
})