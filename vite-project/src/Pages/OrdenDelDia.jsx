// src/pages/OrdenDelDia.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarLateral from "../components/NavbarLateral";

import {
  Bell,
  Plus,
  ArrowUp,
  ArrowDown,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

const temasIniciales = [
  {
    id: 1,
    titulo: "Aprobación del acta sesión 05/2025",
    categoria: "Otros · Trámite",
    estado: "Con despacho",
  },

  {
    id: 2,
    titulo: "Informe de dirección",
    categoria: "Otros · Informe",
    estado: "Con despacho",
  },

  {
    id: 3,
    titulo: "EXP-2025-047 — Beca comedor Pérez",
    categoria: "Docentes",
    estado: "Con despacho",
  },

  {
    id: 4,
    titulo: "EXP-2025-046 — Designación auxiliar",
    categoria: "Docentes",
    estado: "Con despacho",
  },

  {
    id: 5,
    titulo: "Reconocimiento actividad extensión",
    categoria: "Extensión",
    estado: "Pendiente",
  },
];

const OrdenDelDia = () => {
  const navigate = useNavigate();

  const [temas, setTemas] = useState(temasIniciales);

  // mover arriba
  const moverArriba = (index) => {
    if (index === 0) return;

    const nuevosTemas = [...temas];

    [nuevosTemas[index - 1], nuevosTemas[index]] = [
      nuevosTemas[index],
      nuevosTemas[index - 1],
    ];

    setTemas(nuevosTemas);
  };

  // mover abajo
  const moverAbajo = (index) => {
    if (index === temas.length - 1) return;

    const nuevosTemas = [...temas];

    [nuevosTemas[index + 1], nuevosTemas[index]] = [
      nuevosTemas[index],
      nuevosTemas[index + 1],
    ];

    setTemas(nuevosTemas);
  };

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
              Orden del día
            </h1>

            <p className="text-slate-500 mt-1">
              Gestión de temas y expedientes para sesiones
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

        {/* Info sesión */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  Sesión actual
                </p>

                <h2 className="text-xl font-bold text-slate-800 mt-2">
                  Ordinaria 06/2025
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  20 de mayo
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
                  Temas cargados
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {temas.length}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Incluidos en sesión
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                <ClipboardList size={24} />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  Con despacho
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  4
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Listos para tratar
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <ClipboardList size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Lista */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header lista */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-5 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Sesión ordinaria 06/2025 · 20 de mayo
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                {temas.length} temas cargados
              </p>
            </div>

            <button
              className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
            >
              <Plus size={16} />
              Tema provisorio
            </button>
          </div>

          {/* Temas */}
          <div className="p-5 space-y-4">
            {temas.map((tema, index) => (
              <div
                key={tema.id}
                className="border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left */}
                  <div className="flex items-start gap-4">
                    {/* Número */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">
                        {tema.titulo}
                      </h3>

                      <p className="text-slate-500 text-sm mt-1">
                        {tema.categoria}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-3">
                    {/* Estado */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tema.estado === "Con despacho"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {tema.estado}
                    </span>

                    {/* Botones */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moverArriba(index)}
                        className="w-10 h-10 rounded-xl border border-slate-300 hover:bg-slate-100 flex items-center justify-center transition"
                      >
                        <ArrowUp size={18} />
                      </button>

                      <button
                        onClick={() => moverAbajo(index)}
                        className="w-10 h-10 rounded-xl border border-slate-300 hover:bg-slate-100 flex items-center justify-center transition"
                      >
                        <ArrowDown size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdenDelDia;