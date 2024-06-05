// Modules
import React from 'react'
import { View } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Styling
import { container } from "@/styles/containers.styles";
import { text } from "@/styles/text.styles";
// Components
import CustomButton from "../Buttons/CustomButton";
import { BoldText, SemiBoldText } from "../Text/StyledText";
// Context
import { useAuth } from "@/context/Auth.context";


export default function MainDrawerContent(props: any) {
	const { logout } = useAuth();
	const {bottom} = useSafeAreaInsets();

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={{ padding: 20 }}>
					<BoldText style={[text.black, text.large]}>
						GYM/<SemiBoldText style={text.yellow}>HUB</SemiBoldText>
					</BoldText>
				</View>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			<CustomButton
				loading={false}
				onPress={() => logout()}
				onLongPress={() => { }}
				title="Sign Out"
				iconLeft={''}
				iconRight={''}
				activeOpacity={0.8}
				width={'70%'}
				style={[container.bg_yellow, { alignSelf: 'center', marginBottom: bottom, height: 38}]}
				textStyle={[text.white, text.primary_button,{fontSize: 14}]}
				disabled={false}
			/>
		</View>
	);
}