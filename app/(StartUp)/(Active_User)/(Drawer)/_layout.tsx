// Modules
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
// Components
import MainDrawerContent from '@/components/GymDashboard/MainDrawerContent';
import { Octicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function Layout() {
  const {t} = useTranslation()
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
        }}>
        <Drawer.Screen
          name="GymDashboardScreen"
          options={{
            drawerLabel: t('Home'),
            title: t('Home'),
            drawerIcon: ({size,color}) => (
              <Octicons name="home" size={24} color="black" />
            )
          }}/>
      </Drawer>
    </GestureHandlerRootView>
  );
}

