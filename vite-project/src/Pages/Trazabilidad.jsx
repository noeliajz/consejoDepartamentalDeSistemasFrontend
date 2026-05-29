import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { CalendarDays, Clock3, ChevronDown, ArrowUpRight } from "lucide-react";

import NavbarHorizontalAdmin from "../components/NavbarHorizontalAdmin";

export default function Trazabilidad() {
  const navigate = useNavigate();

  // EXPEDIENTES
  const [expedientes, setExpedientes] = useState([]);

  // EXPEDIENTE SELECCIONADO
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);

  // OBTENER EXPEDIENTES
  const obtenerExpedientes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/expedientes");

      setExpedientes(response.data);

      // seleccionar primero
      if (response.data.length > 0) {
        setExpedienteSeleccionado(response.data[0]);
      }
    } catch (error) {
      console.error(error);

      alert("Error al obtener expedientes");
    }
  };

  useEffect(() => {
    obtenerExpedientes();
  }, []);

  // COLOR ESTADO
  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case "Despacho":
        return "bg-yellow-100 text-yellow-700";

      case "Comisión":
        return "bg-purple-100 text-purple-700";

      case "Ingresado":
        return "bg-blue-100 text-blue-700";

      case "Aprobado":
        return "bg-green-100 text-green-700";

      case "Rechazado":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // TRAZABILIDAD AUTOMÁTICA
  const generarEventos = (exp) => {
    if (!exp) return [];

    const eventos = [
      {
        titulo: "Expediente creado",
        descripcion: "Mesa de entrada registró el expediente",
        fecha: exp.fecha_creacion,
      },
    ];

    // comisión
    if (exp.comision) {
      eventos.push({
        titulo: `Asignado a comisión ${exp.comision}`,
        descripcion: "Expediente enviado para análisis",
        fecha: exp.fecha_ingreso,
      });
    }

    // estado
    eventos.push({
      titulo: `Estado actual: ${exp.estado}`,
      descripcion: "Seguimiento actualizado automáticamente",
      fecha: exp.fecha_ingreso,
    });

    return eventos;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <NavbarHorizontalAdmin user={{ role: "admin" }} />

      {/* MAIN */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Trazabilidad</h1>

            <p className="text-gray-500 mt-2">
              Seguimiento de expedientes del consejo directivo
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-12 gap-6">
            {/* PANEL IZQUIERDO */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                {/* HEADER */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Expedientes
                    </h2>
                  </div>

                  <button
                    onClick={() => navigate("/Expediente")}
                    className="text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-800"
                  >
                    Ver todos
                    <ArrowUpRight size={16} />
                  </button>
                </div>

                {/* LISTA */}
                <div className="max-h-[700px] overflow-y-auto">
                  {expedientes.map((exp) => (
                    <button
                      key={exp._id}
                      onClick={() => setExpedienteSeleccionado(exp)}
                      className={`
                        w-full
                        text-left
                        p-6
                        border-b
                        border-gray-100
                        transition
                        hover:bg-gray-50
                        ${
                          expedienteSeleccionado?._id === exp._id
                            ? "bg-blue-50"
                            : "bg-white"
                        }
                      `}
                    >
                      <h3 className="font-bold text-xl text-gray-900">
                        {exp.numero}
                      </h3>

                      <p className="text-gray-600 mt-2">{exp.descripcion}</p>

                      <div className="mt-4">
                        <span
                          className={`
                          px-4
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                          ${obtenerColorEstado(exp.estado)}
                        `}
                        >
                          {exp.estado}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PANEL DERECHO */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                {/* SELECT */}
                <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">
                  <div className="relative w-full">
                    <select
                      value={expedienteSeleccionado?._id || ""}
                      onChange={(e) => {
                        const encontrado = expedientes.find(
                          (exp) => exp._id === e.target.value,
                        );

                        setExpedienteSeleccionado(encontrado);
                      }}
                      className="
                        w-full
                        border
                        border-gray-200
                        rounded-2xl
                        px-5
                        py-4
                        appearance-none
                        outline-none
                        bg-white
                        text-gray-700
                      "
                    >
                      {expedientes.map((exp) => (
                        <option key={exp._id} value={exp._id}>
                          {exp.numero} — {exp.descripcion}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={18}
                      className="
                        absolute
                        right-5
                        top-1/2
                        -translate-y-1/2
                        text-gray-500
                      "
                    />
                  </div>

                  <button
                    onClick={() => navigate("/Expediente")}
                    className="
                      px-6
                      py-4
                      border
                      border-gray-200
                      rounded-2xl
                      hover:bg-gray-50
                      transition
                      whitespace-nowrap
                    "
                  >
                    Ver todos ↗
                  </button>
                </div>

                {/* INFO */}
                {expedienteSeleccionado && (
                  <>
                    <h2 className="text-5xl font-bold text-gray-900">
                      {expedienteSeleccionado.numero}
                    </h2>

                    <p className="text-2xl text-gray-600 mt-3 mb-10">
                      {expedienteSeleccionado.descripcion}
                    </p>

                    {/* TIMELINE */}
                    <div className="relative">
                      {/* LINEA */}
                      <div
                        className="
                        absolute
                        left-5
                        top-0
                        bottom-0
                        w-[2px]
                        bg-gray-200
                      "
                      />

                      <div className="space-y-8">
                        {generarEventos(expedienteSeleccionado).map(
                          (evento, index) => (
                            <div key={index} className="relative flex gap-6">
                              {/* ICONO */}
                              <div
                                className="
                              z-10
                              w-10
                              h-10
                              rounded-full
                              bg-blue-600
                              flex
                              items-center
                              justify-center
                              text-white
                              shadow-lg
                            "
                              >
                                <Clock3 size={18} />
                              </div>

                              {/* CARD */}
                              <div
                                className="
                              flex-1
                              bg-gray-50
                              border
                              border-gray-200
                              rounded-3xl
                              p-8
                            "
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                      {evento.titulo}
                                    </h3>

                                    <p className="text-gray-600 mt-4 text-lg">
                                      {evento.descripcion}
                                    </p>
                                  </div>

                                  <div
                                    className="
                                  flex
                                  items-center
                                  gap-2
                                  text-gray-500
                                  whitespace-nowrap
                                "
                                  >
                                    <CalendarDays size={16} />

                                    <span>{evento.fecha}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
