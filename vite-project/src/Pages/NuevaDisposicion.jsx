// src/pages/NuevaDisposicion.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import NavbarHorizontalAdmin from "../Components/NavbarHorizontalAdmin";

import {
  Save,
  ArrowLeft,
  FileText,
  CalendarDays,
  ClipboardList,
  CheckCircle,
} from "lucide-react";

const API = "http://localhost:5000/api/disposiciones";

const NuevaDisposicion = () => {
  const navigate = useNavigate();

  // Simulación usuario admin
  const user = {
    role: "admin",
  };

  const [formData, setFormData] = useState({
    numero: "",
    tipo: "",
    descripcion: "",
    fecha: "",
    estado: "Pendiente",
  });

  const [loading, setLoading] = useState(false);

  // Manejar cambios
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar disposición
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(API, formData);

      alert("Disposición creada correctamente");

      navigate("/Disposicion");
    } catch (error) {
      console.error("Error al crear disposición:", error);

      alert("Error al guardar la disposición");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Navbar */}
      <NavbarHorizontalAdmin user={user} />

      {/* Contenido */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Nueva Disposición
            </h1>

            <p className="text-slate-500 mt-1">
              Registrar una nueva disposición institucional
            </p>
          </div>

          <button
            onClick={() => navigate("/Disposicion")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Número */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Número de disposición
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    placeholder="Ej: DISP-CD-001"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tipo
                </label>

                <div className="relative">
                  <ClipboardList
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccione un tipo</option>

                    <option value="Académica">Académica</option>

                    <option value="De Consejo">De Consejo</option>

                    <option value="De Dirección">De Dirección</option>

                    <option value="Administrativa">Administrativa</option>
                  </select>
                </div>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Fecha
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Estado
                </label>

                <div className="relative">
                  <CheckCircle
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pendiente">Pendiente</option>

                    <option value="Aprobada">Aprobada</option>

                    <option value="En revisión">En revisión</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Descripción
              </label>

              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="5"
                placeholder="Ingrese una descripción..."
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate("/disposicion")}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-md transition disabled:opacity-50"
              >
                <Save size={18} />

                {loading ? "Guardando..." : "Guardar disposición"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NuevaDisposicion;
