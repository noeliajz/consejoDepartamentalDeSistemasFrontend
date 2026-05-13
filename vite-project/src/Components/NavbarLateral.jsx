import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Folder,
  Calendar,
  ClipboardList,
  FileText,
  Users,
  Vote,
  LogIn,
  UserPlus,
  BarChart3,
} from "lucide-react";

import logo from "../assets/logo.png";

const NavbarLateral = ({ user }) => {
  return (
    <aside className="w-64 h-screen bg-blue-900 text-white fixed left-0 top-0 flex flex-col">

      {/* Header */}
      <div className="p-5 border-b border-blue-800">
        <img src={logo} alt="logo" className="w-8 h-8 mb-3" />

        <h2 className="text-xl font-bold">
          Consejo Directivo
        </h2>

        <p className="text-sm text-blue-200">
          Panel de administración
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">

        {!user && (
          <>
            <MenuItem
              to="/login"
              icon={<LogIn size={18} />}
              text="Iniciar sesión"
            />

            <MenuItem
              to="/registro"
              icon={<UserPlus size={18} />}
              text="Registrarse"
            />
          </>
        )}

        {user?.role === "admin" && (
          <>
            <MenuItem
              to="/dashboard"
              icon={<LayoutDashboard size={18} />}
              text="Dashboard"
            />

            <MenuItem
              to="/Expediente"
              icon={<Folder size={18} />}
              text="Expedientes"
            />

            <MenuItem
              to="/Trazabilidad"
              icon={<Calendar size={18} />}
              text="Trazabilidad"
            />

            <MenuItem
              to="/Reunion"
              icon={<ClipboardList size={18} />}
              text="Reuniones"
            />

            <MenuItem
              to="/OrdenDelDia"
              icon={<Vote size={18} />}
              text="Orden del día"
            />

            <MenuItem
              to="/Comision"
              icon={<FileText size={18} />}
              text="Comisiones"
            />

            {/* VOTACIONES */}
            <MenuItem
              to="/Votacion"
              icon={<Users size={18} />}
              text="Votaciones"
            />

            <MenuItem
              to="/Acta"
              icon={<FileText size={18} />}
              text="Actas"
            />

            <MenuItem
              to="/Disposicion"
              icon={<FileText size={18} />}
              text="Disposiciones"
            />

            <MenuItem
              to="/Consejero"
              icon={<Users size={18} />}
              text="Consejeros"
            />

            <MenuItem
              to="/Usuario"
              icon={<Users size={18} />}
              text="Usuarios"
            />

            <MenuItem
              to="/Reporte"
              icon={<BarChart3 size={18} />}
              text="Reportes"
            />

            <MenuItem
              to="/Notificacion"
              icon={<Users size={18} />}
              text="Notificaciones"
            />
          </>
        )}
      </nav>
    </aside>
  );
};

const MenuItem = ({ icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-white ${
          isActive
            ? "bg-blue-700"
            : "hover:bg-blue-800"
        }`
      }
    >
      {icon}

      <span>{text}</span>
    </NavLink>
  );
};

export default NavbarLateral;