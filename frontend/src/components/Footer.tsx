import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 text-center">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Туризм Таджикистана</h3>
          <p className="text-sm leading-relaxed">
            {t("footer_about")}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">{t("footer_links")}</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/#home" className="hover:text-white transition"><i className="fas fa-home w-5"></i> {t("nav_home")}</a></li>
            <li><Link to="/objects" className="hover:text-white transition"><i className="fas fa-landmark w-5"></i> {t("nav_objects")}</Link></li>
            <li><a href="/#routes" className="hover:text-white transition"><i className="fas fa-map w-5"></i> {t("nav_tours")}</a></li>
            <li><Link to="/infrastructure" className="hover:text-white transition"><i className="fas fa-hotel w-5"></i> {t("nav_infrastructure")}</Link></li>
            <li><a href="/#contact" className="hover:text-white transition"><i className="fas fa-envelope w-5"></i> {t("nav_contact")}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">{t("footer_follow")}</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-xl mb-4">
            <a href="#" className="hover:text-white hover:scale-110 transition-all" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white hover:scale-110 transition-all" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-white hover:scale-110 transition-all" aria-label="Telegram"><i className="fab fa-telegram-plane"></i></a>
          </div>
          <div className="mt-4 text-sm space-y-2">
            <p><i className="fas fa-map-marker-alt w-5"></i> Dushanbe, Tajikistan</p>
            <p><i className="fas fa-envelope w-5"></i> info@tajiktour.tj</p>
            <p><i className="fas fa-phone w-5"></i> +992 900 123 456</p>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Туризм Таджикистана. {t("footer_rights")}
      </div>
    </footer>
  );
};

export default Footer;
