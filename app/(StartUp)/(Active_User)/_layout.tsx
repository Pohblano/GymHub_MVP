import React from 'react';
import { Stack } from 'expo-router';


export const unstable_settings = {
  initialRouteName: "LoginScreen",
};

export default function ActiveUserLayout() {
  // Route start 
  return (
    <Stack screenOptions={{ animation: 'simple_push', }}>
      <Stack.Screen name='LoginScreen' options={{ title: 'Log In', headerShown: false }} />
    </Stack>
  );
}
// headerShown: false 