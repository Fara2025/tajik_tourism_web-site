import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

import { useAuth } from "../AuthContext";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isHome = location.pathname === "/";

  const navLinks = [
    { href: isHome ? "#home" : "/", label: t("nav_home") },
    { href: isHome ? "#culture" : "/#culture", label: t("nav_culture") },
    { href: "/objects", label: t("nav_objects") },
    { href: isHome ? "#routes" : "/#routes", label: t("nav_tours") },
    { href: "/map", label: t("nav_map") },
    { href: "/infrastructure", label: t("nav_infrastructure") },
    { href: isHome ? "#contact" : "/#contact", label: t("nav_contact") },
    { href: "/about", label: t("nav_about") },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl font-bold text-primary hover:scale-105 transition-transform">
          Туризм <span className="text-secondary">Таджикистана</span>
        </Link>

        {/* Навигация для компьютеров */}
        <nav className="hidden lg:flex space-x-6 text-gray-700 font-medium items-center">
          {navLinks.map((link) =>
            link.href.startsWith("/") && !link.href.startsWith("/#") ? (
              <Link
                key={link.label}
                to={link.href}
                className="hover:text-primary transition relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full text-sm"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-primary transition relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full text-sm"
              >
                {link.label}
              </a>
            )
          )}
          
          <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-primary font-bold hover:underline text-sm">
                {user.first_name || user.username}
              </Link>
              <button 
                onClick={logout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs transition"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20"
            >
              {t('login')}
            </Link>
          )}

          <LanguageSwitcher />
        </nav>

        {/* Бургер-кнопка */}
        <button
          className="md:hidden text-gray-700 text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <nav className="lg:hidden bg-white shadow-md flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium animate-fadeIn">
          {navLinks.map((link) =>
            link.href.startsWith("/") && !link.href.startsWith("/#") ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-primary transition"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-primary transition"
              >
                {link.label}
              </a>
            )
          )}
          
          <div className="w-20 h-[1px] bg-gray-100 my-2"></div>
          
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-primary font-bold">
                {user.username}
              </Link>
              <button onClick={() => { logout(); setMenuOpen(false); }} className="text-red-500">
                {t('logout')}
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="bg-primary text-white px-6 py-2 rounded-full">
              {t('login')}
            </Link>
          )}
          <LanguageSwitcher />
        </nav>
      )}
    </header>
  );
};

export default Header;
