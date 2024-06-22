import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from "react-i18next";
import CountryFlag from "react-native-country-flag";
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import i18n from '@/utils/i118n';
import { BoldText, RegularText } from '@/components/Text/StyledText';
import { text } from '@/styles/text.styles';
import { ButtonPressable } from '@/components/Buttons/CustomPressable';
import { router } from 'expo-router';
import { useEffect, useState, useTransition } from 'react';

const changeLanguage = async (languageCode: string) => {
    // Change the language in i18n
    i18n.changeLanguage(languageCode);
    // Persist the user language preference
    await SecureStore.setItemAsync('user-language', languageCode);
};

export default function Languages(props: any) {
    // Supported Languages List
    const [active, setActive] = useState<string | null>()
    const { supportedLngs } = i18n.services.resourceStore.data
    const { t } = useTranslation()
    console.log(supportedLngs)
    useEffect(() => {
        const storedLanguage = SecureStore.getItem('user-language');
        setActive(storedLanguage)
    },)

    const handleChange = (code: string) => {
        changeLanguage(code)
        router.back()
    }

    return (
        <View style={[styles.container, props.style]}>
            <Animated.FlatList style={[]} scrollEnabled={false} data={supportedLngs} renderItem={({ item, index }:{
                item:{
                    code: string,
                    isoCode: string,
                    locale: string,
                    details: string
                },
                index: number
            }) => (

                <Animated.View>
                    <ButtonPressable
                        activeOpacity={0.5}
                        style={[styles.item, (active === item.code) ? styles.active : null]}
                        onPress={() => handleChange(item.code)}>
                        <View style={[styles.icon]}>
                            <CountryFlag isoCode={item.isoCode} size={28} style={{ borderRadius: 4, borderWidth: 1, borderColor: '#cccccc' }} />
                        </View>
                        <View className='d-flex gap-1'>
                            <Text className='flex-1' style={[text.sub_heading, text.black]}>
                                {t(item.locale)}{/* i18next-extract-disable-line */}
                            </Text>
                            <Text style={[{ fontWeight: 400 }, (active === item.code) ? text.light_grey : text.grey]}>
                                {t(item.details)}{/* i18next-extract-disable-line */}
                            </Text>
                        </View>
                        <View style={[]}>

                        </View>
                    </ButtonPressable>
                </Animated.View>

            )} />


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    icon: {
        width: 30,
        marginRight: 30,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#F2F2F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 8
    },
    active: {
        backgroundColor: '#ffd167ff'
    }
});