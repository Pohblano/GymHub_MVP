import i18n from 'i18next';
import * as Localization from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import { initReactI18next } from "react-i18next";
import en from "@/locales/en/translation.json";
import es from "@/locales/es/translation.json";

const languageDetector = {
    type: 'languageDetector',
    async: true, // async detection
    detect: async (callback) => {
        // Check if a user preference exists
        const storedLanguage = await SecureStore.getItemAsync('user-language');
        if (storedLanguage) {
            callback(storedLanguage);
        } else {
            callback(Localization.getLocales()[0].languageCode);
        }
    },
    init: () => {
    },
    cacheUserLanguage: (language) => {
        SecureStore.setItemAsync('user-language', language);
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(languageDetector)
    .init({
        fallbackLng: 'en',
        compatibilityJSON: 'v3',
        // the translations
        resources: {
            'en': {
                translation: en
            },
            'es': {
                translation: es
            },
            // have a initial namespace
            ns: ['translation'],
            supportedLngs: [  // Supported languages
                {
                    code: 'en',
                    locale: 'English',
                    details: 'from United States',
                    isoCode: 'us'
                }, {
                    code: 'es',
                    locale: 'Spanish',
                    details: 'from Mexico',
                    isoCode: 'mx'
                }
            ],
            defaultNS: 'translation',
            interpolation: {
                escapeValue: false // not needed for react
            }
        }
    })
    
export default i18n;