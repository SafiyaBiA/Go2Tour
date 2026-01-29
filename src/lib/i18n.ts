import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly for the prototype to avoid async loading issues during demo
import enCommon from '@/locales/en/common.json';
import taCommon from '@/locales/ta/common.json';
import hiCommon from '@/locales/hi/common.json';

i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    .init({
        resources: {
            en: {
                common: enCommon
            },
            ta: {
                common: taCommon
            },
            hi: {
                common: hiCommon
            }
        },
        fallbackLng: 'ta',
        debug: true,
        lng: 'ta', // Forces Tamil initially if no detection
        defaultNS: 'common',

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;
