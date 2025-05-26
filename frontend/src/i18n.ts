import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import HttpBackend from "i18next-http-backend";
import translationEn from './locales/en.json';
import translationUa from './locales/uk.json';

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        interpolation: { escapeValue: false },
        lng: 'uk',
        // fallbackLng: 'en',
        // backend: {
        //     loadPath: '/locales/{{lng}}.json'
        // },
        resources : {
            en : {
                translation : translationEn,
            },
            uk : {
                translation : translationUa,
            }
        }
    });


// .init({
//     interpolation: { escapeValue: false }, // React already does escaping
//     lng: 'uk',                              // default language
//     resources: {
//         en: {
//             translation: {
//                 "hope_on_wings_returns" : "HOPE ON WINGS RETURNS"
//                 // Add more translations as needed
//             }
//         },
//         uk: {
//             translation: {
//                 "hope_on_wings_returns" : "НАДІЯ НА КРИЛАХ ПОВЕРТАЄТЬСЯ"
//                 // Add more translations as needed
//             }
//         }
//     }
// });
export default i18n;
