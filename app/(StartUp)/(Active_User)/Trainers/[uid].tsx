// Modules
import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Pressable,} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
// * Routing
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
// Components
import { useFadeInStyles } from '@/hooks/animationStyle';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp, SlideInDown } from 'react-native-reanimated';
import { TrainerType } from '@/components/GymDashboard/Trainers/Trainers';
import CustomLink from '@/components/Buttons/CustomLink';
import { HorizontalPaddedView } from '@/components/Views/PaddedView';
import About from '@/components/GymDashboard/Trainers/About';
import { BoldText, RegularText, SemiBoldText } from '@/components/Text/StyledText';
import TrainerNav from '@/components/GymDashboard/Trainers/Utils/TrainerNav';
// Context
import { useGym } from '@/context/Gym.context';
import { openPhoneApp, openWhatsApp } from '@/utils/linking';
import CustomButton from '@/components/Buttons/CustomButton';
import { useTranslation } from 'react-i18next';

interface ComponentMap {
  About: React.JSX.Element;
}
type ActiveItem = keyof ComponentMap;

export default function TrainerModal() {
  const router = useRouter();
  const items = ['About']
  const pagerViewRef = useRef<PagerView>(null);
  const { trainers, gym } = useGym()
  const { uid } = useLocalSearchParams()
  const [trainer, setTrainer] = useState<TrainerType>({})
  const [activeItem, setActiveItem] = useState(items[0])
  const { bottom, top, left } = useSafeAreaInsets();
  const {t} = useTranslation()

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
    <View style={[container.wrapper, container.bg_white, { paddingBottom: bottom + 45, backgroundColor: 'white' }]}>
      <StatusBar style="light" />

      <Animated.View className={'d-flex flex-row flex-1 self-end'} entering={FadeInRight.duration(800).delay(200)} style={[{ marginTop: top - 4 }, styles.contacts]}>
        <Pressable style={[styles.phone, {backgroundColor:gym.theme.buttons}]} onPress={() => openPhoneApp(trainer.contact_info?.phone)}>
          <Feather name="phone" size={24} color="white" />
        </Pressable>
        <Pressable style={[styles.whatsApp, {backgroundColor:gym.theme.buttons}]} onPress={() => openWhatsApp(trainer.contact_info?.phone)}>
          <FontAwesome5 name="whatsapp" size={26} color="white" />
        </Pressable>
      </Animated.View>

      {/* Display only if user hasn't already booked an appointment */}
      <Animated.View style={styles.bookButton} entering={FadeInDown.duration(800)}>
        <CustomButton
          onPress={() => router.push('Trainers/BookingScreen')}
          onLongPress={undefined}
          title={t('Book an Appointment')}
          iconLeft={undefined}
          iconRight={undefined}
          style={{ backgroundColor: gym.theme.text }}
          textStyle={[text.white, text.sub_heading,]}
          disabled={false}
          activeOpacity={0.8}
          loading={undefined}
          width={undefined} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} >
        <Animated.View style={[animation.slideUpStyle]}>
          <Image
            source={{ uri: trainer.img }}
            style={[styles.image]} />
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
          <LinearGradient
            colors={['rgba(0,0,0,.8)','rgba(0,0,0,0.5)','rgba(0,0,0,0.1)','rgba(0,0,0,0)','rgba(0,0,0,0)', 'rgba(0,0,0,0)']}
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
    padding: 10,
    paddingLeft: 12
  },
  bookButton: {
    position: 'absolute',
    zIndex: 100,
    bottom: 20,
    width: '90%',
    alignSelf: 'center',
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
    // borderBottomEndRadius: 50,
    // borderBottomStartRadius: 50
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
    // borderBottomEndRadius: 50,
    // borderBottomStartRadius: 50
  },
  phone: {
    width: 45,
    marginRight: 15,
    marginTop: 3,
    padding: 10,
    borderRadius: 60
  },
  whatsApp: {
    width: 45,
    marginRight: 10,
    padding: 10,
    paddingLeft: 12,
    borderRadius: 60
  }
})