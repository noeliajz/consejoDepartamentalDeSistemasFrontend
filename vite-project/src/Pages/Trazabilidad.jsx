// src/pages/Trazabilidad.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarLateral from "../components/NavbarLateral";

import {
  Bell,
  Plus,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  FileSearch,
  CalendarDays,
} from "lucide-react";

const expedientesMock = [
  {
    id: 1,
    codigo: "EXP-2025-047",
    titulo: "Beca comedor Pérez",
    estado: "En análisis",
    timeline: [
      {
        titulo: "Expediente creado",
        descripcion: "Mesa de entrada registró el expediente",
        fecha: "02/05/2025",
        icon: "clock",
      },
      {
        titulo: "Asignado a comisión estudiantil",
        descripcion: "Expediente enviado para análisis",
        fecha: "05/05/2025",
        icon: "search",
      },
      {
        titulo: "Despacho emitido",
        descripcion: "Comisión emite dictamen favorable",
        fecha: "09/05/2025",
        icon: "check",
      },
      {
        titulo: "En Orden del día — Sesión 06/2025",
        descripcion: "Punto 3 del orden del día",
        fecha: "20/05/2025",
        icon: "calendar",
      },
    ],
  },

  {
    id: 2,
    codigo: "EXP-2025-046",
    titulo: "Designación auxiliar",
    estado: "Pendiente",
    timeline: [
      {
        titulo: "Expediente creado",
        descripcion: "Ingresado por departamento académico",
        fecha: "01/05/2025",
        icon: "clock",
      },
      {
        titulo: "En revisión",
        descripcion: "Área administrativa revisa documentación",
        fecha: "03/05/2025",
        icon: "search",
      },
    ],
  },

  {
    id: 3,
    codigo: "EXP-2025-043",
    titulo: "Impugnación concurso",
    estado: "Finalizado",
    timeline: [
      {
        titulo: "Presentación realizada",
        descripcion: "Impugnación registrada correctamente",
        fecha: "28/04/2025",
        icon: "clock",
      },
      {
        titulo: "Resolución aprobada",
        descripcion: "Consejo directivo resolvió el expediente",
        fecha: "12/05/2025",
        icon: "check",
      },
    ],
  },
];

const Trazabilidad = () => {
  const navigate = useNavigate();

  const user = { role: "admin" };

  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(
    expedientesMock[0]
  );

  const renderIcon = (icon) => {
    switch (icon) {
      case "clock":
        return <Clock3 size={18} />;

      case "search":
        return <FileSearch size={18} />;

      case "check":
        return <CheckCircle2 size={18} />;

      case "calendar":
        return <CalendarDays size={18} />;

      default:
        return <Clock3 size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <NavbarLateral user={user} />

      {/* Main */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Trazabilidad de expedientes
            </h1>

            <p className="text-slate-500 mt-1">
              Seguimiento completo del estado y recorrido de los expedientes
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition">
              <Bell size={18} />
              Notificar reunión
            </button>

            <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition">
              <Plus size={18} />
              Nuevo expediente
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          {/* Left Panel */}
          <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-slate-800">
                Expedientes
              </h2>

              <button
                onClick={() => navigate("/ExpedienteTodos")}
                className="text-blue-700 font-medium flex items-center gap-1 hover:underline"
              >
                Ver todos
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {expedientesMock.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setExpedienteSeleccionado(exp)}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    expedienteSeleccionado.id === exp.id
                      ? "bg-blue-50 border-blue-500"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="font-semibold text-slate-800">
                    {exp.codigo}
                  </div>

                  <div className="text-slate-600 text-sm mt-1">
                    {exp.titulo}
                  </div>

                  <span
                    className={`inline-block mt-3 text-xs px-3 py-1 rounded-full font-medium ${
                      exp.estado === "Finalizado"
                        ? "bg-green-100 text-green-700"
                        : exp.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {exp.estado}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            {/* Select */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <select
                value={expedienteSeleccionado.id}
                onChange={(e) => {
                  const expediente = expedientesMock.find(
                    (exp) => exp.id === Number(e.target.value)
                  );

                  setExpedienteSeleccionado(expediente);
                }}
                className="w-full md:w-[450px] border border-slate-300 rounded-xl px-4 py-3 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {expedientesMock.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.codigo} — {exp.titulo}
                  </option>
                ))}
              </select>

              <button
                onClick={() => navigate("/expedientes-todos")}
                className="border border-slate-300 px-4 py-3 rounded-xl hover:bg-slate-100 transition flex items-center justify-center gap-2"
              >
                Ver todos
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Header expediente */}
            <div className="border-b border-slate-200 pb-5 mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {expedienteSeleccionado.codigo}
              </h2>

              <p className="text-slate-500 mt-1">
                {expedienteSeleccionado.titulo}
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Línea vertical */}
              <div className="absolute left-[15px] top-0 h-full w-[2px] bg-slate-200"></div>

              <div className="space-y-8">
                {expedienteSeleccionado.timeline.map((item, index) => (
                  <div key={index} className="relative flex gap-5">
                    {/* Icon */}
                    <div className="relative z-10 w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center shadow">
                      {renderIcon(item.icon)}
                    </div>

                    {/* Card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full hover:shadow-sm transition">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="font-semibold text-slate-800">
                          {item.titulo}
                        </h3>

                        <span className="text-sm text-slate-500">
                          {item.fecha}
                        </span>
                      </div>

                      <p className="text-slate-600 mt-2">
                        {item.descripcion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Trazabilidad;