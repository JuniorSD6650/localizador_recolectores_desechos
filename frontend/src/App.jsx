// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import Mapa from './Mapa';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/conductores"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLocalizadorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reportes"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminReportesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vehiculos"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminVehiculosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/perfil"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPerfilPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/localizador"
          element={
            <ProtectedRoute requiredRole="localizador">
              <LocalizadorPage />
            </ProtectedRoute>
          }
        />

        <Route path="/reportar" element={<Report />} />
        <Route path="/recolectores" element={<VehicleList />} />
        <Route path="/recolectores/:id" element={<VehicleDetail />} />
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </Router>
  );
}

export default App;
