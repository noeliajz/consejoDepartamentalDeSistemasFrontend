import React from "react";
import NavbarLateral from "../Components/NavbarLateral";

import {
  Plus,
  Eye,
  Pencil,
  Search,
  Bell,
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react";

const Disposicion = () => {
  // Simulación usuario admin
  const user = {
    role: "admin",
  };

  const disposiciones = [
    {
      id: 1,
      numero: "DISP-CD-014",
      tipo: "De Consejo",
      descripcion: "Aprobación plan de estudio",
      fecha: "10/04/2025",
      estado: "Aprobada",
    },
    {
      id: 2,
      numero: "DISP-DIR-013",
      tipo: "De Dirección",
      descripcion: "Autorización viáticos",
      fecha: "05/04/2025",
      estado: "Pendiente",
    },
    {
      id: 3,
      numero: "DISP-CD-012",
      tipo: "Académica",
      descripcion: "Designación docente",
      fecha: "28/03/2025",
      estado: "En revisión",
    },
  ];

  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Navbar */}
      <NavbarLateral user={user} />

      {/* Contenido */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Gestión de Disposiciones
            </h1>

            <p className="text-slate-500 mt-1">
              Administración y seguimiento de disposiciones institucionales
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
              <Bell size={18} />
              Notificar
            </button>

            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-md transition">
              <Plus size={18} />
              Nueva disposición
            </button>
          </div>
        </div>

        {/* Cards resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CardResumen
            titulo="Total Disposiciones"
            valor="36"
            icon={<FileText size={24} />}
          />

          <CardResumen
            titulo="Aprobadas"
            valor="28"
            icon={<CheckCircle size={24} />}
          />

          <CardResumen
            titulo="Pendientes"
            valor="8"
            icon={<Clock size={24} />}
          />
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {/* Top */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Disposiciones registradas
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Listado completo de disposiciones institucionales
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="text"
                placeholder="Buscar disposición..."
                className="pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="text-left py-4">
                    Nº disposición
                  </th>

                  <th className="text-left py-4">
                    Tipo
                  </th>

                  <th className="text-left py-4">
                    Descripción
                  </th>

                  <th className="text-left py-4">
                    Fecha
                  </th>

                  <th className="text-left py-4">
                    Estado
                  </th>

                  <th className="text-left py-4">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {disposiciones.map((disp) => (
                  <tr
                    key={disp.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-5 font-medium text-slate-700">
                      {disp.numero}
                    </td>

                    <td className="py-5">
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 font-medium">
                        {disp.tipo}
                      </span>
                    </td>

                    <td className="py-5 text-slate-600">
                      {disp.descripcion}
                    </td>

                    <td className="py-5 text-slate-600">
                      {disp.fecha}
                    </td>

                    <td className="py-5">
                      <EstadoBadge estado={disp.estado} />
                    </td>

                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition">
                          <Eye size={18} className="text-slate-700" />
                        </button>

                        <button className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition">
                          <Pencil
                            size={18}
                            className="text-slate-700"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const CardResumen = ({ titulo, valor, icon }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-slate-500 text-sm">
          {titulo}
        </p>

        <h3 className="text-3xl font-bold text-slate-800 mt-2">
          {valor}
        </h3>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
        {icon}
      </div>
    </div>
  );
};

const EstadoBadge = ({ estado }) => {
  const colores = {
    Aprobada:
      "bg-green-100 text-green-700",

    Pendiente:
      "bg-yellow-100 text-yellow-700",

    "En revisión":
      "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colores[estado]}`}
    >
      {estado}
    </span>
  );
};

export default Disposicion;