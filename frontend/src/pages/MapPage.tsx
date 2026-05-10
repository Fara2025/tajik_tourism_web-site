import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getCulturalObjects, getInfrastructure, CulturalObject, InfrastructureItem } from '../api';
import { Link } from 'react-router-dom';

// Исправление иконок Leaflet для React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Кастомные иконки для типов
const objectIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hotelIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const foodIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const transportIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const otherIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function localized(en: string, ru: string, tj: string, lang: string): string {
  if (lang === "ru" && ru) return ru;
  if (lang === "tj" && tj) return tj;
  return en;
}

const MapPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [objects, setObjects] = useState<CulturalObject[]>([]);
  const [infra, setInfra] = useState<InfrastructureItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [objData, infraData] = await Promise.all([
          getCulturalObjects(),
          getInfrastructure()
        ]);
        setObjects(objData.filter(o => o.latitude && o.longitude));
        setInfra(infraData.filter(i => i.latitude && i.longitude));
      } catch (error) {
        console.error("Error loading map data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Центр Таджикистана
  const position: [number, number] = [38.5, 71.0];

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pt-24 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[calc(100vh-160px)] flex flex-col">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">{t('map_title')}</h1>
          <p className="text-gray-600">{t('map_subtitle')}</p>
        </div>

        <div className="flex-grow rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative z-10">
          {loading ? (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : null}

          <MapContainer center={position} zoom={7} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <LayersControl position="topright">
              <LayersControl.Overlay checked name={t('map_legend_objects')}>
                <div className="leaflet-layer">
                  {objects.map(obj => (
                    <Marker 
                      key={`obj-${obj.id}`} 
                      position={[obj.latitude!, obj.longitude!]}
                      icon={objectIcon}
                    >
                      <Popup>
                        <div className="p-1 max-w-[200px]">
                          {obj.image && (
                            <img src={obj.image} alt="" className="w-full h-24 object-cover rounded-lg mb-2" />
                          )}
                          <h3 className="font-bold text-gray-800 leading-tight mb-1">
                            {localized(obj.title, obj.title_ru, obj.title_tj, lang)}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {localized(obj.description, obj.description_ru, obj.description_tj, lang)}
                          </p>
                          <Link 
                            to={`/objects/${obj.id}`}
                            className="text-primary text-xs font-bold hover:underline"
                          >
                            {t('learn_more')} →
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </div>
              </LayersControl.Overlay>

              {/* Отели */}
              <LayersControl.Overlay checked name={t('inf_hotel')}>
                <div className="leaflet-layer">
                  {infra.filter(i => i.inf_type === 'hotel').map(item => (
                    <Marker key={`hotel-${item.id}`} position={[item.latitude!, item.longitude!]} icon={hotelIcon}>
                      <Popup>
                        <div className="p-1">
                          <h3 className="font-bold text-gray-800">{localized(item.name, item.name_ru, item.name_tj, lang)}</h3>
                          <p className="text-xs text-yellow-600 font-medium mb-1">{item.type_display} 🏨</p>
                          <p className="text-xs text-gray-500 italic">📍 {item.address}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </div>
              </LayersControl.Overlay>

              {/* Еда / Рестораны */}
              <LayersControl.Overlay checked name={t('inf_restaurant')}>
                <div className="leaflet-layer">
                  {infra.filter(i => i.inf_type === 'restaurant').map(item => (
                    <Marker key={`food-${item.id}`} position={[item.latitude!, item.longitude!]} icon={foodIcon}>
                      <Popup>
                        <div className="p-1 max-w-[200px]">
                          <h3 className="font-bold text-gray-800 leading-tight mb-1">
                            {localized(item.name, item.name_ru, item.name_tj, lang)}
                          </h3>
                          <p className="text-xs text-orange-600 font-bold mb-1">{item.type_display} 🍽️</p>
                          {item.description && (
                            <p className="text-xs text-gray-600 mb-2">{localized(item.description, item.description_ru, item.description_tj, lang)}</p>
                          )}
                          <p className="text-xs text-gray-500 italic mb-1">📍 {item.address}</p>
                          {item.phone && (
                            <p className="text-xs font-semibold text-primary">📞 {item.phone}</p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </div>
              </LayersControl.Overlay>

              {/* Транспорт */}
              <LayersControl.Overlay checked name={t('inf_transport')}>
                <div className="leaflet-layer">
                  {infra.filter(i => i.inf_type === 'transport').map(item => (
                    <Marker key={`transport-${item.id}`} position={[item.latitude!, item.longitude!]} icon={transportIcon}>
                      <Popup>
                        <div className="p-1 max-w-[200px]">
                          <h3 className="font-bold text-gray-800 leading-tight mb-1">
                            {localized(item.name, item.name_ru, item.name_tj, lang)}
                          </h3>
                          <p className="text-xs text-purple-600 font-bold mb-1">{item.type_display} 🚌</p>
                          {item.description && (
                            <p className="text-xs text-gray-600 mb-2">{localized(item.description, item.description_ru, item.description_tj, lang)}</p>
                          )}
                          <p className="text-xs text-gray-500 italic mb-1">📍 {item.address}</p>
                          {item.phone && (
                            <p className="text-xs font-semibold text-primary">📞 {item.phone}</p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </div>
              </LayersControl.Overlay>

              {/* Другое */}
              <LayersControl.Overlay name={t('inf_other')}>
                <div className="leaflet-layer">
                  {infra.filter(i => !['hotel', 'restaurant', 'transport'].includes(i.inf_type)).map(item => (
                    <Marker key={`other-${item.id}`} position={[item.latitude!, item.longitude!]} icon={otherIcon}>
                      <Popup>
                        <div className="p-1">
                          <h3 className="font-bold text-gray-800">{localized(item.name, item.name_ru, item.name_tj, lang)}</h3>
                          <p className="text-xs text-green-600 font-medium mb-1">{item.type_display} 📌</p>
                          <p className="text-xs text-gray-500 italic">📍 {item.address}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </div>
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>

          {/* Легенда */}
          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-[1000] border border-gray-100 hidden md:block">
             <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">{t('nav_map')}</h4>
             <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                   <span className="text-sm font-medium text-gray-700">{t('map_legend_objects')}</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   <span className="text-sm font-medium text-gray-700">{t('inf_hotel')}</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                   <span className="text-sm font-medium text-gray-700">{t('inf_restaurant')}</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                   <span className="text-sm font-medium text-gray-700">{t('inf_transport')}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapPage;
