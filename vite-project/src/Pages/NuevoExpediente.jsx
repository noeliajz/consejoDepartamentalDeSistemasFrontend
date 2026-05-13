import React, { useState } from "react";

import NavbarLateral from "../components/NavbarLateral";

import "../index.css";

const NuevoExpediente = () => {
  const [categoria, setCategoria] = useState("");
  const [tipoTramite, setTipoTramite] = useState("Seleccionar...");

  const categorias = ["Docentes", "Alumnos", "Otros"];

  const tiposTramite = [
    "Seleccionar...",
    "Aprobación de plan",
    "Designación",
    "Solicitud de beca",
    "Otros",
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* SIDEBAR */}
      <NavbarLateral user={{ role: "admin" }} />

      {/* CONTENIDO */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-t-2xl p-6 flex items-center justify-between shadow-lg">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Nuevo expediente
              </h1>

              <p className="text-blue-100 mt-1">
                Consejo Directivo - UTN Facultad Regional
              </p>
            </div>

            <div className="bg-white/20 text-white px-5 py-2 rounded-full font-semibold">
              EXP-2025-048
            </div>
          </div>

          {/* STEPS */}
          <div className="bg-white px-8 py-6 border-b border-slate-200 flex items-center justify-between shadow-sm">
            {/* STEP 1 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                1
              </div>

              <span className="text-blue-600 font-semibold">
                Datos generales
              </span>
            </div>

            <div className="flex-1 h-[1px] bg-slate-300 mx-4"></div>

            {/* STEP 2 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center text-slate-500">
                2
              </div>

              <span className="text-slate-500">
                Trazabilidad
              </span>
            </div>

            <div className="flex-1 h-[1px] bg-slate-300 mx-4"></div>

            {/* STEP 3 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center text-slate-500">
                3
              </div>

              <span className="text-slate-500">
                Archivo y Drive
              </span>
            </div>

            <div className="flex-1 h-[1px] bg-slate-300 mx-4"></div>

            {/* STEP 4 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center text-slate-500">
                4
              </div>

              <span className="text-slate-500">
                Confirmación
              </span>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-b-2xl p-8 shadow-xl">
            {/* IDENTIFICACIÓN */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3">
                IDENTIFICACIÓN DEL EXPEDIENTE
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* EXPEDIENTE */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    N° de expediente *
                  </label>

                  <input
                    type="text"
                    value="EXP-2025-048"
                    disabled
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none"
                  />

                  <p className="text-xs text-slate-500 mt-2">
                    Generado automáticamente
                  </p>
                </div>

                {/* FECHA CREACIÓN */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Fecha de creación *
                  </label>

                  <input
                    type="date"
                    defaultValue="2026-05-12"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* FECHA INGRESO */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Fecha de ingreso al Consejo *
                  </label>

                  <input
                    type="date"
                    defaultValue="2026-05-12"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* DESCRIPCIÓN */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3">
                DESCRIPCIÓN DEL TRÁMITE
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CATEGORÍA */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Categoría *
                  </label>

                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar...</option>

                    {categorias.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TIPO TRÁMITE */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Tipo de trámite *
                  </label>

                  <select
                    value={tipoTramite}
                    onChange={(e) =>
                      setTipoTramite(e.target.value)
                    }
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {tiposTramite.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* INFORMACIÓN ADICIONAL */}
            <div className="mt-10">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SOLICITANTE */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Solicitante / interesado *
                    </label>

                    <input
                      type="text"
                      placeholder="Apellido y nombre"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* DNI */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      DNI / Legajo
                    </label>

                    <input
                      type="text"
                      placeholder="Opcional"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* DESCRIPCIÓN DEL TRÁMITE */}
                <div className="mt-6">
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Descripción del trámite *
                  </label>

                  <textarea
                    rows="5"
                    placeholder="Detallá el motivo del expediente..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* COMISIÓN + CARGADO POR */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* COMISIÓN */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Comisión asignada
                    </label>

                    <select className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Sin asignar</option>
                      <option>Enseñanza</option>
                      <option>Interpretación y Fundamento</option>
                    </select>
                  </div>

                  {/* CARGADO POR */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Cargado por
                    </label>

                    <input
                      type="text"
                      value="María Sánchez"
                      disabled
                      className="w-full bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none"
                    />

                    <p className="text-xs text-slate-500 mt-2">
                      Usuario actual del sistema
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-500">
                    Paso 1 de 3
                  </p>

                  <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-white shadow-lg shadow-blue-600/20 flex items-center gap-2">
                    Continuar →
                  </button>
                </div>
              </div>
            </div>

            {/* BOTONES */}
            <div className="flex justify-end gap-4 mt-10">
              <button className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
                Cancelar
              </button>

              <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-600/30 text-white">
                Guardar expediente
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NuevoExpediente;