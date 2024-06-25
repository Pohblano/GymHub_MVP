import React from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '@/context/Auth.context';

export const unstable_settings = {
  initialRouteName: "(Drawer)",
};

export default function ActiveUserLayout() {
  return (
    <Stack screenOptions={{ animation: 'ios', }}>
     
      <Stack.Screen name='(Drawer)' options={{ title: 'Drawer', headerShown: false }} />
      <Stack.Screen name="ImageViewerScreen" options={{presentation:'containedModal', headerShown: false}}/>
      
      <Stack.Screen name="Trainers/BookingScreen" options={{presentation:'containedModal', headerShown: false}}/>
      <Stack.Screen name='Trainers/[uid]' options={{ title: 'Trainer Profile', headerShown: false, presentation:'fullScreenModal'}} />
      
      <Stack.Screen name='Settings/index' options={{title: 'Settings', headerShown: false}}/>
      <Stack.Screen name='Settings/LanguageScreen' options={{title: 'Language', headerShown: false}} />
      <Stack.Screen name='Settings/ReportBugScreen' options={{title: 'Report Bug', headerShown: false}} />
      <Stack.Screen name='Settings/ContactScreen' options={{title: 'Contact', headerShown: false}} />
      <Stack.Screen name='Settings/EditProfileScreen' options={{title: 'About', headerShown: false}} />
    </Stack>
  );
}
