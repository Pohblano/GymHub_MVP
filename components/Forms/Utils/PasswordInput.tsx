// Modules
import React from "react";
import { TextInput, Pressable } from "react-native";
// Styles
import { container } from "@/styles/containers.styles";
import { form } from "@/styles/form.styles";
import { text } from "@/styles/text.styles";
// Components
import { View } from "@/components/Themed";
import { IconShowPassword, IconHidePassword } from "@/constants/Icons";



export default function PasswordInput({ value, setValue, visible, setVisible, placeholder, containerStyle, inputStyle, iconStyle }) {
	return (
		<View style={[containerStyle, container.flex_x, text.light_grey]}>
			<TextInput
				style={inputStyle}
				placeholderTextColor={'#BDBDBD'}
				placeholder={placeholder}
				value={value}
				onChangeText={setValue}
				secureTextEntry={!visible}
			/>
			<Pressable onPress={() => setVisible(!visible)} style={[form.icon_right]}>
				{visible ?
					<IconShowPassword height={'32'} width={'32'} iconStyle={{ fill: '#898989' }} containerStyle={{}} />
					:
					<IconHidePassword height={'32'} width={'32'} containerStyle={{}} iconStyle={{ fill: '#898989' }} />
				}
			</Pressable>
		</View>
	)
}