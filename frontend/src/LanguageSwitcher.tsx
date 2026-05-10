// src/LanguageSwitcher.tsx
import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English", flag: "/flags/en.png" },
  { code: "ru", label: "Русский", flag: "/flags/ru.png" },
  { code: "tj", label: "Тоҷикӣ", flag: "/flags/tj.png" },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation(); // ✅ Берём i18n из react-i18next, а не напрямую

  const handleLanguageChange = (lng: string) => {
    if (i18n.changeLanguage) {
      i18n.changeLanguage(lng); // ✅ Теперь это точно функция
    } else {
      console.error("⚠️ i18n.changeLanguage не доступен!");
    }
  };

  return (
    <div className="flex items-center space-x-3 ml-6">
      {languages.map((lang) => {
        const active = i18n.language === lang.code;

        return (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            aria-label={`Switch to ${lang.label}`}
            className={`relative flex items-center space-x-2 px-2 py-1 rounded-md transition-all duration-300 hover:scale-110 focus:outline-none ${
              active ? "bg-primary/20 shadow-md" : "bg-transparent"
            }`}
            title={lang.label}
          >
            <img
              src={lang.flag}
              alt={lang.code}
              className={`w-5 h-5 rounded-sm transition-all ${
                active
                  ? "ring-2 ring-yellow-400 shadow-[0_0_8px_rgba(255,215,0,0.7)]"
                  : "opacity-80"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
