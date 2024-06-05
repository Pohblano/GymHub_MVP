// Modules
import React from 'react'
import { ImageBackground, View, StyleSheet } from 'react-native'



// Styling
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { text } from '@/styles/text.styles'

// Components
import { BoldText, LightText, RegularText, SemiBoldText } from '@/components/Text/StyledText'
import CustomLink from '@/components/Buttons/CustomLink'
// Context
import { useGym } from '@/context/Gym.context'
import { TrainerType } from '../Trainers'

export default function TrainersList({ trainers }: {
	trainers: TrainerType[]
}) {

	return (
		<View className='d-flex' style={{ marginTop: 40 }}>
			<SemiBoldText style={[text.sub_heading]}>{'Trainers'}</SemiBoldText>


			{trainers.map((trainer, index) => (
				<ImageBackground
					key={index}
					style={{ height: 200, width: 'auto', marginTop: 10 }}
					imageStyle={{ borderRadius: 10 }}
					source={{uri: trainer.img}}
				>
					<LinearGradient
						colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
						start={[0, 0]} end={[1, 0]}
						style={styles.background}>

						<BoldText className=' w-5/6' style={[text.medium, text.white]}>{trainer.name?.split(' ').join('\n')}</BoldText>

						<View>
							<LightText className='mb-3' style={[text.white, {width: '75%'}]}>{trainer.specialty?.join(', ')}</LightText>
							<CustomLink
								onPress={() => { }}
								onLongPress={() => { }}
								title={'See more'}
								iconLeft={null}
								iconRight={<FontAwesome name="chevron-right" />}
								iconRightStyle={text.gym207}
								style={{ display: 'flex' }}
								textStyle={text.gym207}
								disabled={false}
								loading={false} />
						</View>

					</LinearGradient>
				</ImageBackground>
			))}

		</View>
	)
}

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		padding: 30,
		borderRadius: 10
	},
})