// src/pages/Reunion.jsx

import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import NavbarLateral from "../components/NavbarLateral";

import {
  Bell,
  Plus,
  CalendarDays,
  Users,
  FileText,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const Reunion = () => {

  const navigate = useNavigate();

  // REUNIONES
  const [reuniones, setReuniones] = useState([]);

  // OBTENER REUNIONES
  const obtenerReuniones = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/reuniones"
      );

      setReuniones(response.data);

    } catch (error) {

      console.error(error);

      alert("Error al obtener reuniones");
    }
  };

  // ELIMINAR
  const eliminarReunion = async (id) => {

    try {

      const confirmar = window.confirm(
        "¿Deseas eliminar esta reunión?"
      );

      if (!confirmar) return;

      await axios.delete(
        `http://127.0.0.1:5000/api/reuniones/${id}`
      );

      alert("Reunión eliminada");

      obtenerReuniones();

    } catch (error) {

      console.error(error);

      alert("Error al eliminar reunión");
    }
  };

  // CARGAR
  useEffect(() => {
    obtenerReuniones();
  }, []);

  // COLORES TIPO
  const getTipoColor = (tipo) => {

    switch (tipo) {

      case "Extraordinaria":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  // COLORES ESTADO
  const getEstadoColor = (estado) => {

    switch (estado) {

      case "Cerrada":
        return "bg-green-100 text-green-700";

      case "Abierta":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // STATS
  const totalReuniones = reuniones.length;

  const reunionesOrdinarias =
    reuniones.filter(
      (r) => r.tipo === "Ordinaria"
    ).length;

  const reunionesExtraordinarias =
    reuniones.filter(
      (r) => r.tipo === "Extraordinaria"
    ).length;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <NavbarLateral user={{ role: "admin" }} />

      {/* MAIN */}
      <main className="ml-64 p-8">

        {/* HEADER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Reuniones
            </h1>

            <p className="text-slate-500 mt-1">
              Gestión de reuniones del consejo directivo
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            {/* NOTIFICAR */}
            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition">

              <Bell size={18} />

              Notificar reunión
            </button>

            {/* NUEVA */}
            <button
              onClick={() =>
                navigate("/NuevaReunion")
              }
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
            >

              <Plus size={18} />

              Nueva reunión
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          {/* TOTAL */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Total realizadas
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {totalReuniones}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Registradas en el sistema
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">

                <CalendarDays size={24} />
              </div>
            </div>
          </div>

          {/* ORDINARIAS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Ordinarias
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {reunionesOrdinarias}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Reuniones ordinarias
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">

                <Users size={24} />
              </div>
            </div>
          </div>

          {/* EXTRAORDINARIAS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Extraordinarias
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {reunionesExtraordinarias}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Este año
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">

                <FileText size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* HEADER TABLA */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

            <div>

              <h2 className="text-xl font-semibold text-slate-800">
                Historial de reuniones
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Reuniones registradas del consejo
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/NuevaReunion")
              }
              className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
            >

              <Plus size={16} />

              Nueva
            </button>
          </div>

          {/* ENCABEZADOS */}
          <div className="grid grid-cols-10 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase tracking-wide">

            <div className="col-span-2">
              Fecha
            </div>

            <div className="col-span-2">
              Tipo
            </div>

            <div className="col-span-2">
              Quórum
            </div>

            <div className="col-span-2">
              Temas
            </div>

            <div className="col-span-1">
              Estado
            </div>

            <div className="col-span-1 text-center">
              Acciones
            </div>
          </div>

          {/* FILAS */}
          {reuniones.map((reunion) => (

            <div
              key={reunion._id}
              className="grid grid-cols-10 gap-4 px-6 py-5 items-center border-b border-slate-100 hover:bg-slate-50 transition"
            >

              {/* FECHA */}
              <div className="col-span-2 text-slate-600">
                {new Date(reunion.fecha).toLocaleDateString("es-AR")}
              </div>

              {/* TIPO */}
              <div className="col-span-2">

                <span className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  ${getTipoColor(reunion.tipo)}
                `}>
                  {reunion.tipo}
                </span>
              </div>

              {/* QUORUM */}
              <div className="col-span-2 text-slate-700 font-medium">
                {reunion.quorum}
              </div>

              {/* TEMAS */}
              <div className="col-span-2 text-slate-700">
                {reunion.temas}
              </div>

              {/* ESTADO */}
              <div className="col-span-1">

                <span className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  ${getEstadoColor(reunion.estado)}
                `}>
                  {reunion.estado}
                </span>
              </div>

              {/* ACCIONES */}
              <div className="col-span-1 flex items-center justify-center gap-2">

                <button
                  onClick={() =>
                    navigate(`/reunion/${reunion._id}`)
                  }
                  className="p-2 rounded-lg hover:bg-blue-100 text-blue-700 transition"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() =>
                    navigate(`/EditarReunion/${reunion._id}`)
                  }
                  className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-700 transition"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() =>
                    eliminarReunion(reunion._id)
                  }
                  className="p-2 rounded-lg hover:bg-red-100 text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))}

          {/* VACIO */}
          {reuniones.length === 0 && (

            <div className="p-10 text-center text-slate-500">

              No hay reuniones registradas
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Reunion;