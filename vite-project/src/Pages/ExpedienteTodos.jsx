import React from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import NavbarLateral from "../components/NavbarLateral";

const expedientes = [
  {
    numero: "EXP-2025-047",
    titulo: "Beca comedor Pérez",
    categoria: "Estudiantes",
    estado: "En análisis",
    fecha: "02/05/2025",
  },

  {
    numero: "EXP-2025-046",
    titulo: "Designación auxiliar",
    categoria: "Docentes",
    estado: "Pendiente",
    fecha: "01/05/2025",
  },

  {
    numero: "EXP-2025-043",
    titulo: "Impugnación concurso",
    categoria: "Docentes",
    estado: "Finalizado",
    fecha: "28/04/2025",
  },

  {
    numero: "EXP-2025-041",
    titulo: "Cambio correlativas",
    categoria: "Estudiantes",
    estado: "Aprobado",
    fecha: "20/04/2025",
  },

  {
    numero: "EXP-2025-038",
    titulo: "Solicitud equivalencias",
    categoria: "Estudiantes",
    estado: "En revisión",
    fecha: "15/04/2025",
  },
];

const ExpedienteTodos = () => {
  const navigate = useNavigate();

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Finalizado":
      case "Aprobado":
        return "bg-green-100 text-green-700";

      case "Pendiente":
        return "bg-yellow-100 text-yellow-700";

      case "En análisis":
      case "En revisión":
        return "bg-blue-100 text-blue-700";

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate("/trazabilidad")}
                className="p-2 rounded-lg border border-slate-300 hover:bg-white transition"
              >
                <ArrowLeft size={18} />
              </button>

              <h1 className="text-3xl font-bold text-slate-800">
                Todos los expedientes
              </h1>
            </div>

            <p className="text-slate-500">
              Listado completo de expedientes registrados
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 uppercase tracking-wide">
            <div className="col-span-2">Expediente</div>

            <div className="col-span-4">Título</div>

            <div className="col-span-2">Categoría</div>

            <div className="col-span-2">Estado</div>

            <div className="col-span-1">Fecha</div>

            <div className="col-span-1 text-center">
              Acciones
            </div>
          </div>

          {/* Rows */}
          {expedientes.map((exp, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 px-6 py-5 items-center border-b border-slate-100 hover:bg-slate-50 transition"
            >
              <div className="col-span-2 font-semibold text-slate-800">
                {exp.numero}
              </div>

              <div className="col-span-4 text-slate-700">
                {exp.titulo}
              </div>

              <div className="col-span-2">
                <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full">
                  {exp.categoria}
                </span>
              </div>

              <div className="col-span-2">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${getEstadoColor(
                    exp.estado
                  )}`}
                >
                  {exp.estado}
                </span>
              </div>

              <div className="col-span-1 text-slate-600 text-sm">
                {exp.fecha}
              </div>

              {/* Acciones */}
              <div className="col-span-1 flex items-center justify-center gap-2">

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `¿Deseas eliminar el expediente ${exp.numero}?`
                      )
                    ) {
                      console.log(
                        "Eliminar expediente:",
                        exp.numero
                      );
                    }
                  }}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition"
                >
                  Eliminar
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `¿Deseas eliminar el expediente ${exp.numero}?`
                      )
                    ) {
                      console.log(
                        "Eliminar expediente:",
                        exp.numero
                      );
                    }
                  }}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExpedienteTodos;