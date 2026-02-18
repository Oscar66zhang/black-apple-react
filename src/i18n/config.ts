import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_zh_CN from "./languages/zh-CN.json";
import translation_zh_TW from "./languages/zh-TW.json";
import translation_en_US from "./languages/en-US.json";
import translation_fr_FR from "./languages/fr-FR.json";
import store from "@/redux/store";

const resources = {
    "zh-CN": {
        translation: translation_zh_CN,
    },
    "zh-TW": {
        translation: translation_zh_TW,
    },
    "en-US": {
        translation: translation_en_US,
    },
    "fr-FR": {
        translation: translation_fr_FR,
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: store.getState().i18n.currentLanguage, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        fallbackLng: "zh-CN", // use en if detected lng is not available
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

//订阅Reducx store 以监听语言的变化
store.subscribe(() => {
    const language = store.getState().i18n.currentLanguage;
    console.log("Language changed to:", language);
    i18n.changeLanguage(language);
});
export default i18n;
