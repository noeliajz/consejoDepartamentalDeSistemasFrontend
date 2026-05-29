// src/pages/Consejero.jsx

import React, { useEffect, useState } from "react";

import NavbarHorizontalAdmin from "../Components/NavbarHorizontalAdmin";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Bell,
  Users,
  UserCheck,
  AlertTriangle,
  Mail,
  Phone,
  Download,
  Trash2,
} from "lucide-react";

const API = "http://localhost:5000/api/consejeros";

const Consejero = () => {
  const navigate = useNavigate();

  const user = {
    role: "admin",
  };

  const [consejeros, setConsejeros] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const [loading, setLoading] = useState(true);

  // =========================
  // OBTENER CONSEJEROS
  // =========================
  const obtenerConsejeros = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API);

      console.log(response.data);

      if (Array.isArray(response.data)) {
        setConsejeros(response.data);
      } else {
        setConsejeros([]);
      }
    } catch (error) {
      console.error("Error al obtener consejeros:", error);

      setConsejeros([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerConsejeros();
  }, []);

  // =========================
  // ELIMINAR CONSEJERO
  // =========================
  const eliminarConsejero = async (id) => {
    const confirmar = window.confirm("¿Desea eliminar este consejero?");

    if (!confirmar) return;

    try {
      await axios.delete(`${API}/${id}`);

      obtenerConsejeros();

      alert("Consejero eliminado correctamente");
    } catch (error) {
      console.error(error);

      alert("Error al eliminar consejero");
    }
  };

  // =========================
  // GENERAR PDF
  // =========================
  const generarPDF = (consejero) => {
    window.print();
  };

  // =========================
  // FILTRAR
  // =========================
  const consejerosFiltrados = consejeros.filter((c) =>
    `
      ${c.nombre || ""}
      ${c.apellido || ""}
      ${c.claustro || ""}
      ${c.tipo || ""}
      ${c.estado || ""}
    `
      .toLowerCase()
      .includes(busqueda.toLowerCase()),
  );

  // =========================
  // CONTADORES
  // =========================
  const activos = consejeros.filter((c) => c.estado === "Activo").length;

  const conLicencia = consejeros.filter(
    (c) => c.estado === "Con licencia",
  ).length;

  // =========================
  // ASISTENCIA PROMEDIO
  // =========================
  let totalAsistencias = 0;

  let presentes = 0;

  consejeros.forEach((c) => {
    const alternas = c.faltas_alternas || 0;

    const totalConsejero = alternas + 1;

    totalAsistencias += totalConsejero;

    presentes += totalConsejero - alternas;
  });

  const asistenciaPromedio =
    totalAsistencias > 0
      ? `${Math.round((presentes / totalAsistencias) * 100)}%`
      : "0%";

  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Navbar */}
      <NavbarHorizontalAdmin user={user} />

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
              Gestión de Consejeros
            </h1>

            <p
              className="
                text-slate-500
                mt-1
              "
            >
              Administración y seguimiento de consejeros departamentales
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
              Notificar reunión
            </button>

            <button
              onClick={() => navigate("/NuevoConsejero")}
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
              Nuevo consejero
            </button>
          </div>
        </div>

        {/* ALERTA */}
        <div
          className="
            mb-6
            bg-red-50
            border
            border-red-200
            text-red-700
            rounded-2xl
            p-4
            flex
            items-center
            gap-3
          "
        >
          <AlertTriangle size={20} />

          <p
            className="
              text-sm
              font-medium
            "
          >
            Consejeros con múltiples ausencias consecutivas deben ser revisados.
          </p>
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
            titulo="Consejeros activos"
            valor={activos}
            icon={<Users size={24} />}
          />

          <CardResumen
            titulo="Asistencia promedio"
            valor={asistenciaPromedio}
            icon={<UserCheck size={24} />}
          />

          <CardResumen
            titulo="Con licencia"
            valor={conLicencia}
            icon={<AlertTriangle size={24} />}
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
                Consejeros registrados
              </h2>

              <p
                className="
                  text-slate-500
                  text-sm
                  mt-1
                "
              >
                Listado completo de consejeros y estado actual
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
                placeholder="Buscar consejero..."
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
                  <th className="text-left py-4">Consejero</th>

                  <th className="text-left py-4">Claustro</th>

                  <th className="text-left py-4">Tipo</th>

                  <th className="text-left py-4">Faltas</th>

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
                      Cargando consejeros...
                    </td>
                  </tr>
                ) : (
                  <>
                    {consejerosFiltrados.map((consejero) => (
                      <tr
                        key={consejero._id}
                        className="
                            border-b
                            border-slate-100
                            hover:bg-slate-50
                            transition
                          "
                      >
                        {/* Nombre */}
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
                              {(consejero.nombre || "C")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <h3
                                className="
                                    font-semibold
                                    text-slate-800
                                  "
                              >
                                {consejero.nombre} {consejero.apellido}
                              </h3>

                              <div
                                className="
                                    space-y-1
                                    mt-1
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

                                  {consejero.mail || "Sin mail"}
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

                                  {consejero.celular || "Sin celular"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Claustro */}
                        <td
                          className="
                              py-5
                              text-slate-600
                            "
                        >
                          {consejero.claustro || "-"}
                        </td>

                        {/* Tipo */}
                        <td
                          className="
                              py-5
                              text-slate-700
                              font-medium
                            "
                        >
                          {consejero.tipo || "-"}
                        </td>

                        {/* Faltas */}
                        <td
                          className="
                              py-5
                              text-slate-700
                            "
                        >
                          Alternas: {consejero.faltas_alternas}
                          <br />
                          Consecutivas: {consejero.faltas_consecutivas}
                        </td>

                        {/* Estado */}
                        <td className="py-5">
                          <EstadoBadge estado={consejero.estado || "Activo"} />
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
                                navigate(`/EditarConsejero/${consejero._id}`)
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
                              Editar
                            </button>

                            {/* PDF */}
                            <button
                              onClick={() => generarPDF(consejero)}
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
                              onClick={() => eliminarConsejero(consejero._id)}
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

                    {consejerosFiltrados.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="
                            text-center
                            py-10
                            text-slate-500
                          "
                        >
                          No se encontraron consejeros
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

const EstadoBadge = ({ estado }) => {
  const colores = {
    Activo: "bg-green-100 text-green-700",

    Baja: "bg-red-100 text-red-700",

    "Con licencia": "bg-yellow-100 text-yellow-700",
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

export default Consejero;
