import React from 'react';

import {Stack} from 'expo-router';


export const unstable_settings = {
  initialRouteName: "StartUpScreen",
};

export default function StartupLayout() {
  // Route start 
  return (
  
	<Stack initialRouteName='StartUpScreen'>
    {/* <Stack.Screen name="StartUpScreen" /> */}
    {/* <Stack.Screen name="PortalScreen" /> */}
	</Stack>
  );
}
