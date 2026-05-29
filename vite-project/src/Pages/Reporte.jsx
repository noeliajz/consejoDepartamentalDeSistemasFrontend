// src/pages/Reporte.jsx

import React, { useEffect, useState } from "react";

import axios from "axios";

import NavbarHorizontalAdmin from "../Components/NavbarHorizontalAdmin";

import {
  FileBarChart,
  Download,
  Upload,
  Filter,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
} from "lucide-react";

const API = "http://localhost:5000/api/estadisticas";

const Reporte = () => {
  // ============================================
  // USUARIO
  // ============================================
  const user = {
    role: "admin",
  };

  // ============================================
  // STATE
  // ============================================
  const [dashboard, setDashboard] = useState({
    asistenciaPromedio: 0,

    totalExpedientes: 0,

    tasaAprobacion: 0,

    totalDisposiciones: 0,

    totalReuniones: 0,

    asistenciaConsejeros: [],
  });

  const [loading, setLoading] = useState(true);

  // ============================================
  // OBTENER DASHBOARD
  // ============================================
  const obtenerDashboard = async () => {
    try {
      const response = await axios.get(`${API}/dashboard`);

      console.log("Dashboard:", response.data);

      setDashboard({
        asistenciaPromedio: response.data.asistenciaPromedio || 0,

        totalExpedientes: response.data.totalExpedientes || 0,

        tasaAprobacion: response.data.tasaAprobacion || 0,

        totalDisposiciones: response.data.totalDisposiciones || 0,

        totalReuniones: response.data.totalReuniones || 0,

        asistenciaConsejeros: response.data.asistenciaConsejeros || [],
      });
    } catch (error) {
      console.error("Error dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // USE EFFECT
  // ============================================
  useEffect(() => {
    obtenerDashboard();
  }, []);

  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* NAVBAR */}
      <NavbarHorizontalAdmin user={user} />

      {/* MAIN */}
      <main className="flex-1 ml-64 p-8">
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Reportes y Estadísticas
              </h1>

              <p className="text-slate-500 mt-1">
                Visualización y generación de reportes institucionales
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FileBarChart size={32} className="text-blue-700" />
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
            <p className="text-slate-500 text-lg">Cargando estadísticas...</p>
          </div>
        ) : (
          <>
            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <CardEstadistica
                titulo="Asistencia promedio"
                valor={`${dashboard.asistenciaPromedio}%`}
                descripcion="Consejeros presentes"
                icon={<TrendingUp size={24} />}
              />

              <CardEstadistica
                titulo="Expedientes"
                valor={dashboard.totalExpedientes}
                descripcion="Total registrados"
                icon={<FileText size={24} />}
              />

              <CardEstadistica
                titulo="Tasa aprobación"
                valor={`${dashboard.tasaAprobacion}%`}
                descripcion="Votaciones aprobadas"
                icon={<CheckCircle size={24} />}
              />

              <CardEstadistica
                titulo="Disposiciones"
                valor={dashboard.totalDisposiciones}
                descripcion="Total emitidas"
                icon={<Users size={24} />}
              />
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* PANEL GENERAL */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Filter className="text-blue-700" size={22} />

                  <h2 className="text-xl font-semibold text-slate-800">
                    Información general
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                    <p className="text-slate-500 text-sm">Total reuniones</p>

                    <h3 className="text-2xl font-bold text-slate-800 mt-1">
                      {dashboard.totalReuniones}
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                    <p className="text-slate-500 text-sm">Total expedientes</p>

                    <h3 className="text-2xl font-bold text-slate-800 mt-1">
                      {dashboard.totalExpedientes}
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                    <p className="text-slate-500 text-sm">
                      Disposiciones emitidas
                    </p>

                    <h3 className="text-2xl font-bold text-slate-800 mt-1">
                      {dashboard.totalDisposiciones}
                    </h3>
                  </div>
                </div>
              </div>

              {/* ASISTENCIA */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="text-blue-700" size={22} />

                  <h2 className="text-xl font-semibold text-slate-800">
                    Asistencia por consejero
                  </h2>
                </div>

                <div className="space-y-5">
                  {!dashboard.asistenciaConsejeros ||
                  dashboard.asistenciaConsejeros.length === 0 ? (
                    <p className="text-slate-500">
                      No hay asistencias registradas
                    </p>
                  ) : (
                    dashboard.asistenciaConsejeros.map((item, index) => {
                      const porcentaje =
                        item.total > 0
                          ? Math.round((item.presentes / item.total) * 100)
                          : 0;

                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-slate-700">
                              {item.consejero}
                            </span>

                            <span className="text-sm font-semibold text-slate-500">
                              {item.presentes}/{item.total}
                            </span>
                          </div>

                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-700 rounded-full"
                              style={{
                                width: `${porcentaje}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* REPORTES */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Acciones de reporte
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BotonReporte
                  icon={<Download size={20} />}
                  texto="Reporte consejeros"
                />

                <BotonReporte
                  icon={<Download size={20} />}
                  texto="Reporte comisiones"
                />

                <BotonReporte
                  icon={<Download size={20} />}
                  texto="Reporte votaciones"
                />

                <BotonReporte
                  icon={<Upload size={20} />}
                  texto="Subir a Drive"
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

// ============================================
// CARD ESTADISTICA
// ============================================
const CardEstadistica = ({ titulo, valor, descripcion, icon }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-slate-500 text-sm">{titulo}</p>

        <h3 className="text-3xl font-bold text-slate-800 mt-2">{valor}</h3>

        <p className="text-sm text-slate-400 mt-1">{descripcion}</p>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
        {icon}
      </div>
    </div>
  );
};

// ============================================
// BOTON REPORTE
// ============================================
const BotonReporte = ({ icon, texto }) => {
  return (
    <button className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-slate-300 hover:bg-blue-50 hover:border-blue-300 transition text-slate-700 font-medium">
      {icon}

      {texto}
    </button>
  );
};

export default Reporte;
