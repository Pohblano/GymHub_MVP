import terms from "@/assets/documents/TermsConditions"
import CustomLink from "@/components/Buttons/CustomLink"
import { BoldText } from "@/components/Text/StyledText"
import { CustomSafeAreaView, HorizontalPaddedView } from "@/components/Views/PaddedView"
import { container } from "@/styles/containers.styles"
import { text } from "@/styles/text.styles"
import { FontAwesome } from "@expo/vector-icons"
import { router } from "expo-router"
import { t } from "i18next"
import { Animated, ScrollView, Text } from "react-native"
import Markdown from "react-native-markdown-display"
import policy from "@/assets/documents/PrivacyPolicy"
import { useTranslation } from "react-i18next"

export default function PrivacyPolicyScreen() {
	const {t} = useTranslation()
	return (
		<CustomSafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				<ScrollView showsVerticalScrollIndicator={false}>
					{/* Back Button */}
					<Animated.View>
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
					<Animated.View style={[{ marginTop: 60, marginBottom: 40 }]}>
						<BoldText style={[text.large, text.black]}>{t('Privacy Policy')}</BoldText>
						<Text style={[text.regular, text.grey, { fontWeight: 400, marginTop: 5 }]}>
							<Text>{t('Effective Date:')}</Text> June 24, 2024
						</Text>
					</Animated.View>

					{/* Terms and Conditions */}
					<Markdown >
						{policy}
					</Markdown>
				</ScrollView>
			</HorizontalPaddedView>
		</CustomSafeAreaView>
	)
}