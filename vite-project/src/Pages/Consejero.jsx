import React from "react";
import NavbarLateral from "../Components/NavbarLateral";

import {
  Plus,
  Search,
  Bell,
  Users,
  UserCheck,
  AlertTriangle,
  Pencil,
  Mail,
  Phone,
} from "lucide-react";

const Consejero = () => {
  // Simulación usuario admin
  const user = {
    role: "admin",
  };

  const consejeros = [
    {
      id: 1,
      nombre: "Roberto López",
      cargo: "Profesor Titular",
      claustro: "Docente",
      estado: "Activo",
      asistencias: "5/5",
      email: "roberto@utn.edu.ar",
      telefono: "3815552233",
    },
    {
      id: 2,
      nombre: "Ana Martínez",
      cargo: "Graduado",
      claustro: "Claustro Graduados",
      estado: "Activo",
      asistencias: "4/5",
      email: "ana@utn.edu.ar",
      telefono: "3815559988",
    },
    {
      id: 3,
      nombre: "Carlos Fernández",
      cargo: "Estudiante",
      claustro: "Claustro Estudiantil",
      estado: "Con licencia",
      asistencias: "3/5",
      email: "carlos@utn.edu.ar",
      telefono: "3814441122",
    },
    {
      id: 4,
      nombre: "Diana García",
      cargo: "Profesor Adjunto",
      claustro: "Docente",
      estado: "2 ausencias",
      asistencias: "3/5",
      email: "diana@utn.edu.ar",
      telefono: "3817776655",
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
              Gestión de Consejeros
            </h1>

            <p className="text-slate-500 mt-1">
              Administración y seguimiento de consejeros departamentales
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
              <Bell size={18} />
              Notificar reunión
            </button>

            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-md transition">
              <Plus size={18} />
              Nuevo consejero
            </button>
          </div>
        </div>

        {/* Alerta */}
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle size={20} />

          <p className="text-sm font-medium">
            Dar de baja al consejero Diana García — registra 2
            ausencias consecutivas en reuniones.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CardResumen
            titulo="Consejeros activos"
            valor="14"
            icon={<Users size={24} />}
          />

          <CardResumen
            titulo="Asistencia promedio"
            valor="92%"
            icon={<UserCheck size={24} />}
          />

          <CardResumen
            titulo="Con licencia"
            valor="2"
            icon={<AlertTriangle size={24} />}
          />
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {/* Top */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Consejeros registrados
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Listado completo de consejeros y estado actual
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="text"
                placeholder="Buscar consejero..."
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
                    Consejero
                  </th>

                  <th className="text-left py-4">
                    Claustro
                  </th>

                  <th className="text-left py-4">
                    Contacto
                  </th>

                  <th className="text-left py-4">
                    Asistencia
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
                {consejeros.map((consejero) => (
                  <tr
                    key={consejero.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    {/* Nombre */}
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          {consejero.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {consejero.nombre}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {consejero.cargo}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Claustro */}
                    <td className="py-5 text-slate-600">
                      {consejero.claustro}
                    </td>

                    {/* Contacto */}
                    <td className="py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail size={14} />
                          {consejero.email}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone size={14} />
                          {consejero.telefono}
                        </div>
                      </div>
                    </td>

                    {/* Asistencia */}
                    <td className="py-5 text-slate-700 font-medium">
                      {consejero.asistencias}
                    </td>

                    {/* Estado */}
                    <td className="py-5">
                      <EstadoBadge
                        estado={consejero.estado}
                      />
                    </td>

                    {/* Acciones */}
                    <td className="py-5">
                      <button className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition">
                        <Pencil
                          size={18}
                          className="text-slate-700"
                        />
                      </button>
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
    Activo:
      "bg-green-100 text-green-700",

    "Con licencia":
      "bg-yellow-100 text-yellow-700",

    "2 ausencias":
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colores[estado]}`}
    >
      {estado}
    </span>
  );
};

export default Consejero;