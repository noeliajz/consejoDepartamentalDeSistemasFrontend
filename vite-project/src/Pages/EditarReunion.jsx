// src/pages/EditarReunion.jsx

import React, { useEffect, useState, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import NavbarHorizontalAdmin from "../components/NavbarHorizontalAdmin";

import { CalendarDays, Save, ArrowLeft, ChevronDown, X } from "lucide-react";

const EditarReunion = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const dropdownRef = useRef(null);

  // STATES
  const [fecha, setFecha] = useState("");

  const [tipo, setTipo] = useState("Ordinaria");

  const [quorum, setQuorum] = useState("");

  // IDS TEMAS
  const [temas, setTemas] = useState([]);

  // TEMAS DISPONIBLES
  const [temasDisponibles, setTemasDisponibles] = useState([]);

  // DROPDOWN
  const [dropdownAbierto, setDropdownAbierto] = useState(false);

  const [estado, setEstado] = useState("Abierta");

  const [loading, setLoading] = useState(false);

  // OBTENER TEMARIOS
  const obtenerTemarios = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/temas");

      // SOLO TEMAS EN DESPACHO
      const temasFiltrados = response.data.filter(
        (tema) => tema.despacho === "Despacho",
      );

      setTemasDisponibles(temasFiltrados);
    } catch (error) {
      console.error("Error obteniendo temarios:", error);
    }
  };

  // OBTENER REUNION
  const obtenerReunion = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/reuniones/${id}`,
      );

      const reunion = response.data;

      setFecha(reunion.fecha || "");

      setTipo(reunion.tipo || "Ordinaria");

      setQuorum(reunion.quorum || "");

      setTemas(reunion.temas || []);

      setEstado(reunion.estado || "Abierta");
    } catch (error) {
      console.error(error);

      alert("Error al obtener reunión");
    }
  };

  // CARGAR
  useEffect(() => {
    obtenerTemarios();

    obtenerReunion();
  }, []);

  // CERRAR DROPDOWN
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownAbierto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // TOGGLE TEMA
  const toggleTema = (temaId) => {
    const yaSeleccionado = temas.includes(temaId);

    if (yaSeleccionado) {
      setTemas(temas.filter((id) => id !== temaId));
    } else {
      setTemas([...temas, temaId]);
    }
  };

  // QUITAR TEMA
  const quitarTema = (temaId) => {
    setTemas(temas.filter((id) => id !== temaId));
  };

  // ACTUALIZAR
  const handleEditarReunion = async () => {
    try {
      setLoading(true);

      await axios.put(`http://127.0.0.1:5000/api/reuniones/${id}`, {
        fecha,
        tipo,
        quorum,
        temas,
        estado,
      });

      alert("Reunión actualizada correctamente");

      navigate("/Reunion");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.error || "Error al actualizar reunión");
    } finally {
      setLoading(false);
    }
  };

  // TEMAS SELECCIONADOS
  const temasSeleccionadosObjetos = temasDisponibles.filter((tema) =>
    temas.includes(tema._id),
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <NavbarHorizontalAdmin user={{ role: "admin" }} />

      {/* MAIN */}
      <main className="ml-64 p-8">
        {/* HEADER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Editar reunión
            </h1>

            <p className="text-slate-500 mt-1">
              Modificar información de la reunión
            </p>
          </div>

          <button
            onClick={() => navigate("/Reunion")}
            className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FECHA */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Fecha
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="
                    w-full
                    border
                    border-slate-300
                    rounded-xl
                    pl-11
                    pr-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-200
                  "
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
                className="
                  w-full
                  border
                  border-slate-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-200
                "
              >
                <option value="Ordinaria">Ordinaria</option>

                <option value="Extraordinaria">Extraordinaria</option>
              </select>
            </div>

            {/* QUORUM */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quórum
              </label>

              <input
                type="text"
                value={quorum}
                onChange={(e) => setQuorum(e.target.value)}
                placeholder="11/13"
                className="
                  w-full
                  border
                  border-slate-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-200
                "
              />
            </div>
          </div>

          {/* TEMAS */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Temas del temario provisorio
            </label>

            <div className="relative" ref={dropdownRef}>
              {/* BOTON */}
              <button
                type="button"
                onClick={() => setDropdownAbierto(!dropdownAbierto)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  bg-white
                  text-left
                  flex
                  items-center
                  justify-between
                "
              >
                <span className="text-slate-500">Seleccionar temas...</span>

                <ChevronDown
                  size={18}
                  className={`
                    transition-transform
                    ${dropdownAbierto ? "rotate-180" : ""}
                  `}
                />
              </button>

              {/* LISTA */}
              {dropdownAbierto && (
                <div
                  className="
                  absolute
                  z-10
                  mt-1
                  w-full
                  bg-white
                  border
                  border-slate-200
                  rounded-xl
                  shadow-lg
                  max-h-52
                  overflow-y-auto
                  flex
                  flex-col
                "
                >
                  {temasDisponibles.length === 0 ? (
                    <p
                      className="
                      px-4
                      py-3
                      text-sm
                      text-slate-400
                    "
                    >
                      No hay temas en despacho
                    </p>
                  ) : (
                    temasDisponibles.map((tema) => {
                      const seleccionado = temas.includes(tema._id);

                      return (
                        <label
                          key={tema._id}
                          className={`
                              w-full
                              flex
                              items-start
                              gap-3
                              px-4
                              py-3
                              cursor-pointer
                              hover:bg-slate-50
                              border-b
                              border-slate-100
                              ${seleccionado ? "bg-blue-50" : ""}
                            `}
                        >
                          <input
                            type="checkbox"
                            checked={seleccionado}
                            onChange={() => toggleTema(tema._id)}
                            className="
                                mt-1
                                w-4
                                h-4
                                accent-blue-600
                                flex-shrink-0
                              "
                          />

                          <span
                            className={`
                              text-sm
                              leading-relaxed
                              break-words
                              flex-1
                              ${
                                seleccionado
                                  ? "text-blue-700 font-medium"
                                  : "text-slate-700"
                              }
                            `}
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

            {/* TEMAS SELECCIONADOS */}
            {temasSeleccionadosObjetos.length > 0 && (
              <div className="mt-4">
                <p
                  className="
                  text-sm
                  font-semibold
                  text-slate-700
                  mb-2
                "
                >
                  Temas seleccionados:
                </p>

                <div
                  className="
                  flex
                  flex-col
                  gap-3
                  w-full
                "
                >
                  {temasSeleccionadosObjetos.map((tema) => (
                    <div
                      key={tema._id}
                      className="
                          w-full
                          flex
                          items-start
                          justify-between
                          gap-3
                          bg-blue-50
                          border
                          border-blue-200
                          text-blue-700
                          px-4
                          py-3
                          rounded-xl
                          text-sm
                        "
                    >
                      <span
                        className="
                          flex-1
                          break-words
                          leading-relaxed
                        "
                      >
                        {tema.descripcion}
                      </span>

                      <button
                        type="button"
                        onClick={() => quitarTema(tema._id)}
                        className="
                            flex-shrink-0
                            hover:text-red-600
                            transition
                          "
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ESTADO */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Estado
            </label>

            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-200
              "
            >
              <option value="Abierta">Abierta</option>

              <option value="Cerrada">Cerrada</option>
            </select>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={() => navigate("/Reunion")}
              className="
                px-5
                py-3
                rounded-xl
                border
                border-slate-300
                hover:bg-slate-100
                transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleEditarReunion}
              disabled={loading}
              className="
                flex
                items-center
                gap-2
                bg-blue-700
                hover:bg-blue-800
                transition
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              <Save size={18} />

              {loading ? "Actualizando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditarReunion;
