// Modules
import React from 'react';
import { SafeAreaView} from 'react-native'
import Animated from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import { HorizontalPaddedView } from '@/components/Views/PaddedView'
import { BoldText } from '@/components/Text/StyledText';
import { IconPressable } from '@/components/Buttons/CustomPressable';
import RecoverPasswordForm from '@/components/Forms/RecoverPasswordForm'
import CustomLink from '@/components/Buttons/CustomLink';
// Context

export default function RecoverPasswordModalScreen() {
  const router = useRouter();
  const animation = useFadeInStyles(50, -50, 800, 0)

  return (
    <SafeAreaView style={[container.wrapper, container.bg_white]}>
      <HorizontalPaddedView >
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
        <Animated.View style={[container.header, animation.slideUpStyle]}>
          <BoldText style={[text.large, text.black]}>{'Forgot\nPassword.'}</BoldText>
        </Animated.View>

        {/* Form */}
        <RecoverPasswordForm />

      </HorizontalPaddedView>
    </SafeAreaView>
  );
}
