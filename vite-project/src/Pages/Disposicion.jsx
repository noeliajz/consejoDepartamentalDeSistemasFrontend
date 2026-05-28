// src/pages/Disposicion.jsx

import React, { useEffect, useState } from "react";
import NavbarLateral from "../Components/NavbarLateral";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Bell,
  FileText,
  CheckCircle,
  Clock,
  Download,
  Trash2,
} from "lucide-react";

const API = "http://localhost:5000/api/disposiciones";

const Disposicion = () => {
  // Simulación usuario admin
  const user = {
    role: "admin",
  };
  const navigate = useNavigate();
  const [disposiciones, setDisposiciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Obtener disposiciones desde Flask + MongoDB
  const obtenerDisposiciones = async () => {
    try {
      const response = await axios.get(API);

      setDisposiciones(response.data);
    } catch (error) {
      console.error("Error al obtener disposiciones:", error);
    }
  };

  useEffect(() => {
    obtenerDisposiciones();
  }, []);
// Eliminar disposición
const eliminarDisposicion = async (id) => {
  const confirmar = window.confirm(
    "¿Desea eliminar esta disposición?"
  );

  if (!confirmar) return;

  try {
    await axios.delete(`${API}/${id}`);

    alert("Disposición eliminada correctamente");

    obtenerDisposiciones();
  } catch (error) {
    console.error(
      "Error al eliminar disposición:",
      error
    );

    alert("Error al eliminar la disposición");
  }
};

// Generar PDF
const generarPDF = (disp) => {
  window.print();
};
  // Filtrar búsqueda
  const disposicionesFiltradas = disposiciones.filter((disp) =>
    `${disp.numero} ${disp.tipo} ${disp.descripcion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  // Contadores
  const totalDisposiciones = disposiciones.length;

  const aprobadas = disposiciones.filter(
    (d) => d.estado === "Aprobada"
  ).length;

  const pendientes = disposiciones.filter(
    (d) => d.estado === "Pendiente"
  ).length;

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

                      <button
            onClick={() => navigate("/NuevaDisposicion")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-md transition"
          >
            <Plus size={18} />
            Nueva disposición
          </button>
                    </div>
                  </div>

        {/* Cards resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CardResumen
            titulo="Total Disposiciones"
            valor={totalDisposiciones}
            icon={<FileText size={24} />}
          />

          <CardResumen
            titulo="Aprobadas"
            valor={aprobadas}
            icon={<CheckCircle size={24} />}
          />

          <CardResumen
            titulo="Pendientes"
            valor={pendientes}
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
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="text-left py-4">Nº disposición</th>

                  <th className="text-left py-4">Tipo</th>

                  <th className="text-left py-4">Descripción</th>

                  <th className="text-left py-4">Fecha</th>

                  <th className="text-left py-4">Estado</th>

                  <th className="text-left py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {disposicionesFiltradas.map((disp) => (
                  <tr
                    key={disp._id}
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
  <div
    className="
      flex
      items-center
      gap-3
      flex-wrap
    "
  >
    <button
      onClick={() =>
        navigate(`/EditarDisposicion/${disp._id}`)
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

    <button
      onClick={() => generarPDF(disp)}
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

    <button
      onClick={() =>
        eliminarDisposicion(disp._id)
      }
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

                {disposicionesFiltradas.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-slate-500"
                    >
                      No se encontraron disposiciones
                    </td>
                  </tr>
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-slate-500 text-sm">{titulo}</p>

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
    Aprobada: "bg-green-100 text-green-700",

    Pendiente: "bg-yellow-100 text-yellow-700",

    "En revisión": "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colores[estado] || "bg-slate-100 text-slate-700"
      }`}
    >
      {estado}
    </span>
  );
};

export default Disposicion;