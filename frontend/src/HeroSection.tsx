import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Slides with translation keys
  const slides = [
    { image: "/tajikistan-bg.jpg", titleKey: "hero_iskanderkul", descKey: "hero_iskanderkul_desc" },
    { image: "/lake.jpg", titleKey: "hero_nurek", descKey: "hero_nurek_desc" },
    { image: "/ismoilisomoni.jpg", titleKey: "hero_somoni", descKey: "hero_somoni_desc" },
    { image: "/libos.jpg", titleKey: "hero_attire", descKey: "hero_attire_desc" },
    { image: "/khojaobigarm.jpg", titleKey: "hero_khujand", descKey: "hero_khujand_desc" },
    { image: "/museum.jpg", titleKey: "hero_museum", descKey: "hero_museum_desc" },
    { image: "/mountain.jpg", titleKey: "hero_pamir", descKey: "hero_pamir_desc" },
    { image: "/machid.jpg", titleKey: "hero_mosque", descKey: "hero_mosque_desc" },
    { image: "/hero.jpg", titleKey: "hero_tajikistan", descKey: "hero_tajikistan_desc" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const { image, titleKey, descKey } = slides[index];

  return (
    <div
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center transition-all duration-700 ease-in-out"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className={`relative z-10 transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#f0f9ff] drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
          {t(titleKey)}
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-6 leading-relaxed text-gray-100">
          {t(descKey)}
        </p>
        <a
          href="#routes"
          className="mt-6 inline-block px-8 py-3 bg-[#FFD700] text-gray-900 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          {t("explore_btn")}
        </a>
      </div>
      <div className="absolute bottom-6 flex space-x-2 z-10">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-yellow-400 w-4" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
