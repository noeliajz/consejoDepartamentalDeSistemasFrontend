import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import NavbarLateral from "../components/NavbarLateral";

import "../index.css";

const EditarExpediente = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  // USUARIO
  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  // STATES
  const [numero, setNumero] = useState("");

  const [fechaCreacion, setFechaCreacion] =
    useState("");

  const [fechaIngreso, setFechaIngreso] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  const [tipoTramite, setTipoTramite] =
    useState("");

  const [solicitante, setSolicitante] =
    useState("");

  const [dniLegajo, setDniLegajo] =
    useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [comision, setComision] =
    useState("");

  const [estado, setEstado] =
    useState("Despacho");

  const [loading, setLoading] =
    useState(false);

  // OPCIONES
  const categorias = [
    "Docentes",
    "Alumnos",
    "Otros"
  ];

  const tiposTramite = [
    "Seleccionar...",
    "Aprobación de plan",
    "Designación",
    "Solicitud de beca",
    "Otros",
  ];

  // OBTENER EXPEDIENTE
  useEffect(() => {

    obtenerExpediente();

  }, []);

  const obtenerExpediente = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:5000/api/expedientes/${id}`
      );

      const exp = response.data;

      setNumero(exp.numero || "");

      setFechaCreacion(
        exp.fecha_creacion || ""
      );

      setFechaIngreso(
        exp.fecha_ingreso || ""
      );

      setCategoria(
        exp.categoria || ""
      );

      setTipoTramite(
        exp.tipo_tramite || ""
      );

      setSolicitante(
        exp.solicitante || ""
      );

      setDniLegajo(
        exp.dni_legajo || ""
      );

      setDescripcion(
        exp.descripcion || ""
      );

      setComision(
        exp.comision || ""
      );

      setEstado(
        exp.estado || "Despacho"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error al obtener expediente"
      );

    }
  };

  // ACTUALIZAR
  const handleEditarExpediente = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem(
        "token"
      );

      await axios.put(
        `http://127.0.0.1:5000/api/expedientes/${id}`,
        {
          numero,

          fecha_creacion:
            fechaCreacion,

          fecha_ingreso:
            fechaIngreso,

          categoria,

          tipo_tramite:
            tipoTramite,

          solicitante,

          dni_legajo:
            dniLegajo,

          descripcion,

          comision,

          cargado_por:
            usuario?.nombre,

          estado,

          usuario_id:
            usuario?.id
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Expediente actualizado correctamente"
      );

      navigate("/Expediente");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error al actualizar expediente"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}
      <NavbarLateral
        user={{ role: "admin" }}
      />

      {/* CONTENIDO */}
      <main className="flex-1 ml-64 p-8">

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-t-2xl p-6 shadow-lg">

            <h1 className="text-3xl font-bold text-white">
              Editar expediente
            </h1>

            <p className="text-yellow-100 mt-2">
              Modificá los datos del expediente
            </p>

          </div>

          {/* FORM */}
          <div className="bg-white rounded-b-2xl p-8 shadow-xl">

            {/* IDENTIFICACION */}
            <div className="mb-10">

              <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3">
                IDENTIFICACIÓN
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* NUMERO */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Número
                  </label>

                  <input
                    type="text"
                    value={numero}
                    onChange={(e) =>
                      setNumero(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                  />
                </div>

                {/* FECHA CREACION */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Fecha creación
                  </label>

                  <input
                    type="date"
                    value={fechaCreacion}
                    onChange={(e) =>
                      setFechaCreacion(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                  />
                </div>

                {/* FECHA INGRESO */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Fecha ingreso
                  </label>

                  <input
                    type="date"
                    value={fechaIngreso}
                    onChange={(e) =>
                      setFechaIngreso(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                  />
                </div>

              </div>
            </div>

            {/* DESCRIPCION */}
            <div>

              <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3">
                DESCRIPCIÓN
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* CATEGORIA */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Categoría
                  </label>

                  <select
                    value={categoria}
                    onChange={(e) =>
                      setCategoria(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                  >

                    <option value="">
                      Seleccionar...
                    </option>

                    {categorias.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>
                </div>

                {/* TIPO */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Tipo trámite
                  </label>

                  <select
                    value={tipoTramite}
                    onChange={(e) =>
                      setTipoTramite(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                  >

                    {tiposTramite.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>
                </div>

              </div>
            </div>

            {/* INFORMACION */}
            <div className="mt-10">

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">

                {/* SOLICITANTE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Solicitante
                    </label>

                    <input
                      type="text"
                      value={solicitante}
                      onChange={(e) =>
                        setSolicitante(
                          e.target.value
                        )
                      }
                      className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* DNI */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      DNI / Legajo
                    </label>

                    <input
                      type="text"
                      value={dniLegajo}
                      onChange={(e) =>
                        setDniLegajo(
                          e.target.value
                        )
                      }
                      className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                  </div>

                </div>

                {/* DESCRIPCION */}
                <div className="mt-6">

                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Descripción
                  </label>

                  <textarea
                    rows="5"
                    value={descripcion}
                    onChange={(e) =>
                      setDescripcion(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                  />

                </div>

                {/* COMISION */}
                <div className="mt-6">

                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Comisión
                  </label>

                  <select
                    value={comision}
                    onChange={(e) =>
                      setComision(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                  >

                    <option value="">
                      Sin asignar
                    </option>

                    <option value="Enseñanza">
                      Enseñanza
                    </option>

                    <option value="Interpretación y Fundamento">
                      Interpretación y Fundamento
                    </option>

                  </select>
                </div>

                {/* ESTADO */}
                <div className="mt-6">

                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Estado
                  </label>

                  <select
                    value={estado}
                    onChange={(e) =>
                      setEstado(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                  >

                    <option value="Despacho">
                      Despacho
                    </option>

                    <option value="Ingresado">
                      Ingresado
                    </option>

                    <option value="Comisión">
                      Comisión
                    </option>

                  </select>
                </div>

                {/* BOTONES */}
                <div className="flex justify-end gap-4 mt-10">

                  <button
                    onClick={() =>
                      navigate("/Expediente")
                    }
                    className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={
                      handleEditarExpediente
                    }
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition font-semibold text-white"
                  >
                    {
                      loading
                        ? "Actualizando..."
                        : "Actualizar expediente"
                    }
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

export default EditarExpediente;