import React from "react";
import NavbarLateral from "../Components/NavbarLateral";

import {
  FileBarChart,
  Download,
  Upload,
  Filter,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
} from "lucide-react";

const Reporte = () => {
  // Simulación usuario admin
  const user = {
    role: "admin",
  };

  const asistencia = [
    {
      nombre: "Roberto López",
      porcentaje: "5/5",
      valor: 100,
    },
    {
      nombre: "Ana Martínez",
      porcentaje: "4/5",
      valor: 80,
    },
    {
      nombre: "Carlos Fernández",
      porcentaje: "3/5",
      valor: 60,
    },
    {
      nombre: "Diana García",
      porcentaje: "3/5",
      valor: 60,
    },
  ];

  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Navbar */}
      <NavbarLateral user={user} />

      {/* Contenido */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Reportes y Estadísticas
              </h1>

              <p className="text-slate-500 mt-1">
                Visualización y generación de reportes institucionales
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FileBarChart
                size={32}
                className="text-blue-700"
              />
            </div>
          </div>
        </div>

        {/* Cards estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CardEstadistica
            titulo="Asistencia promedio"
            valor="84%"
            descripcion="Reuniones 2025"
            icon={<TrendingUp size={24} />}
          />

          <CardEstadistica
            titulo="Expedientes resueltos"
            valor="38"
            descripcion="De 47 activos"
            icon={<FileText size={24} />}
          />

          <CardEstadistica
            titulo="Tasa de aprobación"
            valor="76%"
            descripcion="Últimas 3 sesiones"
            icon={<CheckCircle size={24} />}
          />

          <CardEstadistica
            titulo="Disposiciones emitidas"
            valor="14"
            descripcion="Este año"
            icon={<Users size={24} />}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Filtros */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="text-blue-700" size={22} />

              <h2 className="text-xl font-semibold text-slate-800">
                Filtros de estadísticas
              </h2>
            </div>

            <div className="space-y-4">
              <select className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>
                  Filtrar por: todos los meses
                </option>

                <option>Enero</option>
                <option>Febrero</option>
                <option>Marzo</option>
              </select>

              <select className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>
                  Tipo consejero: todos
                </option>

                <option>Docente</option>
                <option>Graduado</option>
                <option>Estudiante</option>
              </select>

              <select className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>
                  Tipo de reunión: todas
                </option>

                <option>Ordinaria</option>
                <option>Extraordinaria</option>
              </select>
            </div>
          </div>

          {/* Asistencia */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-blue-700" size={22} />

              <h2 className="text-xl font-semibold text-slate-800">
                Asistencia por consejero
              </h2>
            </div>

            <div className="space-y-5">
              {asistencia.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-700">
                      {item.nombre}
                    </span>

                    <span className="text-sm font-semibold text-slate-500">
                      {item.porcentaje}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full"
                      style={{
                        width: `${item.valor}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reportes */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Acciones de reporte
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BotonReporte
              icon={<Download size={20} />}
              texto="Reporte consejeros"
            />

            <BotonReporte
              icon={<Download size={20} />}
              texto="Reporte comisiones"
            />

            <BotonReporte
              icon={<Download size={20} />}
              texto="Reporte votaciones"
            />

            <BotonReporte
              icon={<Upload size={20} />}
              texto="Subir a Drive"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const CardEstadistica = ({
  titulo,
  valor,
  descripcion,
  icon,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-slate-500 text-sm">
          {titulo}
        </p>

        <h3 className="text-3xl font-bold text-slate-800 mt-2">
          {valor}
        </h3>

        <p className="text-sm text-slate-400 mt-1">
          {descripcion}
        </p>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
        {icon}
      </div>
    </div>
  );
};

const BotonReporte = ({ icon, texto }) => {
  return (
    <button className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-slate-300 hover:bg-blue-50 hover:border-blue-300 transition text-slate-700 font-medium">
      {icon}
      {texto}
    </button>
  );
};

export default Reporte;