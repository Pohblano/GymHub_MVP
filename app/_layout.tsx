
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider,} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn); // it's good to explicitly catch and inspect any error

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
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{animation: 'ios'}}>
          {/* Initial Startup Route */}
          <Stack.Screen name='(StartUp)' options={{ title: 'New User Process', headerShown:false }} />

        </Stack>   
    </ThemeProvider>
  );
}
