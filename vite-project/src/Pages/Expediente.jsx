import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  ChevronDown,
  Bell,
  Plus,
} from "lucide-react";

import NavbarLateral from "../components/NavbarLateral";

export default function Expediente() {
  const navigate = useNavigate();

  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState("Rechazado");

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Otros");

  const [openEstado, setOpenEstado] = useState(false);

  const [openCategoria, setOpenCategoria] = useState(false);

  const estados = [
    "Todos los estados",
    "Ingresado",
    "Comisión",
    "Despacho",
    "Aprobado",
    "Rechazado",
  ];

  const categorias = [
    "Todas las categorías",
    "Docentes",
    "Estudiantes",
    "Otros",
  ];

  const expedientes = [
    {
      numero: "EXP-2025-047",
      descripcion: "Beca comedor — docente Pérez",
      categoria: "Docentes",
      ingreso: "02/05/25",
      estado: "Despacho",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      numero: "EXP-2025-046",
      descripcion: "Designación cargo auxiliar informática",
      categoria: "Docentes",
      ingreso: "30/04/25",
      estado: "Comisión",
      color: "bg-purple-100 text-purple-700",
    },
    {
      numero: "EXP-2025-044",
      descripcion: "Reconocimiento actividad extensión Gómez",
      categoria: "Otros",
      ingreso: "28/04/25",
      estado: "Ingresado",
      color: "bg-blue-100 text-blue-700",
    },
    {
      numero: "EXP-2025-043",
      descripcion: "Impugnación concurso docente área 3",
      categoria: "Docentes",
      ingreso: "25/04/25",
      estado: "Rechazado",
      color: "bg-red-100 text-red-700",
    },
    {
      numero: "EXP-2025-041",
      descripcion: "Cambio correlativas — estudiantes",
      categoria: "Estudiantes",
      ingreso: "20/04/25",
      estado: "Aprobado",
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <NavbarLateral user={{ role: "admin" }} />

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Expedientes
            </h1>

            <p className="text-gray-500">
              Gestión y seguimiento de expedientes del consejo directivo
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-700 hover:text-black transition">
              <Bell size={22} />

              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <button
              onClick={() => navigate("/NuevoExpediente")}
              className="bg-blue-900 hover:bg-blue-800 transition text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 shadow"
            >
              Nuevo expediente
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Buscar expediente..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Dropdown Estado */}
              <div className="relative">
                <button
                  onClick={() => {
                    setOpenEstado(!openEstado);
                    setOpenCategoria(false);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm hover:bg-gray-50 min-w-[170px] justify-between"
                >
                  {estadoSeleccionado}

                  <ChevronDown size={16} />
                </button>

                {openEstado && (
                  <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
                    {estados.map((estado) => (
                      <button
                        key={estado}
                        onClick={() => {
                          setEstadoSeleccionado(estado);
                          setOpenEstado(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-600 hover:text-white transition ${
                          estadoSeleccionado === estado
                            ? "bg-blue-600 text-white"
                            : ""
                        }`}
                      >
                        {estado}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Categoria */}
              <div className="relative">
                <button
                  onClick={() => {
                    setOpenCategoria(!openCategoria);
                    setOpenEstado(false);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm hover:bg-gray-50 min-w-[170px] justify-between"
                >
                  {categoriaSeleccionada}

                  <ChevronDown size={16} />
                </button>

                {openCategoria && (
                  <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
                    {categorias.map((categoria) => (
                      <button
                        key={categoria}
                        onClick={() => {
                          setCategoriaSeleccionada(categoria);
                          setOpenCategoria(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-600 hover:text-white transition ${
                          categoriaSeleccionada === categoria
                            ? "bg-blue-600 text-white"
                            : ""
                        }`}
                      >
                        {categoria}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Nuevo */}
              <button
                onClick={() => navigate("/NuevoExpediente")}
                className="bg-blue-900 hover:bg-blue-800 transition text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2"
              >
                Nuevo
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wide">
            <div className="col-span-2">N° expediente</div>

            <div className="col-span-4">Descripción</div>

            <div className="col-span-1">Categoría</div>

            <div className="col-span-1">Ingreso</div>

            <div className="col-span-2">Estado</div>

            <div className="col-span-2 text-center">
              Acciones
            </div>
          </div>

          {/* Rows */}
          {expedientes.map((exp, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 px-8 py-5 items-center border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="col-span-2 font-medium text-gray-800">
                {exp.numero}
              </div>

              <div className="col-span-4 text-gray-700">
                {exp.descripcion}
              </div>

              <div className="col-span-1">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {exp.categoria}
                </span>
              </div>

              <div className="col-span-1 text-gray-600">
                {exp.ingreso}
              </div>

              <div className="col-span-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${exp.color}`}
                >
                  {exp.estado}
                </span>
              </div>

              {/* Acciones */}
              <div className="col-span-2 flex items-center justify-center gap-2">
                {/* Editar */}
                <button
                  onClick={() =>
                    navigate(`/editar-expediente/${exp.numero}`)
                  }
                  className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
                >
                  Editar
                </button>

                {/* Eliminar */}
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `¿Deseas eliminar el expediente ${exp.numero}?`
                      )
                    ) {
                      console.log(
                        "Eliminar expediente:",
                        exp.numero
                      );
                    }
                  }}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}