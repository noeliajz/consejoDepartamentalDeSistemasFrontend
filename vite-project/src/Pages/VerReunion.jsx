import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarHorizontalAdmin from "../components/NavbarHorizontalAdmin";
import {
  ArrowLeft,
  CalendarDays,
  Users,
  FileText,
  Tag,
  ClipboardList,
} from "lucide-react";

const VerReunion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reunion, setReunion] = useState(null);
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerReunion = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/reuniones/${id}`,
      );
      setReunion(response.data);

      const temasData = response.data.temas;

      // CASO 1: temas es un string de texto directo
      if (typeof temasData === "string" && temasData.trim() !== "") {
        setTemas([{ _id: "texto", descripcion: temasData }]);
        return;
      }

      // CASO 2: temas es un array de IDs
      if (Array.isArray(temasData) && temasData.length > 0) {
        const responseTemas = await axios.get(
          "http://127.0.0.1:5000/api/temas",
        );
        const todosLosTemas = responseTemas.data;

        const temasFiltrados = todosLosTemas.filter((tema) =>
          temasData.map((t) => String(t)).includes(String(tema._id)),
        );

        setTemas(temasFiltrados);
        return;
      }

      setTemas([]);
    } catch (error) {
      console.error(error);
      alert("Error al obtener la reunión");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerReunion();
  }, []);

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Extraordinaria":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Cerrada":
        return "bg-green-100 text-green-700 border-green-200";
      case "Abierta":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] pt-16">
        <NavbarHorizontalAdmin user={{ role: "admin" }} />
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500 text-sm">Cargando reunión...</p>
        </div>
      </div>
    );
  }

  if (!reunion) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] pt-16">
        <NavbarHorizontalAdmin user={{ role: "admin" }} />
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500 text-sm">No se encontró la reunión.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] pt-16">
      <NavbarHorizontalAdmin user={{ role: "admin" }} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Detalle de reunión
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Información completa de la reunión
            </p>
          </div>
          <button
            onClick={() => navigate("/Reunion")}
            className="flex items-center gap-2 border border-slate-300 bg-white px-4 py-2 rounded-xl hover:bg-slate-100 transition text-sm font-medium self-start sm:self-auto"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </div>

        {/* CARD PRINCIPAL */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-5">
          {/* BANDA SUPERIOR */}
          <div className="h-2 w-full" style={{ background: "#1a3a6b" }} />

          <div className="p-6 sm:p-8">
            {/* BADGES */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTipoColor(reunion.tipo)}`}
              >
                {reunion.tipo}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoColor(reunion.estado)}`}
              >
                {reunion.estado}
              </span>
            </div>

            {/* GRID DE DATOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* FECHA */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                    Fecha
                  </p>
                  <p className="text-slate-800 font-semibold mt-0.5 text-sm sm:text-base">
                    {new Date(reunion.fecha).toLocaleDateString("es-AR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* TIPO */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                    Tipo
                  </p>
                  <p className="text-slate-800 font-semibold mt-0.5 text-sm sm:text-base">
                    {reunion.tipo}
                  </p>
                </div>
              </div>

              {/* QUORUM */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                    Quórum
                  </p>
                  <p className="text-slate-800 font-semibold mt-0.5 text-sm sm:text-base">
                    {reunion.quorum || "—"}
                  </p>
                </div>
              </div>

              {/* ESTADO */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                  <Tag size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                    Estado
                  </p>
                  <p className="text-slate-800 font-semibold mt-0.5 text-sm sm:text-base">
                    {reunion.estado || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TEMAS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "#e8edf5", color: "#1a3a6b" }}
            >
              <ClipboardList size={16} />
            </div>
            <h2 className="text-base font-bold text-slate-800">
              Temas del temario
            </h2>
          </div>

          {temas.length === 0 ? (
            <p className="text-slate-400 text-sm">
              No hay temas asignados a esta reunión.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {temas.map((tema, index) => (
                <div
                  key={tema._id || tema || index}
                  className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                >
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                    style={{ background: "#1a3a6b" }}
                  >
                    {index + 1}
                  </span>
                  <p className="text-slate-700 text-sm leading-relaxed break-words flex-1">
                    {typeof tema === "object" ? tema.descripcion : tema}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTONES FOOTER */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={() => navigate("/Reunion")}
            className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 transition text-sm font-medium"
          >
            Volver al listado
          </button>
          <button
            onClick={() => navigate(`/EditarReunion/${id}`)}
            className="px-5 py-3 rounded-xl text-white transition text-sm font-semibold"
            style={{ background: "#1a3a6b" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#15305a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1a3a6b")}
          >
            Editar reunión
          </button>
        </div>
      </main>
    </div>
  );
};

export default VerReunion;
