import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarHorizontalAdmin from "../components/NavbarHorizontalAdmin";
import {
  CalendarDays,
  Save,
  ArrowLeft,
  ChevronDown,
  X,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

const EditarReunion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dropdownRef = useRef(null);

  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("Ordinaria");
  const [lugar, setLugar] = useState("");
  const [quorumPresente, setQuorumPresente] = useState("");
  const [quorumRequerido, setQuorumRequerido] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaCierre, setHoraCierre] = useState("");
  const [idComision, setIdComision] = useState("");
  const [temas, setTemas] = useState([]);
  const [temasDisponibles, setTemasDisponibles] = useState([]);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const [estado, setEstado] = useState("Abierta");
  const [loading, setLoading] = useState(false);

  const obtenerTemarios = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/temas");
      const temasFiltrados = response.data.filter(
        (tema) => tema.despacho === "Despacho",
      );
      setTemasDisponibles(temasFiltrados);
    } catch (error) {
      console.error("Error obteniendo temarios:", error);
    }
  };

  const obtenerReunion = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/reuniones/${id}`,
      );
      const reunion = response.data;
      setFecha(reunion.fecha || "");
      setTipo(reunion.tipo || "Ordinaria");
      setLugar(reunion.lugar || "");
      setQuorumPresente(reunion.quorumPresente || "");
      setQuorumRequerido(reunion.quorumRequerido || "");
      setHoraInicio(reunion.horaInicio || "");
      setHoraCierre(reunion.horaCierre || "");
      setIdComision(reunion.idComision || "");
      setTemas(Array.isArray(reunion.temas) ? reunion.temas : []);
      setEstado(reunion.estado || "Abierta");
    } catch (error) {
      console.error(error);
      alert("Error al obtener reunión");
    }
  };

  useEffect(() => {
    obtenerTemarios();
    obtenerReunion();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTema = (temaId) => {
    setTemas((prev) =>
      prev.includes(temaId)
        ? prev.filter((t) => t !== temaId)
        : [...prev, temaId],
    );
  };

  const quitarTema = (temaId) => {
    setTemas((prev) => prev.filter((t) => t !== temaId));
  };

  const handleEditarReunion = async () => {
    try {
      setLoading(true);

      // CONSTRUIR PAYLOAD — solo incluir idComision si es válido
      const payload = {
        fecha,
        tipo,
        lugar,
        quorumPresente,
        quorumRequerido,
        horaInicio,
        horaCierre,
        temas,
        estado,
      };

      // SOLO agregar idComision si tiene valor
      if (idComision && idComision.trim() !== "") {
        payload.idComision = idComision;
      }

      await axios.put(`http://127.0.0.1:5000/api/reuniones/${id}`, payload);

      alert("Reunión actualizada correctamente");
      navigate("/Reunion");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error al actualizar reunión");
    } finally {
      setLoading(false);
    }
  };

  const temasSeleccionadosObjetos = temasDisponibles.filter((tema) =>
    temas.includes(tema._id),
  );

  return (
    <div className="min-h-screen bg-[#f0f4f8] pt-16">
      <NavbarHorizontalAdmin user={{ role: "admin" }} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div
          className="rounded-t-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-0 shadow-sm"
          style={{ background: "#1a3a6b" }}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Editar reunión
            </h1>
            <p className="text-blue-200 mt-1 text-sm">
              Modificar información de la reunión
            </p>
          </div>
          <button
            onClick={() => navigate("/Reunion")}
            className="flex items-center gap-2 border border-blue-300 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition text-sm self-start sm:self-auto"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-b-2xl shadow-sm p-6 sm:p-8">
          {/* SECCIÓN: DATOS GENERALES */}
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2">
            Datos generales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {/* FECHA */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Fecha
              </label>
              <div className="relative">
                <CalendarDays
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
              </div>
            </div>

            {/* TIPO */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tipo de reunión
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              >
                <option value="Ordinaria">Ordinaria</option>
                <option value="Extraordinaria">Extraordinaria</option>
              </select>
            </div>

            {/* LUGAR */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Lugar
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                  placeholder="Sala de reuniones..."
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN: QUÓRUM Y HORARIOS */}
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2">
            Quórum y horarios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {/* QUORUM PRESENTE */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quórum presente
              </label>
              <div className="relative">
                <Users
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={quorumPresente}
                  onChange={(e) => setQuorumPresente(e.target.value)}
                  placeholder="Ej: 11"
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
              </div>
            </div>

            {/* QUORUM REQUERIDO */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quórum requerido
              </label>
              <div className="relative">
                <Users
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={quorumRequerido}
                  onChange={(e) => setQuorumRequerido(e.target.value)}
                  placeholder="Ej: 13"
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
              </div>
            </div>

            {/* HORA INICIO */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Hora inicio
              </label>
              <div className="relative">
                <Clock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
              </div>
            </div>

            {/* HORA CIERRE */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Hora cierre
              </label>
              <div className="relative">
                <Clock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="time"
                  value={horaCierre}
                  onChange={(e) => setHoraCierre(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN: TEMAS */}
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2">
            Temas del temario
          </h2>

          <div className="relative mb-2" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownAbierto(!dropdownAbierto)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-left flex items-center justify-between text-sm"
            >
              <span className="text-slate-500">
                {temas.length === 0
                  ? "Seleccionar temas..."
                  : `${temas.length} tema${temas.length > 1 ? "s" : ""} seleccionado${temas.length > 1 ? "s" : ""}`}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${dropdownAbierto ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownAbierto && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-52 overflow-y-auto flex flex-col">
                {temasDisponibles.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-slate-400">
                    No hay temas en despacho
                  </p>
                ) : (
                  temasDisponibles.map((tema) => {
                    const seleccionado = temas.includes(tema._id);
                    return (
                      <label
                        key={tema._id}
                        className={`w-full flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 border-b border-slate-100 ${seleccionado ? "bg-blue-50" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={seleccionado}
                          onChange={() => toggleTema(tema._id)}
                          className="mt-1 w-4 h-4 accent-blue-600 flex-shrink-0"
                        />
                        <span
                          className={`text-sm leading-relaxed break-words flex-1 ${seleccionado ? "text-blue-700 font-medium" : "text-slate-700"}`}
                        >
                          {tema.descripcion}
                        </span>
                      </label>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {temasSeleccionadosObjetos.length > 0 && (
            <div className="mt-4 flex flex-col gap-3 mb-8">
              {temasSeleccionadosObjetos.map((tema) => (
                <div
                  key={tema._id}
                  className="w-full flex items-start justify-between gap-3 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm"
                >
                  <span className="flex-1 break-words leading-relaxed">
                    {tema.descripcion}
                  </span>
                  <button
                    type="button"
                    onClick={() => quitarTema(tema._id)}
                    className="flex-shrink-0 hover:text-red-600 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ESTADO */}
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2 mt-6">
            Estado
          </h2>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 text-sm mb-8"
          >
            <option value="Abierta">Abierta</option>
            <option value="Cerrada">Cerrada</option>
          </select>

          {/* BOTONES */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              onClick={() => navigate("/Reunion")}
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleEditarReunion}
              disabled={loading}
              className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60"
              style={{ background: "#1a3a6b" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#15305a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#1a3a6b")
              }
            >
              <Save size={16} />
              {loading ? "Actualizando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditarReunion;
