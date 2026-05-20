// src/pages/NuevaActa.jsx

import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import NavbarLateral from "../Components/NavbarLateral";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import {
  Save,
  ArrowLeft,
  FileText,
  ChevronDown,
  X,
} from "lucide-react";

const NuevaActa = () => {

  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const user = {
    role: "admin",
  };

  // FORMULARIO
  const [formulario, setFormulario] =
    useState({

      // RELACION CON REUNION
      reunion_id: "",

      // NUEVO CAMPO
      descripcion: "",

      fecha: "",

      consejeros: "",

      temas: [],

      estado: "Pendiente",
    });

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // TEMAS
  const [
    temasDisponibles,
    setTemasDisponibles,
  ] = useState([]);

  // REUNIONES
  const [
    reuniones,
    setReuniones,
  ] = useState([]);

  // DROPDOWN
  const [
    dropdownAbierto,
    setDropdownAbierto,
  ] = useState(false);

  // OBTENER TEMAS
  const obtenerTemasDespacho =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/temas"
          );

        const temasFiltrados =
          response.data.filter(
            (tema) =>
              tema.despacho ===
                "Despacho" &&
              !tema.acta_id
          );

        setTemasDisponibles(
          temasFiltrados
        );

      } catch (error) {

        console.error(error);

      }
    };

  // OBTENER REUNIONES
  const obtenerReuniones =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/reuniones"
          );

        setReuniones(
          response.data
        );

      } catch (error) {

        console.error(
          "Error obteniendo reuniones:",
          error
        );

      }
    };

  // CARGAR DATOS
  useEffect(() => {

    obtenerTemasDespacho();

    obtenerReuniones();

  }, []);

  // CERRAR DROPDOWN
  useEffect(() => {

    const handleClickOutside =
      (e) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            e.target
          )
        ) {

          setDropdownAbierto(
            false
          );
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  // HANDLE INPUTS
  const handleChange = (e) => {

    setFormulario({
      ...formulario,

      [e.target.name]:
        e.target.value,
    });
  };

  // TOGGLE TEMA
  const toggleTema = (
    temaId
  ) => {

    const yaSeleccionado =
      formulario.temas.includes(
        temaId
      );

    setFormulario({
      ...formulario,

      temas: yaSeleccionado
        ? formulario.temas.filter(
            (id) =>
              id !== temaId
          )
        : [
            ...formulario.temas,
            temaId,
          ],
    });
  };

  // QUITAR TEMA
  const quitarTema = (
    temaId
  ) => {

    setFormulario({
      ...formulario,

      temas:
        formulario.temas.filter(
          (id) =>
            id !== temaId
        ),
    });
  };

  // GUARDAR ACTA
  const guardarActa =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await axios.post(
          "http://localhost:5000/api/actas-reunion",
          formulario
        );

        alert(
          "Acta creada correctamente"
        );

        navigate("/Acta");

      } catch (error) {

        console.error(
          "Error creando acta:",
          error
        );

        alert(
          "Error al crear acta"
        );

      } finally {

        setLoading(false);

      }
    };

  // TEMAS SELECCIONADOS
  const temasSeleccionadosObjetos =
    temasDisponibles.filter(
      (t) =>
        formulario.temas.includes(
          t._id
        )
    );

  return (

    <div className="
      flex
      bg-slate-100
      min-h-screen
    ">

      <NavbarLateral user={user} />

      <main className="
        flex-1
        ml-64
        p-8
      ">

        {/* HEADER */}
        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-slate-200
          p-6
          mb-8
          flex
          items-center
          justify-between
        ">

          <div className="
            flex
            items-center
            gap-4
          ">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
              text-blue-700
            ">

              <FileText size={30} />

            </div>

            <div>

              <h1 className="
                text-3xl
                font-bold
                text-slate-800
              ">
                Nueva Acta
              </h1>

              <p className="
                text-slate-500
                mt-1
              ">
                Registrar nueva acta
              </p>

            </div>

          </div>

          {/* VOLVER */}
          <button
            onClick={() =>
              navigate("/Acta")
            }
            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              border-slate-300
              text-slate-700
              hover:bg-slate-100
              transition
            "
          >

            <ArrowLeft size={18} />

            Volver

          </button>

        </div>

        {/* FORM */}
        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-slate-200
          p-8
          max-w-4xl
        ">

          <form
            onSubmit={guardarActa}
            className="space-y-8"
          >

            {/* GRID */}
            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            ">

              {/* REUNION */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                  mb-2
                ">
                  Fecha de la reunión
                </label>

                <select
                  name="reunion_id"
                  value={
                    formulario.reunion_id
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                >

                  <option value="">
                    Seleccionar reunión
                  </option>

                  {reuniones.map(
                    (reunion) => (

                      <option
                        key={
                          reunion._id
                        }
                        value={
                          reunion._id
                        }
                      >

                        {new Date(
                          reunion.fecha
                        ).toLocaleDateString(
                          "es-AR"
                        )}

                        {" - "}

                        {reunion.tipo}

                      </option>

                    )
                  )}

                </select>

              </div>

              {/* FECHA */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                  mb-2
                ">
                  Fecha del acta
                </label>

                <input
                  type="date"
                  name="fecha"
                  value={
                    formulario.fecha
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

              {/* CONSEJEROS */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                  mb-2
                ">
                  Consejeros presentes
                </label>

                <input
                  type="number"
                  name="consejeros"
                  value={
                    formulario.consejeros
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Cantidad"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

              {/* ESTADO */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                  mb-2
                ">
                  Estado
                </label>

                <select
                  name="estado"
                  value={
                    formulario.estado
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                >

                  <option value="Pendiente">
                    Pendiente
                  </option>

                  <option value="Aprobada">
                    Aprobada
                  </option>

                  <option value="En revisión">
                    En revisión
                  </option>

                </select>

              </div>

            </div>

            {/* DESCRIPCION */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-slate-700
                mb-2
              ">
                Descripción del acta
              </label>

              <textarea
                name="descripcion"
                value={
                  formulario.descripcion
                }
                onChange={
                  handleChange
                }
                rows={5}
                placeholder="Ingrese una descripción del acta..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  resize-none
                "
              />

            </div>

            {/* TEMAS */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-slate-700
                mb-2
              ">
                Temas tratados
              </label>

              <div
                className="relative"
                ref={dropdownRef}
              >

                {/* BOTON */}
                <button
                  type="button"
                  onClick={() =>
                    setDropdownAbierto(
                      !dropdownAbierto
                    )
                  }
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

                  <span className="
                    text-slate-500
                  ">

                    {formulario.temas
                      .length === 0
                      ? "Seleccionar temas..."
                      : `${formulario.temas.length} tema${formulario.temas.length > 1 ? "s" : ""} seleccionado${formulario.temas.length > 1 ? "s" : ""}`}

                  </span>

                  <ChevronDown
                    size={18}
                    className={`
                      transition-transform
                      ${
                        dropdownAbierto
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />

                </button>

                {/* LISTA */}
                {dropdownAbierto && (

                  <div className="
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
                  ">

                    {temasDisponibles
                      .length === 0 ? (

                      <p className="
                        px-4
                        py-3
                        text-sm
                        text-slate-400
                      ">
                        No hay temas disponibles
                      </p>

                    ) : (

                      temasDisponibles.map(
                        (tema) => {

                          const seleccionado =
                            formulario.temas.includes(
                              tema._id
                            );

                          return (

                            <label
                              key={
                                tema._id
                              }
                              className={`
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                cursor-pointer
                                hover:bg-slate-50
                                ${
                                  seleccionado
                                    ? "bg-blue-50"
                                    : ""
                                }
                              `}
                            >

                              <input
                                type="checkbox"
                                checked={
                                  seleccionado
                                }
                                onChange={() =>
                                  toggleTema(
                                    tema._id
                                  )
                                }
                                className="
                                  w-4
                                  h-4
                                  accent-blue-600
                                "
                              />

                              <span className={`
                                text-sm
                                ${
                                  seleccionado
                                    ? "text-blue-700 font-medium"
                                    : "text-slate-700"
                                }
                              `}>
                                {
                                  tema.descripcion
                                }
                              </span>

                            </label>

                          );
                        }
                      )

                    )}

                  </div>

                )}

              </div>

              {/* BADGES */}
              {temasSeleccionadosObjetos
                .length > 0 && (

                <div className="
                  mt-4
                ">

                  <p className="
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Temas seleccionados:
                  </p>

                  <div className="
                    flex
                    flex-col
                    gap-2
                  ">

                    {temasSeleccionadosObjetos.map(
                      (tema) => (

                        <span
                          key={tema._id}
                          className="
                            flex
                            items-center
                            justify-between
                            gap-2
                            bg-blue-50
                            border
                            border-blue-200
                            text-blue-700
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                          "
                        >

                          {
                            tema.descripcion
                          }

                          <button
                            type="button"
                            onClick={() =>
                              quitarTema(
                                tema._id
                              )
                            }
                          >

                            <X size={14} />

                          </button>

                        </span>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

            {/* BOTONES */}
            <div className="
              flex
              items-center
              gap-4
              pt-4
            ">

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-xl
                  bg-blue-700
                  hover:bg-blue-800
                  disabled:bg-blue-400
                  text-white
                  font-semibold
                "
              >

                <Save size={18} />

                {loading
                  ? "Guardando..."
                  : "Guardar Acta"}

              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/Acta")
                }
                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  text-slate-700
                  hover:bg-slate-100
                "
              >
                Cancelar
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
};

export default NuevaActa;