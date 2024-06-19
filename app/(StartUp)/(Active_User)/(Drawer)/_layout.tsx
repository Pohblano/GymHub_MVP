// Modules
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import AntDesign from '@expo/vector-icons/AntDesign';

// Components
import MainDrawerContent from '@/components/GymDashboard/MainDrawerContent';
import { EvilIcons, Octicons } from '@expo/vector-icons';

export default function Layout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <MainDrawerContent {...props}/>}
        screenOptions={{ 
          drawerPosition: 'left', 
          headerShown: false,
          drawerActiveBackgroundColor: '#00000010',
          drawerActiveTintColor: 'black',
          drawerLabelStyle: {
            marginLeft: -20,
            fontSize: 16
          },
        }}
      >
        <Drawer.Screen
          name="GymDashboardScreen"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({size,color}) => (
              <Octicons name="home" size={24} color="black" />
            )
          }}/>
      </Drawer>
    </GestureHandlerRootView>
  );
}

