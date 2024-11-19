import i18next from "i18next"; // Import i18next core
import { initReactI18next } from "react-i18next"; // Import react-i18next for integration

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
    },
  },
  vi: {
    translation: {
      welcome: "Chào mừng",
    },
  },
};

i18next
  .use(initReactI18next) // Integrates i18next with react-i18next
  .init({
    resources,
    lng: "vi", // Default language
    interpolation: {
      escapeValue: false, // React escapes values by default
    },
  });

export default i18next;
