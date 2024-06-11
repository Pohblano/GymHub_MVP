// Modules
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// * Routing
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
// Components
import { useFadeInStyles } from '@/hooks/animationStyle';
import Animated from 'react-native-reanimated';
import { TrainerType } from '@/components/GymDashboard/Trainers/Trainers';
import CustomLink from '@/components/Buttons/CustomLink';
import TrainerHeader from '@/components/GymDashboard/Trainers/Utils/TrainerHeader';
import { HorizontalPaddedView } from '@/components/Views/PaddedView';
import ScrollableNavBar from '@/components/Utils/ScrollableNavBar';
import About from '@/components/GymDashboard/Trainers/About';
// Context
import { useGym } from '@/context/Gym.context';

interface ComponentMap {
  About: React.JSX.Element;
  Socials: React.JSX.Element;
}
type ActiveItem = keyof ComponentMap;

export default function TrainerModal() {
  const router = useRouter();
  const items = ['About', 'Socials']
  const pagerViewRef = useRef<PagerView>(null);
  const { trainers } = useGym()

  const { uid } = useLocalSearchParams()
  const [trainer, setTrainer] = useState<TrainerType>({})
  const [activeItem, setActiveItem] = useState(items[0])
  const { bottom, top, left } = useSafeAreaInsets();
  
  const animation = useFadeInStyles(50, -50, 800,0)
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
    Socials: <></>
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
          style={[container.back_button, text.icon, { fontSize: 34 }]} />
        }
        iconRight={''}
        iconRightStyle={{}}
        style={[styles.link, { marginTop: top, }]}
        textStyle={text.option_link}
        disabled={false} />

      <ScrollView>
        <Animated.Image
          source={{ uri: trainer.img }}
          style={[styles.image, animation.slideUpStyle]}
          resizeMode={'cover'} />

        <HorizontalPaddedView>
          <TrainerHeader
            activeItem={activeItem}
            items={items}
            setActiveItem={handleNavigationChange} />


          {/* <PagerView 
                ref={pagerViewRef}
                initialPage={0}
                style={{ flex: 1 }}
                onPageSelected={e => handlePageChange(e.nativeEvent.position)}
                scrollEnabled={true}>
                <Home logout={logout} key={'1'}/>
                <Trainers key={'2'}/>
                <Socials key={'3'}/>
                <About key={'4'}/>
              </PagerView>  */}
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
    top: 10, zIndex: 100,
    backgroundColor: '#d8d8d82a',
    borderRadius: 60,
    paddingVertical: 2,
    paddingHorizontal: 5
  },
  image: {
    height: 350,
    width: '100%',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  }
})