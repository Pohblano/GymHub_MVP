// Modules
import React from 'react'
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from 'expo-image';
// Styling
import { text } from "@/styles/text.styles";
// Components
import { BoldText, RegularText, SemiBoldText } from "../Text/StyledText";
// Context
import { useAuth } from "@/context/Auth.context";
import { Octicons } from '@expo/vector-icons';
import { router, useSegments } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function MainDrawerContent(props: any) {
	const { logout, user } = useAuth();
	const { bottom } = useSafeAreaInsets();
	const {t}= useTranslation()
	
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.avatarContainer}>
					<View>
						<Image style={styles.avatar} source={user.profile_img} />
					</View>
					<View className='ml-3'>
						<BoldText className='' numberOfLines={1} style={[text.regular, text.light_grey, {maxWidth: 180}]}>{user.username}</BoldText>
						<RegularText className='' numberOfLines={1} style={[ text.light_grey, {maxWidth: 180}]}>{user.email}</RegularText>
					</View>
				</View>


				<DrawerItemList {...props} />
				<DrawerItem
					label={t('Settings')}
					onPress={() => router.push('/Settings')}
					icon={() => <Octicons name="gear" size={24} color="black" />}
					labelStyle={{
						marginLeft: -20,
						fontSize: 16
					}}/>

				<DrawerItem
					label={t('Sign Out')}
					onPress={logout}
					// onPress={() => router.push('/')}
					icon={() => <Octicons name="sign-out" size={24} color="black" />}
					labelStyle={{
						marginLeft: -20,
						fontSize: 16
					}}/>
			</DrawerContentScrollView>

			<BoldText style={[text.black, text.regular, { marginBottom: bottom - 10, alignSelf: 'center' }]}>
				GYM/<BoldText style={text.yellow}>HUB</BoldText>
			</BoldText>
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		height: 70,
		width: 70,
		borderRadius: 100,
		borderWidth: 3,
		borderColor: '#e7be60',

	},
	avatarContainer: {
		padding: 20,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'center',
	}
})