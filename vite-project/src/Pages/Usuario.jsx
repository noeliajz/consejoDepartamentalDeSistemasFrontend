import React from "react";
import NavbarLateral from "../Components/NavbarLateral";

import {
  Plus,
  Search,
  Bell,
  Users,
  ShieldCheck,
  Clock3,
  Pencil,
  Mail,
} from "lucide-react";

const Usuario = () => {
  // Simulación usuario admin
  const user = {
    role: "admin",
  };

  const usuarios = [
    {
      id: 1,
      nombre: "María Sánchez",
      email: "m.sanchez@utn.edu.ar",
      rol: "Admin",
      ultimoAcceso: "Hoy 09:12",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Juan Torres",
      email: "j.torres@utn.edu.ar",
      rol: "Usuario",
      ultimoAcceso: "Ayer 15:40",
      estado: "Activo",
    },
    {
      id: 3,
      nombre: "Lucía Herrera",
      email: "l.herrera@utn.edu.ar",
      rol: "Usuario",
      ultimoAcceso: "02/05/25",
      estado: "Inactivo",
    },
    {
      id: 4,
      nombre: "Carlos Gómez",
      email: "c.gomez@utn.edu.ar",
      rol: "Moderador",
      ultimoAcceso: "Hoy 11:22",
      estado: "Activo",
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
              Gestión de Usuarios
            </h1>

            <p className="text-slate-500 mt-1">
              Administración de usuarios y accesos del sistema
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
              <Bell size={18} />
              Notificaciones
            </button>

            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-md transition">
              <Plus size={18} />
              Nuevo usuario
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CardResumen
            titulo="Usuarios registrados"
            valor="24"
            icon={<Users size={24} />}
          />

          <CardResumen
            titulo="Administradores"
            valor="4"
            icon={<ShieldCheck size={24} />}
          />

          <CardResumen
            titulo="Sesiones activas"
            valor="12"
            icon={<Clock3 size={24} />}
          />
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {/* Top */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Usuarios del sistema
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Control y gestión de accesos institucionales
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="text"
                placeholder="Buscar usuario..."
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
                    Usuario
                  </th>

                  <th className="text-left py-4">
                    Email
                  </th>

                  <th className="text-left py-4">
                    Rol
                  </th>

                  <th className="text-left py-4">
                    Último acceso
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
                {usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    {/* Usuario */}
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          {usuario.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {usuario.nombre}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Usuario institucional
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={16} />
                        {usuario.email}
                      </div>
                    </td>

                    {/* Rol */}
                    <td className="py-5">
                      <RolBadge rol={usuario.rol} />
                    </td>

                    {/* Último acceso */}
                    <td className="py-5 text-slate-600">
                      {usuario.ultimoAcceso}
                    </td>

                    {/* Estado */}
                    <td className="py-5">
                      <EstadoBadge
                        estado={usuario.estado}
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

const RolBadge = ({ rol }) => {
  const colores = {
    Admin:
      "bg-blue-100 text-blue-700",

    Usuario:
      "bg-green-100 text-green-700",

    Moderador:
      "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colores[rol]}`}
    >
      {rol}
    </span>
  );
};

const EstadoBadge = ({ estado }) => {
  const colores = {
    Activo:
      "bg-green-100 text-green-700",

    Inactivo:
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

export default Usuario;