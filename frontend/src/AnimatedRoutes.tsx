import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import App from "./App";
import Navruz from "./pages/Navruz";
import Handicrafts from "./pages/Handicrafts";
import Dance from "./pages/Dance";
import ObjectsPage from "./pages/ObjectsPage";
import ObjectDetailPage from "./pages/ObjectDetailPage";
import InfrastructurePage from "./pages/InfrastructurePage";
import MapPage from "./pages/MapPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<App />} />
          <Route path="/navruz" element={<Navruz />} />
          <Route path="/handicrafts" element={<Handicrafts />} />
          <Route path="/dance" element={<Dance />} />
          <Route path="/objects" element={<ObjectsPage />} />
          <Route path="/objects/:id" element={<ObjectDetailPage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
