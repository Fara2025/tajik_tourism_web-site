import AOS from "aos";
import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BookingModal from "./components/BookingModal";
import { createContactMessage } from "./api";

const AutoSlider = ({ images, alt }: { images: string[], alt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${alt} ${idx}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          } transition-transform duration-700 group-hover:scale-110`}
          referrerPolicy="no-referrer"
        />
      ))}
    </div>
  );
};

function App() {
  const { t, i18n } = useTranslation();
  const [bookingData, setBookingData] = useState<{ isOpen: boolean; name: string; type: 'tour' | 'masterclass' | 'other' }>({
    isOpen: false,
    name: "",
    type: "tour"
  });

  // Состояние формы контактов
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setContactStatus({ type: null, msg: '' });
    try {
      await createContactMessage(contactForm);
      setContactStatus({ type: 'success', msg: t('review_success') || 'Message sent!' });
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setContactStatus({ type: 'error', msg: t('booking_error') || 'Failed to send message.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openBooking = (name: string, type: 'tour' | 'masterclass' | 'other') => {
    setBookingData({ isOpen: true, name, type });
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Главный блок */}
      <HeroSection />

      {/* Секция Culture & Traditions */}
      <section id="culture" data-aos="fade-up" className="w-full bg-gray-50 py-20 text-gray-800">
        <h2 className="text-4xl font-bold mb-4 text-primary text-center">{t("culture_title")}</h2>
        <p className="max-w-2xl mx-auto text-lg mb-12 text-center text-gray-600">{t("culture_desc")}</p>

        {(() => {
          const formatPrice = (tjs: number) => {
            if (i18n.language === "ru") return `${Math.round(tjs * 8.2).toLocaleString("ru-RU")} ₽`;
            if (i18n.language === "tj") return `${tjs.toLocaleString("ru-RU")} сомонӣ`;
            return `$${Math.round(tjs / 10.8).toLocaleString("en-US")}`;
          };

          const masterclasses = [
            { images: ["/culture/media__1778248099723.png", "/culture/media__1778248167930.png", "/culture/media__1778248201479.jpg"], title: t("navruz_title"), desc: t("navruz_desc"), price: 400, warning: t("navruz_warning") },
            { images: ["/culture/media__1778247801551.png", "/culture/media__1778247814606.jpg", "/culture/media__1778247847515.png"], title: t("ceramics_title"), desc: t("ceramics_desc"), price: 350 },
            { images: ["/culture/media__1778248377302.png", "/culture/media__1778248465665.png", "/culture/media__1778248517217.png", "/culture/media__1778248543359.png"], title: t("jewelry_title"), desc: t("jewelry_desc"), price: 500 },
            { image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Tajik_dance_performance_during_Nawruz.jpg", title: t("dance_title"), desc: t("dance_desc"), price: 300 },
          ];

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
              {masterclasses.map((item) => (
                <div key={item.title} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    {item.images ? (
                      <AutoSlider images={item.images} alt={item.title} />
                    ) : (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    )}
                    {item.warning && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {item.warning}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{item.desc}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-primary font-bold text-lg">{formatPrice(item.price)}</span>
                      <button 
                        onClick={() => openBooking(item.title, 'masterclass')}
                        className="px-5 py-2 bg-secondary text-white rounded-full font-semibold hover:bg-green-700 transition shadow-md"
                      >
                        {t("book_now")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* Cultural Highlights */}
      <section id="highlights" className="w-full bg-white py-20 text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-10">{t("highlights_title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-6xl mx-auto">
          {[
            { name: t("place_pamir"), image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Pamir_Mountains_panorama.jpg", desc: t("place_pamir_desc") },
            { name: t("place_dushanbe"), images: [
                "/dushanbe/media__1778247439589.png",
                "/dushanbe/media__1778247475511.png",
                "/dushanbe/media__1778247492276.jpg",
                "/dushanbe/media__1778247513895.png",
                "/dushanbe/media__1778247556596.png"
            ], desc: t("place_dushanbe_desc") },
            { name: t("place_istaravshan"), image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/%D0%98%D1%81%D1%82%D0%B0%D1%80%D0%B0%D0%B2%D1%88%D0%B0%D0%BD%2C_%D0%B0%D0%B2%D0%B3%D1%83%D1%81%D1%82%D0%B8_2025_%2842252%29.jpg", desc: t("place_istaravshan_desc") },
            { name: t("place_isfara"), image: "https://upload.wikimedia.org/wikipedia/commons/8/81/%D0%91%D0%BE%D0%B7%D0%BE%D1%80%D0%B8_%D1%88._%D0%98%D1%81%D1%84%D0%B0%D1%80%D0%B0_%284%29.jpg", desc: t("place_isfara_desc") },
            { name: t("place_khujand"), image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/View_to_Khujand.JPG", desc: t("place_khujand_desc") },
            { name: t("place_khorog"), image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Khorog_1.jpg", desc: t("place_khorog_desc") },
          ].map((place) => (
            <div key={place.name} className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
              <div className="relative h-56 overflow-hidden">
                {place.images ? (
                  <AutoSlider images={place.images} alt={place.name} />
                ) : (
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-30">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow">📍 {place.name}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{place.name}</h3>
                <p className="text-gray-600 text-sm">{place.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Tours & Routes */}
      <section id="routes" data-aos="zoom-in" className="w-full bg-gradient-to-b from-[#f0fdfa] to-[#e0f7fa] py-20 text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-4 text-primary">{t("tours_title")}</h2>
        <p className="max-w-2xl mx-auto text-lg mb-12 text-center">{t("tours_desc")}</p>
        {(() => {
          // Базовые цены в сомони (TJS)
          const basePrices = [1200, 3200, 1600, 1100, 2700, 1400];
          const formatPrice = (tjs: number) => {
            if (i18n.language === "ru") return `${Math.round(tjs * 8.2).toLocaleString("ru-RU")} ₽`;
            if (i18n.language === "tj") return `${tjs.toLocaleString("ru-RU")} сомонӣ`;
            return `$${Math.round(tjs / 10.8).toLocaleString("en-US")}`;
          };
          const tours = [
            { name: t("tour_dushanbe_khujand"), images: ["https://upload.wikimedia.org/wikipedia/commons/4/47/Downtown_Dushanbe_1.jpg", "https://upload.wikimedia.org/wikipedia/commons/c/c9/Khujand_River.jpg", "https://upload.wikimedia.org/wikipedia/commons/6/6d/View_to_Khujand.JPG"], desc: t("tour_dushanbe_khujand_desc"), price: formatPrice(basePrices[0]), days: "3", loc: "Dushanbe → Khujand" },
            { name: t("tour_pamir_highway"), images: ["/pamir/media__1778247039076.jpg", "/pamir/media__1778247248181.png", "/pamir/media__1778247263491.png", "/pamir/media__1778247278710.jpg", "/pamir/media__1778247350634.jpg"], desc: t("tour_pamir_highway_desc"), price: formatPrice(basePrices[1]), days: "7", loc: "Dushanbe → Khorog → Murghab" },
            { name: t("tour_istaravshan"), images: ["https://upload.wikimedia.org/wikipedia/commons/c/c0/%D0%98%D1%81%D1%82%D0%B0%D1%80%D0%B0%D0%B2%D1%88%D0%B0%D0%BD%2C_%D0%B0%D0%B2%D0%B3%D1%83%D1%81%D1%82%D0%B8_2025_%2842252%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/d5/%D0%98%D1%81%D1%82%D0%B0%D1%80%D0%B0%D0%B2%D1%88%D0%B0%D0%BD%2C_%D0%B0%D0%B2%D0%B3%D1%83%D1%81%D1%82%D0%B8_2025_%2887910%29.jpg"], desc: t("tour_istaravshan_desc"), price: formatPrice(basePrices[2]), days: "2", loc: "Istaravshan" },
            { name: t("tour_isfara"), images: ["https://upload.wikimedia.org/wikipedia/commons/8/81/%D0%91%D0%BE%D0%B7%D0%BE%D1%80%D0%B8_%D1%88._%D0%98%D1%81%D1%84%D0%B0%D1%80%D0%B0_%284%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/f/ff/Isfara%2CChorku.jpg", "https://upload.wikimedia.org/wikipedia/commons/9/90/Sanatorium_Zumrad_in_Isfara_02.jpg"], desc: t("tour_isfara_desc"), price: formatPrice(basePrices[3]), days: "2", loc: "Isfara" },
            { name: t("tour_khorog"), images: ["https://upload.wikimedia.org/wikipedia/commons/6/6c/Khorog_1.jpg", "https://upload.wikimedia.org/wikipedia/commons/5/5a/View_of_Khorog_from_the_Botanical_Gardens.jpg"], desc: t("tour_khorog_desc"), price: formatPrice(basePrices[4]), days: "5", loc: "GBAO, Khorog" },
            { name: t("tour_penjikent"), images: ["https://upload.wikimedia.org/wikipedia/commons/a/a8/Alaudin_Lake_in_Fann_Mountains.jpg", "https://upload.wikimedia.org/wikipedia/commons/4/49/Fann_Mountains_vertical_2013.jpg"], desc: t("tour_penjikent_desc"), price: formatPrice(basePrices[5]), days: "2", loc: "Penjikent" },
          ];
          return (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-6xl mx-auto">
                {tours.map((tour) => (
                  <div key={tour.name} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <AutoSlider images={tour.images} alt={tour.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-30">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full">📍 {tour.loc}</span>
                        <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">🕐 {tour.days} {i18n.language === "ru" ? "дн." : i18n.language === "tj" ? "рӯз" : "days"}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-2">{tour.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{tour.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold text-lg">{tour.price}</span>
                        <button 
                          onClick={() => openBooking(tour.name, 'tour')}
                          className="px-4 py-2 bg-[#FFD700] text-gray-900 rounded-full font-semibold hover:scale-105 transition"
                        >
                          {t("book_now")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-400 text-xs mt-6 max-w-lg mx-auto italic">
                {t("price_disclaimer")}
              </p>
            </>
          );
        })()}
      </section>

      {/* Browse Objects CTA */}
      <section className="w-full bg-primary/5 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("cta_objects_title")}</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">{t("cta_objects_desc")}</p>
        <Link to="/objects" className="inline-block px-8 py-3 bg-primary text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-lg">{t("cta_objects_btn")}</Link>
      </section>

      {/* Contact */}
      <section id="contact" data-aos="fade-left" className="w-full bg-white py-20 text-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-4 text-primary">{t("contact_title")}</h2>
        <p className="max-w-2xl mx-auto text-lg mb-12">{t("contact_text")}</p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          <form onSubmit={handleContactSubmit} className="bg-gray-100 p-8 rounded-2xl shadow-md text-left">
            {contactStatus.type && (
              <div className={`p-4 rounded-xl mb-6 text-sm ${contactStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {contactStatus.msg}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">{t("form_name")}</label>
              <input 
                type="text" 
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required 
                placeholder={t("form_name_placeholder")} 
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">{t("form_email")}</label>
              <input 
                type="email" 
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required 
                placeholder={t("form_email_placeholder")} 
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">{t("form_message")}</label>
              <textarea 
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                required 
                placeholder={t("form_message_placeholder")} 
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-primary text-white font-semibold py-3 rounded-xl transition ${isSubmitting ? 'opacity-70' : 'hover:bg-green-700 shadow-lg shadow-primary/20'}`}
            >
              {isSubmitting ? t('loading') : t("form_submit")}
            </button>
          </form>
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe title="Tajikistan Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4365441.620157833!2d67.20903323497408!3d38.861034859741496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b17dcaf06d4e07%3A0x9b47b699bf4f568e!2sTajikistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" className="h-full min-h-[400px]"></iframe>
          </div>
        </div>
      </section>
      
      <BookingModal 
        isOpen={bookingData.isOpen}
        onClose={() => setBookingData({ ...bookingData, isOpen: false })}
        serviceName={bookingData.name}
        serviceType={bookingData.type}
      />
    </>
  );
}

export default App;
