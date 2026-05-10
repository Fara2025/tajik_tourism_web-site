import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  getCulturalObjects,
  getCategories,
  getRegions,
  CulturalObject,
  Category,
  Region,
} from "../api";

// Вспомогательная функция для получения локализованного текста
function localized(en: string, ru: string, tj: string, lang: string): string {
  if (lang === "ru" && ru) return ru;
  if (lang === "tj" && tj) return tj;
  return en;
}

export default function ObjectsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [objects, setObjects] = useState<CulturalObject[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Фильтры
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedRegion, setSelectedRegion] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  // Загрузка категорий и регионов
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
    getRegions().then(setRegions).catch(console.error);
  }, []);

  // Загрузка объектов при изменении фильтров
  useEffect(() => {
    setLoading(true);
    setError(null);
    getCulturalObjects({
      category: selectedCategory,
      region: selectedRegion,
      search: searchQuery || undefined,
    })
      .then((data) => {
        setObjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(t("error_loading"));
        setLoading(false);
        console.error(err);
      });
  }, [selectedCategory, selectedRegion, searchQuery, t]);

  const resetFilters = () => {
    setSelectedCategory(undefined);
    setSelectedRegion(undefined);
    setSearchQuery("");
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Заголовок */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-primary text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🏛️ {t("objects_title")}
        </motion.h1>
        <p className="text-center text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          {t("objects_subtitle")}
        </p>

        {/* Фильтры */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Поиск */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                🔍 {t("filter_search")}
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("filter_search_placeholder")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              />
            </div>

            {/* Категория */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                📂 {t("filter_category")}
              </label>
              <select
                value={selectedCategory ?? ""}
                onChange={(e) =>
                  setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition bg-white"
              >
                <option value="">{t("filter_all_categories")}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {localized(cat.name, cat.name_ru, cat.name_tj, lang)}
                  </option>
                ))}
              </select>
            </div>

            {/* Регион */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                📍 {t("filter_region")}
              </label>
              <select
                value={selectedRegion ?? ""}
                onChange={(e) =>
                  setSelectedRegion(e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition bg-white"
              >
                <option value="">{t("filter_all_regions")}</option>
                {regions.map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {localized(reg.name, reg.name_ru, reg.name_tj, lang)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Кнопка сброса */}
          {(selectedCategory || selectedRegion || searchQuery) && (
            <button
              onClick={resetFilters}
              className="mt-4 text-sm text-primary hover:underline transition"
            >
              ✕ {t("filter_reset")}
            </button>
          )}
        </div>

        {/* Результаты */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">{error}</p>
            <p className="text-gray-500 mt-2">{t("error_check_backend")}</p>
          </div>
        ) : objects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">😔 {t("objects_not_found")}</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:scale-105 transition"
            >
              {t("filter_reset")}
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-4">
              {t("objects_found")}: {objects.length}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {objects.map((obj, index) => (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/objects/${obj.id}`} className="block group">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                      {/* Изображение */}
                      <div className="relative h-56 overflow-hidden">
                        {obj.image ? (
                          <img
                            src={obj.image}
                            alt={localized(obj.title, obj.title_ru, obj.title_tj, lang)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-6xl">🏛️</span>
                          </div>
                        )}
                        {/* Бейдж категории */}
                        <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                          {obj.category_name}
                        </span>
                      </div>

                      {/* Контент */}
                      <div className="p-5">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
                          {localized(obj.title, obj.title_ru, obj.title_tj, lang)}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {localized(obj.description, obj.description_ru, obj.description_tj, lang)}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>📍 {obj.location}</span>
                          {obj.reviews_count > 0 && (
                            <span>⭐ {obj.reviews_count} {t("reviews")}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
