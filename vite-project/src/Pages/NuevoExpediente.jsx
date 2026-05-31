import React, { useState } from "react";
import axios from "axios";

import NavbarHorizontalAdmin from "../components/NavbarHorizontalAdmin";

import "../index.css";

const NuevoExpediente = () => {
  // USUARIO LOGUEADO
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // STATES
  const [numero, setNumero] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");

  const [categoria, setCategoria] = useState("");
  const [tipoTramite, setTipoTramite] = useState("");

  const [solicitante, setSolicitante] = useState("");
  const [dniLegajo, setDniLegajo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [comision, setComision] = useState("");

  // NUEVO ESTADO
  const [estado, setEstado] = useState("Despacho");

  const [loading, setLoading] = useState(false);

  const categorias = ["Docentes", "Alumnos", "Otros"];

  const tiposTramite = [
    "Seleccionar...",
    "Aprobación de plan",
    "Designación",
    "Solicitud de beca",
    "Otros",
  ];

  // CREAR EXPEDIENTE
  const handleCrearExpediente = async () => {
    // VALIDACIONES
    if (!numero.trim()) {
      alert("Debe ingresar el número de expediente");
      return;
    }

    if (!fechaCreacion) {
      alert("Debe ingresar la fecha de creación");
      return;
    }

    if (!fechaIngreso) {
      alert("Debe ingresar la fecha de ingreso");
      return;
    }

    if (!categoria) {
      alert("Debe seleccionar una categoría");
      return;
    }

    if (!tipoTramite || tipoTramite === "Seleccionar...") {
      alert("Debe seleccionar un tipo de trámite");
      return;
    }

    if (!solicitante.trim()) {
      alert("Debe ingresar el solicitante");
      return;
    }

    if (!descripcion.trim()) {
      alert("Debe ingresar una descripción");
      return;
    }
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:5000/api/expedientes",
        {
          numero,

          fecha_creacion: fechaCreacion,
          fecha_ingreso: fechaIngreso,

          categoria,
          tipo_tramite: tipoTramite,

          solicitante,
          dni_legajo: dniLegajo,

          descripcion,

          comision,

          cargado_por: usuario?.nombre,

          estado,

          usuario_id: usuario?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      alert("Expediente creado correctamente");

      // LIMPIAR FORM
      setNumero("");
      setFechaCreacion("");
      setFechaIngreso("");

      setCategoria("");
      setTipoTramite("");

      setSolicitante("");
      setDniLegajo("");

      setDescripcion("");

      setComision("");

      setEstado("Despacho");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.error || "Error al crear expediente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* SIDEBAR */}
      <NavbarHorizontalAdmin user={{ role: "admin" }} />

      {/* CONTENIDO */}
      <main className="pt-20 pb-8 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="bg-[#1a3a6b] rounded-t-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Nuevo expediente
              </h1>

              <p className="text-blue-100 mt-2 text-sm sm:text-base">
                Consejo Directivo - UTN Facultad Regional
              </p>
            </div>
          </div>

          {/* FORM */}
          <div
            className="bg-white
              rounded-b-2xl
              p-4
              sm:p-6
              lg:p-8
              shadow-xl"
          >
            {/* IDENTIFICACIÓN */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3">
                IDENTIFICACIÓN DEL EXPEDIENTE
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* NUMERO */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    N° de expediente *
                  </label>

                  <input
                    required
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder="EXP-2026-001"
                    className="
                      w-full
                      bg-white
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                    "
                  />
                </div>

                {/* FECHA CREACION */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Fecha de creación *
                  </label>

                  <input
                    required
                    type="date"
                    value={fechaCreacion}
                    onChange={(e) => setFechaCreacion(e.target.value)}
                    className="
                      w-full
                      bg-white
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                    "
                  />
                </div>

                {/* FECHA INGRESO */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Fecha de ingreso *
                  </label>

                  <input
                    required
                    type="date"
                    value={fechaIngreso}
                    onChange={(e) => setFechaIngreso(e.target.value)}
                    className="
                      w-full
                      bg-white
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                    "
                  />
                </div>
              </div>
            </div>

            {/* DESCRIPCION */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3">
                DESCRIPCIÓN DEL TRÁMITE
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CATEGORIA */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Categoría *
                  </label>

                  <select
                    required
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="
                      w-full
                      bg-white
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                    "
                  >
                    <option value="">Seleccionar...</option>

                    {categorias.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TIPO */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Tipo de trámite *
                  </label>

                  <select
                    required
                    value={tipoTramite}
                    onChange={(e) => setTipoTramite(e.target.value)}
                    className="
                      w-full
                      bg-white
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                    "
                  >
                    {tiposTramite.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* INFORMACION */}
            <div className="mt-10">
              <div
                className="bg-[#f8fafc]
                  rounded-2xl
                  border
                  border-slate-200
                  p-4
                  sm:p-6
                  lg:p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SOLICITANTE */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Solicitante *
                    </label>

                    <input
                      required
                      type="text"
                      value={solicitante}
                      onChange={(e) => setSolicitante(e.target.value)}
                      className="
                        w-full
                        bg-white
                        border
                        border-slate-300
                        rounded-xl
                        px-4
                        py-3
                      "
                    />
                  </div>

                  {/* DNI */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      DNI / Legajo
                    </label>

                    <input
                      required
                      type="text"
                      value={dniLegajo}
                      onChange={(e) => setDniLegajo(e.target.value)}
                      className="
                        w-full
                        bg-white
                        border
                        border-slate-300
                        rounded-xl
                        px-4
                        py-3
                      "
                    />
                  </div>
                </div>

                {/* DESCRIPCION */}
                <div className="mt-6">
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Descripción *
                  </label>

                  <textarea
                    rows="5"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="
                      w-full
                      bg-white
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                    "
                  />
                </div>

                {/* COMISION */}
                <div className="mt-6">
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Comisión asignada
                  </label>

                  <select
                    required
                    value={comision}
                    onChange={(e) => setComision(e.target.value)}
                    className="
                      w-full
                      bg-white
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                    "
                  >
                    <option value="">Sin asignar</option>

                    <option value="Enseñanza">Enseñanza</option>

                    <option value="Interpretación y Fundamento">
                      Interpretación y Fundamento
                    </option>
                  </select>
                </div>

                {/* ESTADO */}
                <div className="mt-6">
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Estado del expediente
                  </label>

                  <select
                    required
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="
                      w-full
                      bg-white
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                    "
                  >
                    <option value="Despacho">Despacho</option>

                    <option value="Ingresado">Ingresado</option>

                    <option value="Comisión">Comisión</option>
                  </select>
                </div>

                {/* BOTON */}
                <div className="flex justify-center sm:justify-end mt-10">
                  <button
                    onClick={handleCrearExpediente}
                    disabled={loading}
                    className="
                        w-full
                        sm:w-auto
                        px-8
                        py-3
                        rounded-xl
                        bg-[#1a3a6b]
                        hover:bg-[#153057]
                        transition-all
                        duration-200
                        font-semibold
                        text-white
                        shadow-md
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                  >
                    {loading ? "Guardando..." : "Guardar expediente"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NuevoExpediente;
