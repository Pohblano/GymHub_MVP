import { useFadeInStyles } from '@/hooks/animationStyle';
import { text } from '@/styles/text.styles';
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

const ScrollableNavBar = ({ items, activeItem, setActiveItem }:{
  items: string[],
  activeItem: string, 
  setActiveItem: (item:string) => any
}) => {
  const scrollViewRef = useRef<any>();
  const animation = useFadeInStyles(50, -50, 800,0)
	const delayedAnimation = useFadeInStyles(50, 50, 800, 200)

  useEffect(() => {
    const index = items.indexOf(activeItem);
    if (index >= 0 && scrollViewRef.current) {
      scrollViewRef?.current.scrollTo({
        x: index * 100, // Adjust this based on your item width
        animated: true,
      });

    }
  }, [activeItem]);

  const handleSelect = (item: string) => {
    setActiveItem(item)
    console.log(`Current Component: ${item}`)
  }

  return (
    <Animated.View style={animation.slideLeftStyle}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {items.map((item: string, index: number) => (
          <Pressable key={index} onPress={() => handleSelect(item)}>
            <View style={[styles.navItem, item === activeItem && styles.activeNavItem]}>
              <Text style={[styles.navText, item === activeItem && [text.gym207, styles.activeNavText]]}>{item}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  navItem: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eeeeee',
    borderRadius: 50,
  },
  activeNavItem: {
    borderRadius: 50,
    backgroundColor: '#62D767',
    color: 'white',
    fontWeight: '800'
  },
  activeNavText: {
    color: 'white'
  },
  navText: {
    fontSize: 16,
  },

});

export default ScrollableNavBar;