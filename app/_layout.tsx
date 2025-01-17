
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, Slot, useSegments, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../global.css'
import i18n from '@/utils/i118n';
// import PageLoading from '@/components/Loading/PageLoading'
import { AuthContextProvider, useAuth } from '@/context/Auth.context'
import { GymContextProvider } from '@/context/Gym.context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn);

// Pretty much handles when and how app splash screen renders
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Montserrat_Light: require('../assets/fonts/Montserrat/Montserrat-Light.ttf'),
    Montserrat_Regular: require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    Montserrat_Medium: require('../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    Montserrat_SemiBold: require('../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
    Montserrat_Bold: require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    Montserrat_ExtraBold: require('../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'),
    ...FontAwesome.font,
  });

  //Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null

  return <MainLayout />
}

function MainLayout() {
  return (
    <AuthContextProvider>
      <GymContextProvider>
        <Layout />
      </GymContextProvider>
    </AuthContextProvider>
  )
}

function Layout() {
  return ( 
    <Slot screenOptions={{animation: 'ios'}} />
  )
}
 


