// Node Modules
import React from 'react';
import Animated from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import { CustomSafeAreaView, HorizontalPaddedView } from '@/components/Views/PaddedView'
import { BoldText } from '@/components/Text/StyledText';
import CustomLink from '@/components/Buttons/CustomLink';
import LoginForm from '@/components/Forms/LoginForm';

export default function LoginScreen() {
	const router = useRouter();
	const animation = useFadeInStyles(50, 50, 800, 0)

	return (
		<>
			<CustomSafeAreaView style={[container.wrapper, container.bg_white]}>
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
						<BoldText style={[text.large, text.black]}>{'Welcome\nBack!'}</BoldText>
					</Animated.View>

					{/* Form */}
					<LoginForm />

					{/* Recover Password */}
					<Animated.View style={animation.slideUpStyle}>
						<CustomLink
							loading={false}
							onPress={() => { router.push('RecoverPasswordModalScreen') }}
							onLongPress={() => { }}
							title="Forgot your password?"
							iconLeft={''}
							iconRight={''}
							iconRightStyle={{}}
							style={{ alignSelf: 'center', marginBottom: 0 }}
							textStyle={text.option_link}
							disabled={false}
						/>
					</Animated.View>
				</HorizontalPaddedView>
			</CustomSafeAreaView>

		</>


	)
}
