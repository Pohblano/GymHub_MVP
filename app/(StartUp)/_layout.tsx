import React  from 'react';
import { Stack } from 'expo-router';


export const unstable_settings = {
	initialRouteName: "index",
};

export default function StartupLayout() {

	// Route start 
	return (
		<Stack screenOptions={{ animation: 'ios' }}>

			<Stack.Screen name='index' options={{ headerShown: false }} />
			<Stack.Screen name='StartScreen' options={{ title: 'Welcome to GYM/HUB', headerShown: false }} />

			<Stack.Screen name='SelectionScreen' options={{ title: 'Log In or Sign Up', headerShown: false }} />
			<Stack.Screen name='SignupScreen' options={{ title: 'SignUp', headerShown: false }} />
			<Stack.Screen name='SetupProfileScreen' options={{ title: 'Setup Profile', headerShown: false }} />
			<Stack.Screen name='CompletedScreen' options={{ title: 'Setup Profile', headerShown: false }} />
			<Stack.Screen name='LoginScreen' options={{ title: 'Log In', headerShown: false }} />
			<Stack.Screen name='RecoverPasswordModalScreen' options={{ title: 'Recover Password', headerShown: false, presentation: 'modal' }} />

			{/* Links to Active user Layout */}
			<Stack.Screen name='(Active_User)' options={{ title: 'Active User Routes', headerShown: false }} />

			<Stack.Screen name='(Legal)/Terms_Conditions' options={{ title: 'Terms & Conditions', headerShown: false }} />
			<Stack.Screen name='(Legal)/Privacy_Policy' options={{ title: 'Privacy Policy', headerShown: false }} />

		</Stack>
	);
}




