import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getInfrastructure, getRegions, InfrastructureItem, Region } from "../api";

function localized(en: string, ru: string, tj: string, lang: string): string {
  if (lang === "ru" && ru) return ru;
  if (lang === "tj" && tj) return tj;
  return en;
}

const typeIcons: Record<string, string> = {
  hotel: "🏨", restaurant: "🍽️", transport: "🚌", shop: "🛒", hospital: "🏥", other: "📌",
};

export default function InfrastructurePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [items, setItems] = useState<InfrastructureItem[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedRegion, setSelectedRegion] = useState<number | undefined>();

  useEffect(() => { getRegions().then(setRegions).catch(console.error); }, []);

  useEffect(() => {
    setLoading(true);
    getInfrastructure({ inf_type: selectedType, region: selectedRegion })
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [selectedType, selectedRegion]);

  const types = [
    { value: "hotel", label: t("inf_hotel") },
    { value: "restaurant", label: t("inf_restaurant") },
    { value: "transport", label: t("inf_transport") },
    { value: "shop", label: t("inf_shop") },
    { value: "hospital", label: t("inf_hospital") },
    { value: "other", label: t("inf_other") },
  ];

  return (
    <motion.div className="min-h-screen bg-gray-50 pt-24 pb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          🏨 {t("infrastructure_title")}
        </motion.h1>
        <p className="text-center text-gray-600 text-lg mb-10 max-w-2xl mx-auto">{t("infrastructure_subtitle")}</p>

        {/* Type filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button onClick={() => setSelectedType(undefined)} className={`px-4 py-2 rounded-full font-medium transition ${!selectedType ? "bg-primary text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100"}`}>{t("filter_all")}</button>
          {types.map((tp) => (
            <button key={tp.value} onClick={() => setSelectedType(tp.value)} className={`px-4 py-2 rounded-full font-medium transition ${selectedType === tp.value ? "bg-primary text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100"}`}>
              {typeIcons[tp.value]} {tp.label}
            </button>
          ))}
        </div>

        {/* Region filter */}
        <div className="flex justify-center mb-10">
          <select value={selectedRegion ?? ""} onChange={(e) => setSelectedRegion(e.target.value ? Number(e.target.value) : undefined)} className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-primary/50">
            <option value="">{t("filter_all_regions")}</option>
            {regions.map((r) => <option key={r.id} value={r.id}>{localized(r.name, r.name_ru, r.name_tj, lang)}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>
        ) : items.length === 0 ? (
          <div className="text-center py-20"><p className="text-gray-500 text-xl">😔 {t("objects_not_found")}</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{typeIcons[item.inf_type] || "📌"}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{localized(item.name, item.name_ru, item.name_tj, lang)}</h3>
                    <span className="text-sm text-primary">{item.type_display}</span>
                  </div>
                </div>
                {(item.description || item.description_ru || item.description_tj) && (
                  <p className="text-gray-600 text-sm mb-3">{localized(item.description, item.description_ru, item.description_tj, lang)}</p>
                )}
                {item.address && <p className="text-sm text-gray-500">📍 {item.address}</p>}
                {item.phone && <p className="text-sm text-gray-500">📞 {item.phone}</p>}
                {item.website && <a href={item.website} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">🌐 {t("visit_website")}</a>}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
