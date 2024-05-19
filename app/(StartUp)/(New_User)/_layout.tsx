import React from 'react';
import { Stack } from 'expo-router';


export const unstable_settings = {
  initialRouteName: "SignupScreen",
};

export default function ActiveUserLayout() {
  // Route start 
  return (
    <Stack screenOptions={{ animation: 'simple_push', }}>
      <Stack.Screen name='SignupScreen' options={{ title: 'Sign Up', headerShown: false }} />
    </Stack>
  );
}
// headerShown: false