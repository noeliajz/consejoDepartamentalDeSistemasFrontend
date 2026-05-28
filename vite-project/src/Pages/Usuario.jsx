// src/pages/Usuario.jsx

import React, { useEffect, useState } from "react";

import NavbarLateral from "../Components/NavbarLateral";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Bell,
  Users,
  ShieldCheck,
  Clock3,
  Mail,
  Pencil,
  Trash2,
  Download,
  Phone,
} from "lucide-react";

const API = "http://localhost:5000/api/usuarios";

const Usuario = () => {
  const navigate = useNavigate();

  const user = {
    role: "admin",
  };

  const [usuarios, setUsuarios] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const [loading, setLoading] = useState(true);

  // =========================
  // OBTENER USUARIOS
  // =========================
  const obtenerUsuarios = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API);

      console.log(response.data);

      if (Array.isArray(response.data)) {
        setUsuarios(response.data);
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);

      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // =========================
  // ELIMINAR
  // =========================
  const eliminarUsuario = async (id) => {
    const confirmar = window.confirm("¿Desea eliminar este usuario?");

    if (!confirmar) return;

    try {
      await axios.delete(`${API}/${id}`);

      obtenerUsuarios();

      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error(error);

      alert("Error al eliminar usuario");
    }
  };

  // =========================
  // PDF
  // =========================
  const generarPDF = (usuario) => {
    window.print();
  };

  // =========================
  // FILTRAR
  // =========================
  const usuariosFiltrados = usuarios.filter((u) =>
    `
        ${u.nombre || ""}
        ${u.apellido || ""}
        ${u.mail || ""}
        ${u.rol || ""}
        ${u.estado || ""}
        ${u.claustro || ""}
      `
      .toLowerCase()
      .includes(busqueda.toLowerCase()),
  );

  // =========================
  // CONTADORES
  // =========================
  const totalUsuarios = usuarios.length;

  const administradores = usuarios.filter((u) => u.rol === "admin").length;

  const activos = usuarios.filter((u) => u.estado === "Activo").length;

  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Navbar */}
      <NavbarLateral user={user} />

      {/* Contenido */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-200
            p-6
            mb-8
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-slate-800
              "
            >
              Gestión de Usuarios
            </h1>

            <p
              className="
                text-slate-500
                mt-1
              "
            >
              Administración de usuarios y accesos del sistema
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <button
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                border
                border-slate-300
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <Bell size={18} />
              Notificaciones
            </button>

            <button
              onClick={() => navigate("/NuevoUsuario")}
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-blue-700
                hover:bg-blue-800
                text-white
                shadow-md
                transition
              "
            >
              <Plus size={18} />
              Nuevo usuario
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mb-8
          "
        >
          <CardResumen
            titulo="Usuarios registrados"
            valor={totalUsuarios}
            icon={<Users size={24} />}
          />

          <CardResumen
            titulo="Administradores"
            valor={administradores}
            icon={<ShieldCheck size={24} />}
          />

          <CardResumen
            titulo="Usuarios activos"
            valor={activos}
            icon={<Clock3 size={24} />}
          />
        </div>

        {/* Tabla */}
        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-200
            p-6
          "
        >
          {/* Top */}
          <div
            className="
              flex
              items-center
              justify-between
              mb-6
            "
          >
            <div>
              <h2
                className="
                  text-xl
                  font-semibold
                  text-slate-800
                "
              >
                Usuarios del sistema
              </h2>

              <p
                className="
                  text-slate-500
                  text-sm
                  mt-1
                "
              >
                Control y gestión de accesos institucionales
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="
                  absolute
                  left-3
                  top-3
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Buscar usuario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="
                  pl-10
                  pr-4
                  py-2
                  rounded-xl
                  border
                  border-slate-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table
              className="
                w-full
                border-collapse
              "
            >
              <thead>
                <tr
                  className="
                    border-b
                    border-slate-200
                    text-slate-500
                    text-sm
                  "
                >
                  <th className="text-left py-4">Usuario</th>

                  <th className="text-left py-4">Contacto</th>

                  <th className="text-left py-4">Rol</th>

                  <th className="text-left py-4">Claustro</th>

                  <th className="text-left py-4">Estado</th>

                  <th className="text-left py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="
                        text-center
                        py-10
                        text-slate-500
                      "
                    >
                      Cargando usuarios...
                    </td>
                  </tr>
                ) : (
                  <>
                    {usuariosFiltrados.map((usuario) => (
                      <tr
                        key={usuario._id}
                        className="
                            border-b
                            border-slate-100
                            hover:bg-slate-50
                            transition
                          "
                      >
                        {/* Usuario */}
                        <td className="py-5">
                          <div
                            className="
                                flex
                                items-center
                                gap-4
                              "
                          >
                            <div
                              className="
                                  w-12
                                  h-12
                                  rounded-full
                                  bg-blue-100
                                  text-blue-700
                                  flex
                                  items-center
                                  justify-center
                                  font-bold
                                "
                            >
                              {(usuario.nombre || "U").charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <h3
                                className="
                                    font-semibold
                                    text-slate-800
                                  "
                              >
                                {usuario.nombre} {usuario.apellido}
                              </h3>

                              <p
                                className="
                                    text-sm
                                    text-slate-500
                                  "
                              >
                                {usuario.tipo}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contacto */}
                        <td className="py-5">
                          <div
                            className="
                                space-y-1
                              "
                          >
                            <div
                              className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  text-slate-600
                                "
                            >
                              <Mail size={14} />

                              {usuario.mail || "Sin mail"}
                            </div>

                            <div
                              className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  text-slate-600
                                "
                            >
                              <Phone size={14} />

                              {usuario.celular || "Sin celular"}
                            </div>
                          </div>
                        </td>

                        {/* Rol */}
                        <td className="py-5">
                          <RolBadge rol={usuario.rol} />
                        </td>

                        {/* Claustro */}
                        <td
                          className="
                              py-5
                              text-slate-600
                            "
                        >
                          {usuario.claustro || "-"}
                        </td>

                        {/* Estado */}
                        <td className="py-5">
                          <EstadoBadge estado={usuario.estado} />
                        </td>

                        {/* Acciones */}
                        <td className="py-5">
                          <div
                            className="
                                flex
                                items-center
                                gap-3
                                flex-wrap
                              "
                          >
                            {/* EDITAR */}
                            <button
                              onClick={() =>
                                navigate(`/EditarUsuario/${usuario._id}`)
                              }
                              className="
                                  rounded-lg
                                  border
                                  border-yellow-200
                                  bg-yellow-50
                                  px-4
                                  py-2
                                  text-sm
                                  font-semibold
                                  text-yellow-700
                                  hover:bg-yellow-100
                                  transition
                                "
                            >
                              <Pencil size={16} />
                            </button>

                            {/* PDF */}
                            <button
                              onClick={() => generarPDF(usuario)}
                              className="
                                  flex
                                  items-center
                                  gap-2
                                  rounded-lg
                                  border
                                  border-blue-200
                                  bg-blue-50
                                  px-4
                                  py-2
                                  text-sm
                                  font-semibold
                                  text-blue-700
                                  hover:bg-blue-100
                                  transition
                                "
                            >
                              <Download size={16} />
                              PDF
                            </button>

                            {/* ELIMINAR */}
                            <button
                              onClick={() => eliminarUsuario(usuario._id)}
                              className="
                                  flex
                                  items-center
                                  gap-2
                                  rounded-lg
                                  border
                                  border-red-200
                                  bg-red-50
                                  px-4
                                  py-2
                                  text-sm
                                  font-semibold
                                  text-red-700
                                  hover:bg-red-100
                                  transition
                                "
                            >
                              <Trash2 size={16} />
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {usuariosFiltrados.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="
                            text-center
                            py-10
                            text-slate-500
                          "
                        >
                          No se encontraron usuarios
                        </td>
                      </tr>
                    )}
                  </>
                )}
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
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-6
        flex
        items-center
        justify-between
        hover:shadow-md
        transition
      "
    >
      <div>
        <p
          className="
            text-slate-500
            text-sm
          "
        >
          {titulo}
        </p>

        <h3
          className="
            text-3xl
            font-bold
            text-slate-800
            mt-2
          "
        >
          {valor}
        </h3>
      </div>

      <div
        className="
          w-14
          h-14
          rounded-2xl
          bg-blue-100
          flex
          items-center
          justify-center
          text-blue-700
        "
      >
        {icon}
      </div>
    </div>
  );
};

const RolBadge = ({ rol }) => {
  const colores = {
    admin: "bg-blue-100 text-blue-700",

    user: "bg-green-100 text-green-700",

    moderador: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${colores[rol] || "bg-slate-100 text-slate-700"}
      `}
    >
      {rol}
    </span>
  );
};

const EstadoBadge = ({ estado }) => {
  const colores = {
    Activo: "bg-green-100 text-green-700",

    Baja: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${colores[estado] || "bg-slate-100 text-slate-700"}
      `}
    >
      {estado}
    </span>
  );
};

export default Usuario;
