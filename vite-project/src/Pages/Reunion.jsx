import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarHorizontalAdmin from "../components/NavbarHorizontalAdmin";
import { Bell, Plus, CalendarDays, Users, FileText } from "lucide-react";

const Reunion = () => {
  const navigate = useNavigate();
  const [reuniones, setReuniones] = useState([]);

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

  const totalReuniones = reuniones.length;
  const reunionesOrdinarias = reuniones.filter(
    (r) => r.tipo === "Ordinaria",
  ).length;
  const reunionesExtraordinarias = reuniones.filter(
    (r) => r.tipo === "Extraordinaria",
  ).length;

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-5 border-b border-slate-200 gap-3">
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

          {/* SCROLL HORIZONTAL */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* ENCABEZADOS */}
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_220px] gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <div>Fecha</div>
                <div>Tipo</div>
                <div>Quórum</div>
                <div>Temas</div>
                <div>Estado</div>
                <div className="text-center">Acciones</div>
              </div>

              {/* FILAS */}
              {reuniones.map((reunion) => (
                <div
                  key={reunion._id}
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_220px] gap-4 px-6 py-4 items-center border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <div className="text-slate-600 text-sm">
                    {new Date(reunion.fecha).toLocaleDateString("es-AR")}
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTipoColor(reunion.tipo)}`}
                    >
                      {reunion.tipo}
                    </span>
                  </div>

                  <div className="text-slate-700 text-sm font-medium">
                    {reunion.quorum}
                  </div>

                  <div className="text-slate-700 text-sm truncate">
                    {reunion.temas}
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(reunion.estado)}`}
                    >
                      {reunion.estado}
                    </span>
                  </div>

                  {/* ACCIONES */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => navigate(`/reunion/${reunion._id}`)}
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
              {reuniones.length === 0 && (
                <div className="p-10 text-center text-slate-500 text-sm">
                  No hay reuniones registradas
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
