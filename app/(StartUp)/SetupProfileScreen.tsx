// Node Modules
import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, SequencedTransition, SlideInUp } from 'react-native-reanimated';
// *Styling
import { text } from '@/styles/text.styles';
import { container } from '@/styles/containers.styles';
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import { HorizontalPaddedView } from '@/components/Views/PaddedView';
import { BoldText } from '@/components/Text/StyledText';
import { IconPressable } from '@/components/Buttons/CustomPressable';
import SetupProfileForm from '@/components/Forms/SetupProfileForm';
import { useTranslation } from 'react-i18next';

export default function SetupProfileScreen() {
	const animation = useFadeInStyles(50, 50, 800, 0)
	const { t } = useTranslation()
	return (
		<SafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView >
				<KeyboardAvoidingView behavior='padding' className='d-flex flex-1' keyboardVerticalOffset={0}>

					{/* Header */}
					<Animated.View style={[container.header, { marginBottom: 10 }, animation.slideLeftStyle]} layout={FadeIn.duration(800)}>
						<BoldText style={[text.large, text.black]}>{t('Setup\nProfile.')}</BoldText>
					</Animated.View>

					{/* Form */}
					<SetupProfileForm />
				</KeyboardAvoidingView>

			</HorizontalPaddedView>
		</SafeAreaView>
	)
}
