// src/pages/EditarConsejero.jsx

import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import NavbarLateral from "../Components/NavbarLateral";

import { ArrowLeft, Save } from "lucide-react";

const API_CONSEJEROS = "http://localhost:5000/api/consejeros";

const API_USUARIOS = "http://localhost:5000/api/usuarios";

const EditarConsejero = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const user = {
    role: "admin",
  };

  const [usuarios, setUsuarios] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    usuario_id: "",

    tipo: "",

    claustro: "",

    fecha_inicio_mandato: "",

    fecha_fin_mandato: "",
  });

  // =========================
  // OBTENER CONSEJERO
  // =========================
  const obtenerConsejero = async () => {
    try {
      const response = await axios.get(`${API_CONSEJEROS}/${id}`);

      const data = response.data;

      setFormData({
        usuario_id: data.usuario?._id || "",

        tipo: data.tipo || "",

        claustro: data.claustro || "",

        fecha_inicio_mandato: data.fecha_inicio_mandato || "",

        fecha_fin_mandato: data.fecha_fin_mandato || "",
      });
    } catch (error) {
      console.error(error);

      alert("Error al obtener consejero");
    }
  };

  // =========================
  // OBTENER USUARIOS
  // =========================
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get(API_USUARIOS);

      setUsuarios(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerConsejero();

    obtenerUsuarios();
  }, []);

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
  // ACTUALIZAR
  // =========================
  const actualizarConsejero = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(`${API_CONSEJEROS}/${id}`, formData);

      alert("Consejero actualizado correctamente");

      navigate("/Consejero");
    } catch (error) {
      console.error(error);

      alert("Error al actualizar consejero");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <NavbarLateral user={user} />

      <main className="flex-1 ml-64 p-8">
        {/* HEADER */}
        <div
          className="
            bg-white
            rounded-2xl
            border
            border-slate-200
            shadow-sm
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
              Editar Consejero
            </h1>

            <p
              className="
                text-slate-500
                mt-1
              "
            >
              Modificar datos del consejero
            </p>
          </div>

          <button
            onClick={() => navigate("/Consejero")}
            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              border-slate-300
              hover:bg-slate-100
              transition
            "
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={actualizarConsejero}
          className="
            bg-white
            rounded-2xl
            border
            border-slate-200
            shadow-sm
            p-8
            space-y-6
          "
        >
          {/* Usuario */}
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
              Usuario
            </label>

            <select
              name="usuario_id"
              value={formData.usuario_id}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
              "
            >
              <option value="">Seleccionar usuario</option>

              {usuarios.map((usuario) => (
                <option key={usuario._id} value={usuario._id}>
                  {usuario.nombre} {usuario.apellido}
                </option>
              ))}
            </select>
          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >
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

              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                "
              >
                <option value="Titular">Titular</option>

                <option value="Suplente">Suplente</option>
              </select>
            </div>

            {/* Claustro */}
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
                Claustro
              </label>

              <select
                name="claustro"
                value={formData.claustro}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                "
              >
                <option value="Docente">Docente</option>

                <option value="Estudiante">Estudiante</option>

                <option value="Graduado">Graduado</option>
              </select>
            </div>

            {/* Fecha Inicio */}
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
                Fecha inicio mandato
              </label>

              <input
                type="date"
                name="fecha_inicio_mandato"
                value={formData.fecha_inicio_mandato}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                "
              />
            </div>

            {/* Fecha Fin */}
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
                Fecha fin mandato
              </label>

              <input
                type="date"
                name="fecha_fin_mandato"
                value={formData.fecha_fin_mandato}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                "
              />
            </div>
          </div>

          {/* BOTONES */}
          <div
            className="
              flex
              items-center
              justify-end
              gap-4
              pt-4
            "
          >
            <button
              type="button"
              onClick={() => navigate("/Consejero")}
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
              type="submit"
              disabled={loading}
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-yellow-600
                hover:bg-yellow-700
                text-white
                shadow-md
                transition
              "
            >
              <Save size={18} />

              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditarConsejero;
