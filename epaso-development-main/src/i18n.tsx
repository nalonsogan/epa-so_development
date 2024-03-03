import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import translationEnglish from "./locales/en.json";

const resources = {
  en: {
    translation: translationEnglish,
  }
};

i18next.use(initReactI18next).init({
  resources,
  supportedLngs: ["en"],
  lng: 'en'
  // lng:
  //   sessionStorage.getItem(process.env.REACT_APP_SESSIONSTORAGE_LANG!) || "es", // default language
});

export default i18next;
