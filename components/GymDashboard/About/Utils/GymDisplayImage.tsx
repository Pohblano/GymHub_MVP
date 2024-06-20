// Modules
import React from 'react'
import { BoldText } from '@/components/Text/StyledText'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import { ImageBackground, StyleSheet } from 'react-native'
// Styling
import { text } from '@/styles/text.styles'
import { useTranslation } from 'react-i18next'
// Components


export default function GymDisplayImage({ image, caption }:{
	image: string,
	caption: string
}) {
	const {t} = useTranslation()
	return (
		<ImageBackground
			style={{ height: 250, width: 'auto'}}
			imageStyle={{ borderRadius: 10 }}
			source={{ uri: image }}
		>
			<LinearGradient
				colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
				start={[0, 1]} end={[0, 0]}
				style={styles.background}
			>
				<BoldText className='w-5/6' style={[text.large, text.white]}>
				{t(caption)}{/* i18next-extract-disable-line */}
				</BoldText>
			</LinearGradient>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background: {
		height: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		padding: 30,
		borderRadius: 10
	},
})
