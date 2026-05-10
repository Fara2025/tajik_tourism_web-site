import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Импорт переводов напрямую (синхронно)
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import tj from "./locales/tj.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      tj: { translation: tj },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
