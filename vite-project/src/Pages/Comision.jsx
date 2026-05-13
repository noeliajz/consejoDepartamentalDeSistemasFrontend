// src/pages/Comision.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

import NavbarLateral from "../components/NavbarLateral";

import {
  Bell,
  Plus,
  Send,
  Users,
  FileText,
  ClipboardList,
} from "lucide-react";

const expedientes = [
  {
    id: 1,
    expediente: "EXP-2025-046",
    descripcion: "Designación auxiliar informática",
    comision: "Enseñanza",
    asignado: "30/04/25",
    asistencia: "5/6",
    color: "bg-blue-100 text-blue-700",
  },

  {
    id: 2,
    expediente: "EXP-2025-043",
    descripcion: "Impugnación concurso docente",
    comision: "Interp. y fund.",
    asignado: "25/04/25",
    asistencia: "3/6",
    color: "bg-purple-100 text-purple-700",
  },

  {
    id: 3,
    expediente: "EXP-2025-041",
    descripcion: "Cambio correlativas estudiantes",
    comision: "Académica",
    asignado: "18/04/25",
    asistencia: "6/6",
    color: "bg-green-100 text-green-700",
  },

  {
    id: 4,
    expediente: "EXP-2025-039",
    descripcion: "Actualización reglamento interno",
    comision: "Reglamento",
    asignado: "10/04/25",
    asistencia: "4/6",
    color: "bg-orange-100 text-orange-700",
  },
];

const Comision = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <NavbarLateral user={{ role: "admin" }} />

      {/* Main */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Comisiones
            </h1>

            <p className="text-slate-500 mt-1">
              Administración y seguimiento de expedientes asignados
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition">
              <Bell size={18} />
              Notificar reunión
            </button>

            <button
              onClick={() => navigate("/nuevo-expediente")}
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
            >
              <Plus size={18} />
              Nuevo expediente
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  Comisión Enseñanza
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  6
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Expedientes en análisis
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  Interpretación y fundamento
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  3
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Expedientes en análisis
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <ClipboardList size={24} />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  Total activos
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  12
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Expedientes asignados
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                <FileText size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Asignación de expedientes a comisiones
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Seguimiento de expedientes derivados
              </p>
            </div>

            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition">
              <Plus size={16} />
              Nueva asignación
            </button>
          </div>

          {/* Encabezados */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase tracking-wide">
            <div className="col-span-2">
              Expediente
            </div>

            <div className="col-span-3">
              Descripción
            </div>

            <div className="col-span-2">
              Comisión
            </div>

            <div className="col-span-2">
              Asignado
            </div>

            <div className="col-span-1">
              Asistencia
            </div>

            <div className="col-span-2 text-center">
              Acciones
            </div>
          </div>

          {/* Filas */}
          {expedientes.map((exp) => (
            <div
              key={exp.id}
              className="grid grid-cols-12 gap-4 px-6 py-5 items-center border-b border-slate-100 hover:bg-slate-50 transition"
            >
              {/* Expediente */}
              <div className="col-span-2 font-semibold text-slate-800">
                {exp.expediente}
              </div>

              {/* Descripción */}
              <div className="col-span-3 text-slate-700">
                {exp.descripcion}
              </div>

              {/* Comisión */}
              <div className="col-span-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${exp.color}`}
                >
                  {exp.comision}
                </span>
              </div>

              {/* Fecha */}
              <div className="col-span-2 text-slate-600">
                {exp.asignado}
              </div>

              {/* Asistencia */}
              <div className="col-span-1">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {exp.asistencia}
                </span>
              </div>

              {/* Acciones */}
              <div className="col-span-2 flex items-center justify-center gap-3">
                <button className="w-10 h-10 rounded-xl border border-slate-300 hover:bg-slate-100 flex items-center justify-center transition">
                  <Send size={18} />
                </button>

                <button className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium transition">
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Comision;