// src/pages/Reunion.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

import NavbarLateral from "../components/NavbarLateral";

import {
  Bell,
  Plus,
  CalendarDays,
  Users,
  FileText,
  Eye,
  Pencil,
} from "lucide-react";

const reuniones = [
  {
    sesion: "05/2025",
    fecha: "10/04/2025",
    tipo: "Ordinaria",
    quorum: "11/13",
    temas: "4 aprobaciones",
    estado: "Cerrada",
  },

  {
    sesion: "EX/2025",
    fecha: "28/02/2025",
    tipo: "Extraordinaria",
    quorum: "9/13",
    temas: "Concurso docente",
    estado: "Cerrada",
  },

  {
    sesion: "04/2025",
    fecha: "13/03/2025",
    tipo: "Ordinaria",
    quorum: "10/13",
    temas: "3 expedientes",
    estado: "Cerrada",
  },

  {
    sesion: "03/2025",
    fecha: "22/02/2025",
    tipo: "Ordinaria",
    quorum: "12/13",
    temas: "Presupuesto anual",
    estado: "Abierta",
  },
];

const Reunion = () => {
  const navigate = useNavigate();

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Extraordinaria":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Cerrada":
        return "bg-green-100 text-green-700";

      case "Abierta":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <NavbarLateral user={{ role: "admin" }} />

      {/* Main */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Reuniones
            </h1>

            <p className="text-slate-500 mt-1">
              Gestión de sesiones y reuniones del consejo directivo
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Notificaciones */}
            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition">
              <Bell size={18} />
              Notificar reunión
            </button>

            {/* Nueva reunión */}
            <button
              onClick={() => navigate("/nueva-reunion")}
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
            >
              <Plus size={18} />
              Nueva reunión
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  Total realizadas
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  5
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  De 8 ordinarias anuales
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <CalendarDays size={24} />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  Ordinarias
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  5
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Quedan 3 disponibles
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  Extraordinarias
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  1
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Este año
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <FileText size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header tabla */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Historial de reuniones
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Sesiones registradas del consejo
              </p>
            </div>

            <button
              onClick={() => navigate("/nueva-reunion")}
              className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
            >
              <Plus size={16} />
              Nueva
            </button>
          </div>

          {/* Encabezados */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase tracking-wide">
            <div className="col-span-2">Sesión</div>

            <div className="col-span-2">Fecha</div>

            <div className="col-span-2">Tipo</div>

            <div className="col-span-1">Quórum</div>

            <div className="col-span-3">Temas</div>

            <div className="col-span-1">Estado</div>

            <div className="col-span-1 text-center">
              Acciones
            </div>
          </div>

          {/* Filas */}
          {reuniones.map((reunion, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 px-6 py-5 items-center border-b border-slate-100 hover:bg-slate-50 transition"
            >
              <div className="col-span-2 font-semibold text-slate-800">
                {reunion.sesion}
              </div>

              <div className="col-span-2 text-slate-600">
                {reunion.fecha}
              </div>

              <div className="col-span-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getTipoColor(
                    reunion.tipo
                  )}`}
                >
                  {reunion.tipo}
                </span>
              </div>

              <div className="col-span-1 text-slate-700 font-medium">
                {reunion.quorum}
              </div>

              <div className="col-span-3 text-slate-700">
                {reunion.temas}
              </div>

              <div className="col-span-1">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(
                    reunion.estado
                  )}`}
                >
                  {reunion.estado}
                </span>
              </div>

              {/* Acciones */}
              <div className="col-span-1 flex items-center justify-center gap-2">
                <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-700 transition">
                  <Eye size={18} />
                </button>

                <button className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-700 transition">
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reunion;