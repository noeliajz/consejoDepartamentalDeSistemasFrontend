import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarHorizontalAdmin from "../components/NavbarHorizontalAdmin";
import {
  Bell,
  Plus,
  CalendarDays,
  Users,
  FileText,
  ChevronDown,
} from "lucide-react";

const Reunion = () => {
  const navigate = useNavigate();
  const [reuniones, setReuniones] = useState([]);
  const [busquedaFecha, setBusquedaFecha] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  const obtenerReuniones = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/reuniones");
      setReuniones(response.data);
    } catch (error) {
      console.error(error);
      alert("Error al obtener reuniones");
    }
  };

  const eliminarReunion = async (id) => {
    try {
      const confirmar = window.confirm("¿Deseas eliminar esta reunión?");
      if (!confirmar) return;
      await axios.delete(`http://127.0.0.1:5000/api/reuniones/${id}`);
      alert("Reunión eliminada");
      obtenerReuniones();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar reunión");
    }
  };

  useEffect(() => {
    obtenerReuniones();
  }, []);

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Extraordinaria":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

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

  // FORMATEAR FECHA SIN DESFASE DE ZONA HORARIA
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "—";
    const [anio, mes, dia] = fechaStr.split("-");
    return `${dia}/${mes}/${anio}`;
  };

  const totalReuniones = reuniones.length;
  const reunionesOrdinarias = reuniones.filter(
    (r) => r.tipo === "Ordinaria",
  ).length;
  const reunionesExtraordinarias = reuniones.filter(
    (r) => r.tipo === "Extraordinaria",
  ).length;

  // FILTROS
  const reunionesFiltradas = reuniones.filter((reunion) => {
    const coincideFecha = !busquedaFecha || reunion.fecha === busquedaFecha;
    const coincideTipo = filtroTipo === "Todos" || reunion.tipo === filtroTipo;
    return coincideFecha && coincideTipo;
  });

  const GRID =
    "grid-cols-[140px_140px_110px_110px_110px_110px_180px_300px_120px_240px]";

  return (
    <div className="min-h-screen bg-[#f0f4f8] pt-16">
      <NavbarHorizontalAdmin user={{ role: "admin" }} />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Reuniones
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Gestión de reuniones del consejo directivo
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/Notificacion")}
              className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition text-sm"
            >
              <Bell size={16} />
              Notificar reunión
            </button>
            <button
              onClick={() => navigate("/NuevaReunion")}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-xl transition text-sm font-medium"
              style={{ background: "#1a3a6b" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#15305a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#1a3a6b")
              }
            >
              <Plus size={16} />
              Nueva reunión
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total realizadas</p>
                <h2 className="text-3xl font-bold text-slate-800 mt-1">
                  {totalReuniones}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Registradas en el sistema
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <CalendarDays size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Ordinarias</p>
                <h2 className="text-3xl font-bold text-slate-800 mt-1">
                  {reunionesOrdinarias}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Reuniones ordinarias
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                <Users size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Extraordinarias</p>
                <h2 className="text-3xl font-bold text-slate-800 mt-1">
                  {reunionesExtraordinarias}
                </h2>
                <p className="text-xs text-slate-400 mt-1">Este año</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shrink-0">
                <FileText size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* HEADER TABLA */}
          <div className="flex flex-col gap-4 px-5 py-5 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Historial de reuniones
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Reuniones registradas del consejo
                </p>
              </div>
              <button
                onClick={() => navigate("/NuevaReunion")}
                className="flex items-center gap-2 text-white px-4 py-2 rounded-xl transition text-sm font-medium self-start sm:self-auto"
                style={{ background: "#1a3a6b" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#15305a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#1a3a6b")
                }
              >
                <Plus size={15} />
                Nueva
              </button>
            </div>

            {/* FILTROS */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* BUSCAR POR FECHA */}
              <div className="relative flex-1">
                <CalendarDays
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="date"
                  value={busquedaFecha}
                  onChange={(e) => setBusquedaFecha(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-slate-50"
                />
              </div>

              {/* FILTRAR POR TIPO */}
              <div className="relative sm:w-52">
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-slate-50 appearance-none"
                >
                  <option value="Todos">Todos los tipos</option>
                  <option value="Ordinaria">Ordinaria</option>
                  <option value="Extraordinaria">Extraordinaria</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>

              {/* LIMPIAR */}
              {(busquedaFecha || filtroTipo !== "Todos") && (
                <button
                  onClick={() => {
                    setBusquedaFecha("");
                    setFiltroTipo("Todos");
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 hover:bg-slate-100 transition whitespace-nowrap"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* SCROLL HORIZONTAL */}
          <div className="overflow-x-auto">
            <div className="min-w-[1750px]">
              {/* ENCABEZADOS */}
              <div
                className={`grid ${GRID} gap-3 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide`}
              >
                <div>Fecha</div>
                <div>Tipo</div>
                <div>Hora inicio</div>
                <div>Hora cierre</div>
                <div>Q. Presente</div>
                <div>Q. Requerido</div>
                <div>Lugar</div>
                <div>Temas</div>
                <div>Estado</div>
                <div className="text-center">Acciones</div>
              </div>

              {/* FILAS */}
              {reunionesFiltradas.map((reunion) => (
                <div
                  key={reunion._id}
                  className={`grid ${GRID} gap-3 px-6 py-4 items-center border-b border-slate-100 hover:bg-slate-50 transition`}
                >
                  {/* FECHA — sin desfase de zona horaria */}
                  <div className="text-slate-600 text-sm whitespace-nowrap">
                    {formatearFecha(reunion.fecha)}
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getTipoColor(reunion.tipo)}`}
                    >
                      {reunion.tipo}
                    </span>
                  </div>

                  <div className="text-slate-600 text-sm">
                    {reunion.horaInicio || "—"}
                  </div>

                  <div className="text-slate-600 text-sm">
                    {reunion.horaCierre || "—"}
                  </div>

                  <div className="text-slate-700 text-sm font-medium">
                    {reunion.quorumPresente || "—"}
                  </div>

                  <div className="text-slate-700 text-sm font-medium">
                    {reunion.quorumRequerido || "—"}
                  </div>

                  <div className="text-slate-700 text-sm truncate">
                    {reunion.lugar || "—"}
                  </div>

                  <div className="text-slate-700 text-sm max-w-[300px] overflow-hidden">
                    {Array.isArray(reunion.temasDetalle) &&
                    reunion.temasDetalle.length > 0 ? (
                      reunion.temasDetalle.map((tema, i) => (
                        <span
                          key={tema._id || i}
                          className="block truncate"
                          title={tema.descripcion}
                        >
                          {tema.descripcion}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 italic">Sin temas</span>
                    )}
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getEstadoColor(reunion.estado)}`}
                    >
                      {reunion.estado || "—"}
                    </span>
                  </div>

                  {/* ACCIONES */}
                  <div className="flex items-center justify-start gap-2 flex-wrap">
                    <button
                      onClick={() => navigate(`/VerReunion/${reunion._id}`)}
                      className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 whitespace-nowrap"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => navigate(`/EditarReunion/${reunion._id}`)}
                      className="rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs font-semibold text-yellow-700 hover:bg-yellow-100 whitespace-nowrap"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarReunion(reunion._id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 whitespace-nowrap"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}

              {/* VACÍO */}
              {reunionesFiltradas.length === 0 && (
                <div className="p-10 text-center text-slate-500 text-sm">
                  {reuniones.length === 0
                    ? "No hay reuniones registradas"
                    : "No se encontraron reuniones con esos filtros"}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reunion;
