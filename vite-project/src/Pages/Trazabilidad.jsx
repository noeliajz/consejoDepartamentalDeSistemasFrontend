import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CalendarDays, Clock3, ChevronDown, ArrowUpRight } from "lucide-react";
import NavbarHorizontalAdmin from "../components/NavbarHorizontalAdmin";

export default function Trazabilidad() {
  const navigate = useNavigate();
  const [expedientes, setExpedientes] = useState([]);
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);

  const obtenerExpedientes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/expedientes");
      setExpedientes(response.data);
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

  const generarEventos = (exp) => {
    if (!exp) return [];
    const eventos = [
      {
        titulo: "Expediente creado",
        descripcion: "Mesa de entrada registró el expediente",
        fecha: exp.fecha_creacion,
      },
    ];
    if (exp.comision) {
      eventos.push({
        titulo: `Asignado a comisión ${exp.comision}`,
        descripcion: "Expediente enviado para análisis",
        fecha: exp.fecha_ingreso,
      });
    }
    eventos.push({
      titulo: `Estado actual: ${exp.estado}`,
      descripcion: "Seguimiento actualizado automáticamente",
      fecha: exp.fecha_ingreso,
    });
    return eventos;
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] pt-16">
      <NavbarHorizontalAdmin user={{ role: "admin" }} />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trazabilidad
          </h1>
          <p className="text-gray-500 mt-2">
            Seguimiento de expedientes del consejo directivo
          </p>
        </div>

        {/* LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* PANEL IZQUIERDO */}
          <div className="w-full lg:w-[340px] shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Expedientes</h2>
                <button
                  onClick={() => navigate("/Expediente")}
                  className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-800 transition"
                >
                  Ver todos
                  <ArrowUpRight size={15} />
                </button>
              </div>

              <div className="lg:max-h-[620px] lg:overflow-y-auto">
                {expedientes.map((exp) => (
                  <button
                    key={exp._id}
                    onClick={() => setExpedienteSeleccionado(exp)}
                    className={`
                      w-full text-left px-5 py-4
                      border-b border-gray-100 transition
                      hover:bg-gray-50
                      ${expedienteSeleccionado?._id === exp._id ? "bg-blue-50" : "bg-white"}
                    `}
                  >
                    <h3 className="font-bold text-sm text-gray-900">
                      {exp.numero}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {exp.descripcion}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${obtenerColorEstado(exp.estado)}`}
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
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5 sm:p-6">
              {/* SELECT */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1 min-w-0">
                  <select
                    value={expedienteSeleccionado?._id || ""}
                    onChange={(e) => {
                      const encontrado = expedientes.find(
                        (exp) => exp._id === e.target.value,
                      );
                      setExpedienteSeleccionado(encontrado);
                    }}
                    className="
                      w-full border border-gray-200 rounded-2xl
                      px-4 py-3 appearance-none outline-none
                      bg-white text-gray-700 text-sm
                      focus:ring-2 focus:ring-blue-200
                    "
                  >
                    {expedientes.map((exp) => (
                      <option key={exp._id} value={exp._id}>
                        {exp.numero} — {exp.descripcion}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>

                <button
                  onClick={() => navigate("/Expediente")}
                  className="px-5 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition text-sm whitespace-nowrap"
                >
                  Ver todos ↗
                </button>
              </div>

              {/* INFO + TIMELINE */}
              {expedienteSeleccionado && (
                <>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 break-words">
                    {expedienteSeleccionado.numero}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-2 mb-8 break-words">
                    {expedienteSeleccionado.descripcion}
                  </p>

                  {/* TIMELINE */}
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-200" />

                    <div className="space-y-5">
                      {generarEventos(expedienteSeleccionado).map(
                        (evento, index) => (
                          <div
                            key={index}
                            className="relative flex gap-3 sm:gap-4"
                          >
                            {/* ICONO */}
                            <div className="z-10 w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white shadow">
                              <Clock3 size={14} />
                            </div>

                            {/* CARD */}
                            <div className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-2xl p-3 sm:p-5">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                                <div className="min-w-0">
                                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                                    {evento.titulo}
                                  </h3>
                                  <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed">
                                    {evento.descripcion}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-400 text-xs whitespace-nowrap shrink-0 mt-1 sm:mt-0">
                                  <CalendarDays size={12} />
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
      </main>
    </div>
  );
}
