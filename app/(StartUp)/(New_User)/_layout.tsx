import React from 'react';
import { Stack } from 'expo-router';


export const unstable_settings = {
  initialRouteName: "SignupScreen",
};

export default function ActiveUserLayout() {
  // Route start 
  return (
    <Stack screenOptions={{ animation: 'ios', }}>
      <Stack.Screen name='SignupScreen' options={{ title: 'Sign Up', headerShown: false }} />
      <Stack.Screen name='SetupProfileScreen' options={{ title: 'Set Up Profile', headerShown: false }} />
      <Stack.Screen name='CompletedScreen' options={{ title: 'User completed Sign Up', headerShown: false }} />
    </Stack>
  );
}
