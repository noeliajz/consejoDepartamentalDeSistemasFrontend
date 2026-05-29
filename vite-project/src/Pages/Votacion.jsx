// src/pages/Votacion.jsx

import React, { useEffect, useState } from "react";

import axios from "axios";

import NavbarHorizontalAdmin from "../components/NavbarHorizontalAdmin";

const API = "http://localhost:5000/api";

export default function Votacion() {
  // ============================================
  // STATES
  // ============================================

  const [usuarios, setUsuarios] = useState([]);
  const [reuniones, setReuniones] = useState([]);
  const [votaciones, setVotaciones] = useState([]);

  const [seleccionado, setSeleccionado] = useState(null);

  const [formulario, setFormulario] = useState({
    tema: "",
    reunion_id: "",
  });

  const [votos, setVotos] = useState({});

  // ============================================
  // USE EFFECT
  // ============================================

  useEffect(() => {
    obtenerUsuarios();
    obtenerReuniones();
    obtenerVotaciones();
  }, []);

  // ============================================
  // OBTENER USUARIOS
  // ============================================

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(`${API}/usuarios`);

      setUsuarios(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================================
  // OBTENER REUNIONES
  // ============================================

  const obtenerReuniones = async () => {
    try {
      const res = await axios.get(`${API}/reuniones`);

      setReuniones(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================================
  // OBTENER VOTACIONES
  // ============================================

  const obtenerVotaciones = async () => {
    try {
      const res = await axios.get(`${API}/votaciones`);

      setVotaciones(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================================
  // SELECCIONAR CONSEJERO
  // ============================================

  const seleccionarConsejero = (usuario) => {
    setSeleccionado(usuario._id);
  };

  // ============================================
  // VOTAR
  // ============================================

  const votar = (tipo) => {
    if (!seleccionado) return;

    setVotos((prev) => ({
      ...prev,
      [seleccionado]: tipo,
    }));

    setSeleccionado(null);
  };

  // ============================================
  // QUITAR VOTO
  // ============================================

  const quitarVoto = () => {
    if (!seleccionado) return;

    setVotos((prev) => {
      const copia = { ...prev };

      delete copia[seleccionado];

      return copia;
    });

    setSeleccionado(null);
  };

  // ============================================
  // CONTADORES
  // ============================================

  const aFavor = Object.values(votos).filter((v) => v === "favor").length;

  const enContra = Object.values(votos).filter((v) => v === "contra").length;

  const abstencion = Object.values(votos).filter(
    (v) => v === "abstencion",
  ).length;

  // ============================================
  // GUARDAR VOTACION
  // ============================================

  const guardarVotacion = async () => {
    try {
      if (!formulario.tema) {
        alert("Ingrese un tema");

        return;
      }

      if (!formulario.reunion_id) {
        alert("Seleccione una reunión");

        return;
      }

      const votosArray = Object.entries(votos).map(([usuario_id, voto]) => ({
        usuario_id,
        voto,
      }));

      const body = {
        tema: formulario.tema,

        reunion_id: formulario.reunion_id,

        votos: votosArray,

        favor: aFavor,

        contra: enContra,

        abstencion,

        total: aFavor + enContra + abstencion,

        resultado: aFavor > enContra ? "Aprobado" : "Rechazado",

        fecha: new Date(),
      };

      await axios.post(`${API}/votaciones`, body);

      alert("Votación guardada correctamente");

      setFormulario({
        tema: "",
        reunion_id: "",
      });

      setVotos({});

      obtenerVotaciones();
    } catch (error) {
      console.log(error);

      alert("Error al guardar votación");
    }
  };

  // ============================================
  // ELIMINAR
  // ============================================

  const eliminarVotacion = async (id) => {
    try {
      const confirmar = window.confirm("¿Eliminar votación?");

      if (!confirmar) return;

      await axios.delete(`${API}/votaciones/${id}`);

      obtenerVotaciones();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================================
  // UI
  // ============================================

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <NavbarHorizontalAdmin user={{ role: "admin" }} />

      <div className="flex-1 ml-64 p-8">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Votaciones
          </h1>

          <p className="text-gray-500 mt-2">Registrar votaciones del consejo</p>
        </div>

        {/* FORMULARIO */}

        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5">Nueva votación</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* TEMA */}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tema
              </label>

              <input
                type="text"
                value={formulario.tema}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    tema: e.target.value,
                  })
                }
                placeholder="Tema de la votación"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* REUNION */}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Reunión
              </label>

              <select
                value={formulario.reunion_id}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    reunion_id: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar reunión</option>

                {reuniones.map((r) => (
                  <option key={r._id} value={r._id}>
                    {`${r.categoria || "Sin categoría"} - ${r.descripcion || "Sin descripción"}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* TARJETAS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <Card
            numero={usuarios.length}
            texto="Consejeros"
            color="text-blue-700"
          />

          <Card numero={aFavor} texto="A favor" color="text-green-700" />

          <Card numero={enContra} texto="En contra" color="text-red-600" />

          <Card
            numero={abstencion}
            texto="Abstención"
            color="text-yellow-600"
          />
        </div>

        {/* CONSEJEROS */}

        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Consejeros</h2>

            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Votación activa
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {usuarios.map((u) => {
              const voto = votos[u._id];

              let estilos = "border-gray-200 bg-white";

              if (voto === "favor") {
                estilos = "border-green-500 bg-green-50";
              }

              if (voto === "contra") {
                estilos = "border-red-500 bg-red-50";
              }

              if (voto === "abstencion") {
                estilos = "border-yellow-500 bg-yellow-50";
              }

              if (seleccionado === u._id) {
                estilos = "border-blue-500 bg-blue-50";
              }

              return (
                <button
                  key={u._id}
                  onClick={() => seleccionarConsejero(u)}
                  className={`border-2 rounded-2xl p-5 text-left transition-all ${estilos}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                      {u.nombre?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {u.nombre || "Sin nombre"} {u.apellido || ""}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {u.mail || "Sin email"}
                      </p>

                      {voto && (
                        <p className="text-sm font-semibold mt-2 text-gray-700">
                          Voto: {voto}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* PANEL VOTOS */}

        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5">Registrar voto</h2>

          <div className="flex flex-wrap gap-4">
            <button
              disabled={!seleccionado}
              onClick={() => votar("favor")}
              className="bg-green-100 text-green-700 px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              A favor
            </button>

            <button
              disabled={!seleccionado}
              onClick={() => votar("contra")}
              className="bg-red-100 text-red-700 px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              En contra
            </button>

            <button
              disabled={!seleccionado}
              onClick={() => votar("abstencion")}
              className="bg-yellow-100 text-yellow-700 px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              Abstención
            </button>

            <button
              disabled={!seleccionado}
              onClick={quitarVoto}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              Quitar voto
            </button>

            <button
              onClick={guardarVotacion}
              className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800"
            >
              Guardar votación
            </button>
          </div>
        </div>

        {/* HISTORIAL */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">
            Historial de votaciones
          </h2>

          {votaciones.length === 0 && (
            <p className="text-gray-500">No hay votaciones registradas.</p>
          )}

          <div className="space-y-5">
            {votaciones.map((v) => (
              <div key={v._id} className="border rounded-2xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {typeof v.tema === "object"
                        ? JSON.stringify(v.tema)
                        : v.tema}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {v.fecha
                        ? new Date(v.fecha).toLocaleString()
                        : "Sin fecha"}
                    </p>
                  </div>

                  <button
                    onClick={() => eliminarVotacion(v._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="flex gap-6 flex-wrap">
                  <span className="text-green-700 font-medium">
                    A favor: {v.favor || 0}
                  </span>

                  <span className="text-red-600 font-medium">
                    En contra: {v.contra || 0}
                  </span>

                  <span className="text-yellow-700 font-medium">
                    Abstención: {v.abstencion || 0}
                  </span>

                  <span className="text-blue-700 font-semibold">
                    {v.resultado || "Sin resultado"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE CARD
// ============================================

function Card({ numero, texto, color }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 text-center">
      <div className={`text-4xl font-bold ${color}`}>{numero}</div>

      <div className="text-gray-500 mt-2">{texto}</div>
    </div>
  );
}
