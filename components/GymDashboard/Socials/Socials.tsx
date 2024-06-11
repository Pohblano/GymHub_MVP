import { useGym } from '@/context/Gym.context';
import { useFadeInStyles } from '@/hooks/animationStyle';
import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import Animated from 'react-native-reanimated';
import { WebView } from 'react-native-webview'

export default function Socials({user, data}:{
	user: string,
	data?: {
		tiktok?: string,
		instagram?: string
	}
}) {
	const { gym, gymsList } = useGym();
	const animation = useFadeInStyles(50, 50, 800, 0)
	const {tiktok, instagram} = (user === 'trainer')? data : gym.socials
	const pinHTML = `<!DOCTYPE html>
	<html>
	  <head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
	  </head>
	  <body style="height: 100%">
	 ${(instagram)? instagram: null} 
	  ${(tiktok)? tiktok: null}
	
	  </body>
	</html>`

	return (
	 <Animated.View style={[animation.fadeInStyle, {flex: 1}]}>
			<WebView
			javaScriptEnabled={true}
			source={{ html: pinHTML }}
			allowsFullscreenVideo={false}
			allowsInlineMediaPlayback={true}
			scrollEnabled={true}
			showsVerticalScrollIndicator={false}
			originWhitelist={['*']}
			mediaPlaybackRequiresUserAction={true}
			startInLoadingState={true}
			onShouldStartLoadWithRequest={event => {
				if (event.url.includes('blank')) {
					return true
				}
				if (event.url.includes('instagram')) {
					Linking.openURL(event.url);
					return false
				}
				return true
			}}>

		</WebView>
	 </Animated.View>
	);
}