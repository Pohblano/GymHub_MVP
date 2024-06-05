// Modules
import React from 'react';
import { SafeAreaView, View, TextInput, Modal, KeyboardAvoidingView } from 'react-native'
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
// Components
import { HorizontalPaddedView } from '@/components/Views/PaddedView'
import { BoldText } from '@/components/Text/StyledText';
import { IconPressable } from '@/components/Buttons/CustomPressable';
import RecoverPasswordForm from '@/components/Forms/RecoverPasswordForm'
import { useFadeInStyles } from '@/hooks/animationStyle';
import Animated from 'react-native-reanimated';
// Context


export default function RecoverPasswordModalScreen() {
  const router = useRouter();
  const {slideLeftStyle, slideUpStyle, fadeInStyle} = useFadeInStyles(50,-50,800)

  return (
    <SafeAreaView style={[container.wrapper, container.bg_white]}>
      <HorizontalPaddedView >
        {/* Back Button */}
        <IconPressable
          style={[container.back_button, text.black, text.icon, {alignSelf: 'center'}]}
          icon={'chevron-down'}
          onPress={() => {router.back()}}
        />

        {/* Header */}
        <Animated.View style={[container.header, slideUpStyle]}>
          <BoldText style={[text.large, text.black]}>{'Forgot\nPassword.'}</BoldText>
        </Animated.View>

        {/* Form */}
        <RecoverPasswordForm />

      </HorizontalPaddedView>
    </SafeAreaView>
  );
}
