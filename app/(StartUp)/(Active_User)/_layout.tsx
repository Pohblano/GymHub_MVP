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
      <Stack.Screen name='RecoverPasswordModalScreen' options={{ title: 'Recover Password', headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name='(Drawer)' options={{ title: 'Drawer', headerShown: false }} />
      <Stack.Screen name='Trainers/[uid]' options={{ title: 'Trainer Profile', headerShown: false}} />
    </Stack>
  );
}
