import React, { SetStateAction, useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Dimensions, Linking, Button, Pressable } from 'react-native'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import { LinkPressable } from '@/components/Buttons/CustomPressable';
// Styling
import { text } from '@/styles/text.styles'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// Components
import { RegularText, SemiBoldText } from '@/components/Text/StyledText'
// Context
import { useGym } from '@/context/Gym.context'


interface GeoLocation {
	latitude: number,
	longitude: number,
	latitudeDelta: number,
	longitudeDelta: number,
}

interface LocationType {
	latitude: number,
	longitude: number,
}

const haversineDistance = (coords1: LocationType, coords2: LocationType) => {
	const toRad = (x: number) => (x * Math.PI) / 180;
	const R = 6371; // Radius of Earth in kilometers
	const dLat = toRad(coords2.latitude - coords1.latitude);
	const dLon = toRad(coords2.longitude - coords1.longitude);
	const lat1 = toRad(coords1.latitude);
	const lat2 = toRad(coords2.latitude);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c; // Distance in kilometers
	return distance;
};


export default function GymLocation({ address }: {
	address: string
}) {
	const [loading, setLoading] = useState(false)
	const [distance, setDistance] = useState('null ');
	const [location, setLocation] = useState<GeoLocation>();
	const [userLocation, setUserLocation] = useState<LocationType>();
	const [errorMsg, setErrorMsg] = useState<String>('');
	const { gym } = useGym()

	const getDistance = async () => {
		setLoading(true)
		try {
			
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			const currentLocation = await Location.getCurrentPositionAsync({});
			setUserLocation({
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
			});

			const geocodedLocation = await Location.geocodeAsync(address);
			if (geocodedLocation.length > 0) {
				const destinationLocation = {
					latitude: geocodedLocation[0].latitude,
					longitude: geocodedLocation[0].longitude,
				};
				setLocation({
					latitude: geocodedLocation[0].latitude,
					longitude: geocodedLocation[0].longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				});

				const calculatedDistance = haversineDistance(currentLocation.coords, destinationLocation);
				setDistance(calculatedDistance.toFixed(2)); // Set distance in kilometers with 2 decimal places
				
			} else {
				setErrorMsg('Unable to find the location');
			}
		} catch (error) {
			console.log(error)
		}
		setLoading(false)
	}

	const openMaps = () => {
		const url = `https://www.google.com/maps/dir/?api=1&destination=${gym.location_coordinates.latitude},${gym.location_coordinates.longitude}&travelmode=driving`;
		Linking.openURL(url);
	};

	return (
		<View style={{ marginTop: 30 }}>
			<SemiBoldText className='mb-6' style={[text.sub_heading]}>{'Location'}</SemiBoldText>
			<View className='mb-3 d-flex flex-row'>
				<View style={{ width: 30 }}>
					<FontAwesome6
						name="location-dot"
						size={24}
						color="#454545"
						style={{ marginRight: 10 }} />
				</View>

				<RegularText className='' style={[text.black, text.sub_heading]}>{address}</RegularText>
			</View>

			<View className='mt-5' style={{}}>
				{gym.location_coordinates ? (
					<>
						{
							(loading || location)?
								(loading)?
									<Animated.View className={'d-flex flex-row self-end'} entering={FadeIn.duration(800)}>
										<ActivityIndicator  size="small" color="#0000ff" />
										<Text> {'Calculating distance...'}</Text>
									</Animated.View>
								 	:
									<Animated.Text className='self-end' entering={FadeIn.duration(800)}>
										{`Distance: ${distance}km`}
									</Animated.Text>
								:	
								<LinkPressable style={{alignSelf: 'flex-end'}} onPress={getDistance}>
									<Text className='text-lg text-blue-600'>How far is it?</Text>
								</LinkPressable>
						}
						<MapView
							
							style={styles.map}>
							<Marker  title={gym.name} description='Gym' coordinate={{
								latitude: 0,
								longitude: 0
							}}/>
						</MapView>
						<View >
							<Button title="Get Directions" onPress={openMaps} />
						</View>
					</>
				) : (
					<Text style={styles.text}>{errorMsg || "Couldn't find location."}</Text>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		borderRadius: 10
	},
	map: {
		width: '100%',
		height: 200,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	button_wrapper: {
		backgroundColor: '#d1d1d1',
		height: 50,
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		borderBottomStartRadius: 10,
		borderBottomRightRadius: 10
	},
	text: { marginTop: 12 },
});
