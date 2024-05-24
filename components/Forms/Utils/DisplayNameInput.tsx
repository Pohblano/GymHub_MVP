// Modules
import React from "react";
import { TextInput} from "react-native";
// Styles
import { container } from "@/styles/containers.styles";
import { form } from "@/styles/form.styles";
import { text } from "@/styles/text.styles";
// Components
import { View } from "@/components/Themed";
import { IconUser } from "@/constants/Icons";


export default function DisplayNameInput({ value, setValue, setBlur, placeholder, containerStyle, inputStyle, iconStyle }) {
	return (

		<View style={[containerStyle, container.flex_x, text.light_grey]}>
			{/* <Pressable style={[form.icon_left]}> */}
			<IconUser iconStyle={form.icon_left} height={25} width={25}/>
			{/* </Pressable> */}
			<TextInput
				style={[inputStyle, { paddingLeft: 48 }]}
				placeholderTextColor={'#BDBDBD'}
				placeholder={placeholder}
				value={value}
				onChangeText={setValue}
				onBlur={setBlur}
			/>
		</View>
	)
}

					