import React from 'react';
import { Stack} from 'expo-router';


export const unstable_settings = {
  initialRouteName: "LoginScreen",
};

export default function ActiveUserLayout() {
  // Route start 
  return (
    <Stack screenOptions={{ animation: 'ios', }}>
      <Stack.Screen name='LoginScreen' options={{ title: 'Log In', headerShown: false }} />
      <Stack.Screen name='DashboardScreen' options={{ title: 'Dashboard', headerShown: false }} />
      <Stack.Screen name='RecoverPasswordModalScreen' options={{ title: 'Recover Password', headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}
