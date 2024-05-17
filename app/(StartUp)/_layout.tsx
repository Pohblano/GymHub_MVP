import React from 'react';

import {Stack} from 'expo-router';


export const unstable_settings = {
  initialRouteName: "index",
};

export default function StartupLayout() {
  // Route start 
  return (
	<Stack screenOptions={{animation: 'simple_push'}}>
          <Stack.Screen name='index' options={{ title: 'Welcome to GYM/HUB', headerShown:false }} />
		  <Stack.Screen name='SelectionScreen' options={{ title: 'Log In or Sign Up', headerShown:false }} />
	</Stack>
  );
}
