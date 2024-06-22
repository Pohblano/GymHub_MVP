import React from 'react';
import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: "LoginScreen",
};

export default function ActiveUserLayout() {
  return (
    <Stack screenOptions={{ animation: 'simple_push', }}>
      <Stack.Screen name='LoginScreen' options={{ title: 'Log In', headerShown: false }} />
      <Stack.Screen name='RecoverPasswordModalScreen' options={{ title: 'Recover Password', headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name='(Drawer)' options={{ title: 'Drawer', headerShown: false }} />
      <Stack.Screen name="ImageViewerScreen" options={{presentation:'containedModal', headerShown: false}}/>
      
      {/* Trainers */}
      <Stack.Screen name="Trainers/BookingScreen" options={{presentation:'containedModal', headerShown: false}}/>
      <Stack.Screen name='Trainers/[uid]' options={{ title: 'Trainer Profile', headerShown: false, presentation:'fullScreenModal'}} />

      {/* Settings */}
      <Stack.Screen name='Settings/index' options={{title: 'Settings', headerShown: false}}/>
      <Stack.Screen name='Settings/LanguageScreen' options={{title: 'Language', headerShown: false}} />
      <Stack.Screen name='Settings/ReportBugScreen' options={{title: 'Report Bug', headerShown: false}} />
      <Stack.Screen name='Settings/ContactScreen' options={{title: 'Contact Us', headerShown: false}} />
    </Stack>
  );
}
