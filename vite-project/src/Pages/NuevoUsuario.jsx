// src/pages/NuevoUsuario.jsx

import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import NavbarLateral from "../Components/NavbarLateral";

import { Save, ArrowLeft, User, Mail, Phone, ShieldCheck } from "lucide-react";

const API = "http://localhost:5000/api/usuarios";

const NuevoUsuario = () => {
  const navigate = useNavigate();

  const user = {
    role: "admin",
  };

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    celular: "",
    claustro: "",
    tipo: "",
    rol: "",
    estado: "Activo",
    mandato_anios: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CREAR USUARIO
  // =========================
  const crearUsuario = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(API, formData);

      alert("Usuario creado correctamente");

      navigate("/Usuario");
    } catch (error) {
      console.error(error);

      alert("Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* NAVBAR */}
      <NavbarLateral user={user} />

      {/* CONTENIDO */}
      <main className="flex-1 ml-64 p-8">
        {/* HEADER */}
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
              Nuevo Usuario
            </h1>

            <p
              className="
                text-slate-500
                mt-1
              "
            >
              Registro de usuarios institucionales
            </p>
          </div>

          <button
            onClick={() => navigate("/Usuario")}
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

        {/* FORMULARIO */}
        <form
          onSubmit={crearUsuario}
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-200
            p-8
            space-y-8
          "
        >
          {/* DATOS PERSONALES */}
          <div>
            <h2
              className="
                text-xl
                font-semibold
                text-slate-800
                mb-6
                flex
                items-center
                gap-2
              "
            >
              <User size={22} />
              Datos Personales
            </h2>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >
              {/* NOMBRE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
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
                  "
                />
              </div>

              {/* APELLIDO */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Apellido
                </label>

                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
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
                  "
                />
              </div>

              {/* MAIL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="
                      absolute
                      left-3
                      top-4
                      text-slate-400
                    "
                  />

                  <input
                    type="email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
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

              {/* CELULAR */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Celular
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="
                      absolute
                      left-3
                      top-4
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
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
            </div>
          </div>

          {/* DATOS INSTITUCIONALES */}
          <div>
            <h2
              className="
                text-xl
                font-semibold
                text-slate-800
                mb-6
                flex
                items-center
                gap-2
              "
            >
              <ShieldCheck size={22} />
              Datos Institucionales
            </h2>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >
              {/* CLAUSTRO */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Claustro
                </label>

                <select
                  name="claustro"
                  value={formData.claustro}
                  onChange={handleChange}
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
                  "
                >
                  <option value="">Seleccione</option>

                  <option value="Docente">Docente</option>

                  <option value="Estudiante">Estudiante</option>

                  <option value="Graduado">Graduado</option>
                </select>
              </div>

              {/* TIPO */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo
                </label>

                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
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
                  "
                >
                  <option value="">Seleccione</option>

                  <option value="Titular">Titular</option>

                  <option value="Suplente">Suplente</option>
                </select>
              </div>

              {/* ROL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Rol
                </label>

                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
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
                  "
                >
                  <option value="">Seleccione</option>

                  <option value="Admin">Admin</option>

                  <option value="Usuario">Usuario</option>
                </select>
              </div>

              {/* ESTADO */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Estado
                </label>

                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
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
                  "
                >
                  <option value="Activo">Activo</option>

                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              {/* MANDATO */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mandato (años)
                </label>

                <input
                  type="number"
                  name="mandato_anios"
                  value={formData.mandato_anios}
                  onChange={handleChange}
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
                  "
                />
              </div>
            </div>
          </div>

          {/* BOTONES */}
          <div
            className="
              flex
              items-center
              justify-end
              gap-4
              pt-6
            "
          >
            <button
              type="button"
              onClick={() => navigate("/Usuario")}
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

              {loading ? "Guardando..." : "Guardar Usuario"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NuevoUsuario;
