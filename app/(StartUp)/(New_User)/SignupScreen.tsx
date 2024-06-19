// Node Modules
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { text } from '@/styles/text.styles';
import { container } from '@/styles/containers.styles';
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import { HorizontalPaddedView } from '../../../components/Views/PaddedView'
import { BoldText } from '../../../components/Text/StyledText';
import CustomLink from '../../../components/Buttons/CustomLink';
import SignupForm from '../../../components/Forms/SignupForm';

export default function SignupScreen() {
	const router = useRouter();
	const animation = useFadeInStyles(50, 50, 800, 0)
	const { t } = useTranslation();
	return (
		<SafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				{/* Back Button */}
				<Animated.View style={animation.fadeInStyle}>
					<CustomLink
						onPress={() => { router.back() }}
						onLongPress={() => { }}
						title={''}
						iconLeft={null}
						iconRight={<FontAwesome name="chevron-left" style={[text.black, text.icon, container.back_button]} />}
						iconRightStyle={{}}
						style={container.back_button}
						textStyle={{}}
						disabled={false}
						loading={false} />
				</Animated.View>
				{/* Header */}
				<Animated.View style={[container.header, animation.slideLeftStyle]}>
					<BoldText style={[text.large, text.black]}>{t('Create\nAccount.')}</BoldText>
				</Animated.View>
				
				{/* Form */}
				<SignupForm />

				{/* Recover Password */}
				<Animated.View style={animation.slideUpStyle}>
					<CustomLink
						loading={false}
						onPress={() => { router.push('../(Active_User)/LoginScreen'); }}
						onLongPress={() => { }}
						title={t("Sign In")}
						iconLeft={t('Have an account? ')}
						iconRight={''}
						style={{ alignSelf: 'center', marginBottom: 0 }}
						textStyle={text.option_link}
						disabled={false} iconRightStyle={undefined} />
				</Animated.View>
			</HorizontalPaddedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	side_buttons: {
		justifyContent: 'space-between'
	},
	side_button: {
		backgroundColor: 'rgba(231, 190, 96, .12)',
		borderStyle: 'solid',
		borderColor: '#e7be60',
		borderWidth: 1,
	},
	brand_icon: {
		paddingRight: 4,
		paddingTop: 3,
		backgroundColor: 'transparent'
	}
})