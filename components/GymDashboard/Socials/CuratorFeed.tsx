import OtherLoading from '@/components/Loading/OtherLoading';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Linking } from 'react-native';
import { WebView } from 'react-native-webview'

export default function CuratorIOFeed() {
	const [feedData, setFeedData] = useState([]);
	const pinHTML = `<!DOCTYPE html>
	<html>
	  <head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
	  </head>
	  <body style="height: 100%">

	  <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@20.7gymtj" data-unique-id="20.7gymtj" data-embed-type="creator" style=" height: 100%;"> <section style="width: 100%; height: 100%; "> <a target="_blank" href="https://www.tiktok.com/@20.7gymtj?refer=creator_embed">@20.7gymtj</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

	  <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/20_7_gym" data-instgrm-version="12" style=" background:#FFF; border:1; border-radius:10px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); max-width:540px; min-width:326px; padding:0; width:99.375%; width:undefinedpx;height:undefinedpx;max-height:100%; width:undefinedpx;">
	  </blockquote>
	  <script async src="https://www.instagram.com/embed.js"></script>
	  

	 
	  </body>
	</html>`

	return (
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
			}}
		>

		</WebView>
	);
}