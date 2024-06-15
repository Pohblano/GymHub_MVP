// Modules
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, ScrollView, Pressable, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Feather, FontAwesome, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import * as Linking from "expo-linking"
// * Routing
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
// Components
import { useFadeInStyles } from '@/hooks/animationStyle';
import Animated, { FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { TrainerType } from '@/components/GymDashboard/Trainers/Trainers';
import CustomLink from '@/components/Buttons/CustomLink';
import { HorizontalPaddedView } from '@/components/Views/PaddedView';
import About from '@/components/GymDashboard/Trainers/About';
import { BoldText, RegularText } from '@/components/Text/StyledText';
import TrainerNav from '@/components/GymDashboard/Trainers/Utils/TrainerNav';
// Context
import { useGym } from '@/context/Gym.context';
import { openPhoneApp, openWhatsApp } from '@/utils/linking';

interface ComponentMap {
  About: React.JSX.Element;
}
type ActiveItem = keyof ComponentMap;

export default function TrainerModal() {
  const router = useRouter();
  const items = ['About']
  const pagerViewRef = useRef<PagerView>(null);
  const { trainers } = useGym()
  const { uid } = useLocalSearchParams()
  const [trainer, setTrainer] = useState<TrainerType>({})
  const [activeItem, setActiveItem] = useState(items[0])
  const { bottom, top, left } = useSafeAreaInsets();

  const animation = useFadeInStyles(50, -50, 800, 0)
  const delayedAnimation = useFadeInStyles(50, 50, 800, 200)

  useEffect(() => {
    const trainer = trainers.find((trainer: TrainerType) => trainer.uid === uid)
    setTrainer(trainer)
  }, [])


  const handlePageChange = (index: number) => {
    setActiveItem(items[index]);
  }

  const handleNavigationChange = (item: string) => {
    setActiveItem(item);
    const index = items.indexOf(item);
    pagerViewRef.current?.setPage(index);
  }

  const trainerDashboardMapping: ComponentMap = {
    About: <About trainer={trainer} />,
  }

  return (
    <View style={[container.wrapper, container.bg_white]}>
      <StatusBar style="light" />
      <CustomLink
        loading={false}
        onPress={() => router.back()}
        onLongPress={() => { }}
        title=""
        iconLeft={<FontAwesome
          name={'chevron-left'}
          style={[container.back_button, text.icon, { fontSize: 28, color: 'white' }]} />
        }
        iconRight={''}
        iconRightStyle={{}}
        style={[styles.link, { marginTop: top, }]}
        textStyle={text.option_link}
        disabled={false} />

      <Animated.View className={'d-flex flex-row flex-1 self-end'} entering={FadeInRight.duration(800).delay(200)} style={[{ marginTop: top -4 }, styles.contacts]}>

        <Pressable style={styles.phone} onPress={() => openPhoneApp(trainer.contact_info?.phone)}>
          <Feather name="phone" size={28} color="white" />
        </Pressable>
        <Pressable style={styles.whatsApp} onPress={() => openWhatsApp(trainer.contact_info?.phone)}>
          <FontAwesome5 name="whatsapp" size={30} color="white" />
        </Pressable>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} >

        <Animated.View style={[animation.slideUpStyle]}>
          <Image
            source={{ uri: trainer.img }}
            style={[styles.image]} />

          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
            start={[0, 1]} end={[0, 0]}
            style={[styles.background]}>
            <Animated.View className='mb-6' entering={FadeInUp.duration(800)}>
              <BoldText style={[{ fontSize: 60 }, text.white]}>{trainer.first_name}</BoldText>
              <RegularText style={[text.largest, text.white]}>{trainer.last_name}</RegularText>
            </Animated.View>

          </LinearGradient>
        </Animated.View>

        <HorizontalPaddedView>
          {/* <TrainerNav
            activeItem={activeItem}
            items={items}
            setActiveItem={handleNavigationChange} /> */}



          {trainerDashboardMapping[activeItem as ActiveItem]}
        </HorizontalPaddedView>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    marginLeft: 10,
    position: 'absolute',
    top: 10,
    zIndex: 100,
    backgroundColor: '#2e2e2e85',
    borderRadius: 60,
    width: 47,
    padding:10,
    paddingLeft: 12
  },
  contacts: {
    marginRight: 20,
    position: 'absolute',
    top: 10,
    zIndex: 100,
  },
  image: {
    height: 450,
    width: '100%',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50
  },
  phone: {
    width: 50,
    marginRight: 15, 
    marginTop: 3, 
    backgroundColor: "#00da0be8", 
    padding: 10, 
    borderRadius: 60 
  },
  whatsApp:{ 
    width: 50,
    marginRight: 20, 
    backgroundColor: "#00da0be8", 
    padding: 10,
    paddingLeft:12, 
    borderRadius: 60  
  }
})