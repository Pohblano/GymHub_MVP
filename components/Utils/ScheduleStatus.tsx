import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from "react-native";
import moment from 'moment';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { Popover, Popable } from 'react-native-popable'
import { MediumText } from '../Text/StyledText';
import { text } from '@/styles/text.styles';

export interface ScheduleType {
    'sunday': { open: string, close: string },
    'monday': { open: string, close: string },
    'tuesday': { open: string, close: string },
    'wednesday': { open: string, close: string },
    'thursday': { open: string, close: string },
    'friday': { open: string, close: string },
    'saturday': { open: string, close: string }
}
export type CurrentDayType = keyof ScheduleType;

const isOpen = (schedule: ScheduleType) => {
    const now = moment();
    const currentDay = now.format('dddd').toLowerCase();
    const currentTime = now.format('HH:mm'); // Current time in HH:mm format
    const todayHours = schedule[currentDay as CurrentDayType];
    if (todayHours) {
        // Check if the current time is within any of the open-close intervals for today
        return (currentTime >= todayHours.open && currentTime <= todayHours.close)
    }
    return false;
}

export default function ScheduleStatus({ business, schedule, subtitle }: {
    schedule: ScheduleType,
    business: string,
    subtitle?: string
}) {
    const open = isOpen(schedule);
    const glow = useSharedValue(10);

    useEffect(() => {
        glow.value = withRepeat(
            withTiming(20, {
                duration: 1000,
                easing: Easing.ease,
            }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        shadowRadius: glow.value,
        shadowColor: open ? '#22D767' : '#d76262',
        shadowOpacity: 1,
    }));

    return (
        <>
            {(subtitle) ?
                <View className='d-flex flex-row ml-2' style={{}}>
                    <Animated.View style={[styles.circle, animatedStyle, { backgroundColor: open ? '#22D767' : '#d76262' }]} />
                    <MediumText style={text.light_grey}>
                        {open ? `${business} is currently open` : `${business} is currently closed`}
                    </MediumText>
                    
                </View>
                :
                <>
                    <Popable content={open ? `${business} is currently open` : `${business} is currently closed`}>
                        <Animated.View className='ml-2' style={[styles.circle, animatedStyle,{ backgroundColor: open ? '#22D767' : '#d76262' }]} />
                    </Popable>
                </>
            }

        </>
        // // <Animated.View  className='ml-2' style={[styles.circle, animatedStyle]} />
        // <View className='d-flex flex-row ml-2' style={{}}>
        // 	<Animated.View  className='mr-2' style={[styles.circle, animatedStyle]} />
        //     <Text className=' text-sm'>
        //         {open ? `${business} is currently open` : `${business} is currently closed`}
        //     </Text>
        // </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 10,
        height: 10,
        borderRadius: 50,
        shadowOffset: { width: 0, height: 0 },
        alignSelf: 'center',
        marginRight: 10
    },

});