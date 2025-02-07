import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Home from './Home';
import Login from './Login';
import AdminPage from './admin/AdminPage';
import AdminLocalizadorPage from './admin/localizadores/AdminLocalizadorPage';
import LocalizadorPage from './localizador/LocalizadorPage';
import AdminReportesPage from './admin/reportes/AdminReportesPage';
import AdminVehiculosPage from './admin/vehiculos/AdminVehiculosPage';
import AdminPerfilPage from './admin/perfil/AdminPerfilPage';
import Report from './user/report/Report';
import VehicleList from './user/vehicle/VehicleList';
import VehicleDetail from './user/vehicle/VehicleDetail';
import ProtectedRoute from './ProtectedRoute';
import Mapa from './Mapa';
import Footer from './components/foot/Footer';
import Navbar from './components/nav/Navbar';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <PageWrapper><AdminPage /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/conductores"
          element={
            <ProtectedRoute requiredRole="admin">
              <PageWrapper><AdminLocalizadorPage /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reportes"
          element={
            <ProtectedRoute requiredRole="admin">
              <PageWrapper><AdminReportesPage /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vehiculos"
          element={
            <ProtectedRoute requiredRole="admin">
              <PageWrapper><AdminVehiculosPage /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/perfil"
          element={
            <ProtectedRoute requiredRole="admin">
              <PageWrapper><AdminPerfilPage /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/localizador"
          element={
            <ProtectedRoute requiredRole="localizador">
              <PageWrapper><LocalizadorPage /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route path="/reportar" element={<PageWrapper><Report /></PageWrapper>} />
        <Route path="/recolectores" element={<PageWrapper><VehicleList /></PageWrapper>} />
        <Route path="/recolectores/:id" element={<PageWrapper><VehicleDetail /></PageWrapper>} />
        <Route path="/mapa" element={<PageWrapper><Mapa /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
