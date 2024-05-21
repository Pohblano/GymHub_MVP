
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, Slot, useSegments, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
// import PageLoading from '@/components/Loading/PageLoading'
import { AuthContextProvider, useAuth } from '../context/Auth.context'

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

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null
  
  return <MainLayout />
}

function MainLayout() {
  return (
    <AuthContextProvider>
      <Layout />
    </AuthContextProvider>
  )
}

function Layout() {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inApp = segments[2]=='DashboardScreen'
    if (typeof isAuthenticated == 'undefined') return

    if(isAuthenticated && !inApp){
      console.log('USER LOGGED IN AND NOT IN APP', segments)
      // Redirect to Dashboard
      router.replace('(Active_User)/DashboardScreen')
    }else if (!isAuthenticated) {
      console.log('NO USER IS LOGGED IN', segments)
      // Redirect to starting page
      router.replace('/')
    }
  }, [isAuthenticated])

  // Written like this because if not then it will redirect to  (tabs) folder
  return (
    <Stack screenOptions={{ animation: 'fade' }}>
      <Stack.Screen name='(StartUp)' options={{ title: 'New User Process', headerShown: false }} />
    </Stack>
  )
}

