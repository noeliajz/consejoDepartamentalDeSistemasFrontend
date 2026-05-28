// src/pages/EditarDisposicion.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import NavbarLateral from "../Components/NavbarLateral";

import {
  Save,
  ArrowLeft,
  FileText,
  CalendarDays,
  ClipboardList,
  CheckCircle,
} from "lucide-react";

const API =
  "http://localhost:5000/api/disposiciones";

const EditarDisposicion = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  // Simulación usuario admin
  const user = {
    role: "admin",
  };

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      numero: "",
      tipo: "",
      descripcion: "",
      fecha: "",
      estado: "",
    });

  // Obtener disposición
  const obtenerDisposicion =
    async () => {
      try {
        const response =
          await axios.get(
            `${API}/${id}`
          );

        const data = response.data;

        setFormData({
          numero:
            data.numero || "",

          tipo:
            data.tipo || "",

          descripcion:
            data.descripcion || "",

          fecha:
            data.fecha || "",

          estado:
            data.estado || "",
        });
      } catch (error) {
        console.error(
          "Error al obtener disposición:",
          error.response?.data ||
            error
        );

        alert(
          "Error al cargar la disposición"
        );
      }
    };

  useEffect(() => {
    obtenerDisposicion();
  }, []);

  // Manejar cambios
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // Actualizar disposición
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `${API}/${id}`,
        formData
      );

      alert(
        "Disposición actualizada correctamente"
      );

      // Redirigir
      navigate("/Disposicion");
    } catch (error) {
      console.error(
        "Error al actualizar disposición:",
        error.response?.data ||
          error
      );

      alert(
        "Error al actualizar la disposición"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Navbar */}
      <NavbarLateral user={user} />

      {/* Contenido */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div
          className="
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
          "
        >
          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-slate-800
              "
            >
              Editar Disposición
            </h1>

            <p
              className="
                text-slate-500
                mt-1
              "
            >
              Modifique la información
              de la disposición
            </p>
          </div>

          <button
            onClick={() =>
              navigate(
                "/Disposicion"
              )
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

        {/* Formulario */}
        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-200
            p-8
          "
        >
          <form
            onSubmit={
              handleSubmit
            }
          >
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >
              {/* Número */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  "
                >
                  Número de
                  disposición
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="
                      absolute
                      left-3
                      top-3
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    name="numero"
                    value={
                      formData.numero
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="
                      w-full
                      pl-10
                      pr-4
                      py-3
                      rounded-xl
                      border
                      border-slate-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  "
                >
                  Tipo
                </label>

                <div className="relative">
                  <ClipboardList
                    size={18}
                    className="
                      absolute
                      left-3
                      top-3
                      text-slate-400
                    "
                  />

                  <select
                    name="tipo"
                    value={
                      formData.tipo
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="
                      w-full
                      pl-10
                      pr-4
                      py-3
                      rounded-xl
                      border
                      border-slate-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  >
                    <option value="">
                      Seleccione un
                      tipo
                    </option>

                    <option value="Académica">
                      Académica
                    </option>

                    <option value="De Consejo">
                      De Consejo
                    </option>

                    <option value="De Dirección">
                      De Dirección
                    </option>

                    <option value="Administrativa">
                      Administrativa
                    </option>
                  </select>
                </div>
              </div>

              {/* Fecha */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  "
                >
                  Fecha
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="
                      absolute
                      left-3
                      top-3
                      text-slate-400
                    "
                  />

                  <input
                    type="date"
                    name="fecha"
                    value={
                      formData.fecha
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="
                      w-full
                      pl-10
                      pr-4
                      py-3
                      rounded-xl
                      border
                      border-slate-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </div>
              </div>

              {/* Estado */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  "
                >
                  Estado
                </label>

                <div className="relative">
                  <CheckCircle
                    size={18}
                    className="
                      absolute
                      left-3
                      top-3
                      text-slate-400
                    "
                  />

                  <select
                    name="estado"
                    value={
                      formData.estado
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="
                      w-full
                      pl-10
                      pr-4
                      py-3
                      rounded-xl
                      border
                      border-slate-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  >
                    <option value="">
                      Seleccione un
                      estado
                    </option>

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
            </div>

            {/* Descripción */}
            <div className="mt-6">
              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                  mb-2
                "
              >
                Descripción
              </label>

              <textarea
                name="descripcion"
                value={
                  formData.descripcion
                }
                onChange={
                  handleChange
                }
                rows="5"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  resize-none
                "
              />
            </div>

            {/* Botones */}
            <div
              className="
                flex
                justify-end
                gap-4
                mt-8
              "
            >
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/Disposicion"
                  )
                }
                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  text-slate-700
                  hover:bg-slate-100
                  transition
                "
              >
                Cancelar
              </button>

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
                  text-white
                  shadow-md
                  transition
                  disabled:opacity-50
                "
              >
                <Save size={18} />

                {loading
                  ? "Guardando..."
                  : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditarDisposicion;