// Dashboard.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import NavbarLateral from "../Components/NavbarLateral";

import {
  Folder,
  Users,
 FileText,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";

const API = "http://localhost:5000/api";

const Dashboard = () => {

  const [dashboard, setDashboard] = useState({
    expedientesActivos: 0,
    expedientesSemana: 0,
    proximaReunion: null,
    consejerosActivos: 0,
    consejerosLicencia: 0,
    actasPendientes: 0,
    expedientesRecientes: [],
    estadosExpedientes: [],
    ordenDia: [],
    votaciones: [],
    alertas: [],
  });

  const [user, setUser] = useState(null);

  useEffect(() => {

    const usuario =
      JSON.parse(localStorage.getItem("user"));

    setUser(usuario);

    obtenerDashboard();

  }, []);

  const obtenerDashboard = async () => {

    try {

      const res = await axios.get(
        `${API}/dashboard`
      );

      setDashboard(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const porcentajeBarra = (
    valor,
    total
  ) => {

    if (!total || total === 0) {
      return "0%";
    }

    return `${(valor / total) * 100}%`;
  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <NavbarLateral user={{ role: "admin" }} />

      <div className="flex-1 ml-64 p-6">

        {/* ALERTAS */}

        {dashboard.alertas?.map(
          (alerta, index) => (

            <div
              key={index}
              className="bg-orange-100 border border-orange-400 text-orange-800 px-4 py-3 rounded-xl mb-5 flex items-center gap-2"
            >

              <AlertTriangle size={18} />

              <span>
                {alerta.mensaje}
              </span>

            </div>
          )
        )}

        {/* TARJETAS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

          <CardDashboard
            titulo="Expedientes activos"
            valor={
              dashboard.expedientesActivos
            }
            subtitulo={`${dashboard.expedientesSemana} ingresados esta semana`}
            color="text-blue-700"
            icono={<Folder />}
          />

          <CardDashboard
            titulo="Próxima reunión"
            valor={
              dashboard.proximaReunion
                ?.fecha || "Sin fecha"
            }
            subtitulo={`${dashboard.proximaReunion?.realizadas || 0} realizadas`}
            color="text-orange-600"
            icono={<CalendarDays />}
          />

          <CardDashboard
            titulo="Consejeros activos"
            valor={
              dashboard.consejerosActivos
            }
            subtitulo={`${dashboard.consejerosLicencia} con licencia`}
            color="text-green-700"
            icono={<Users />}
          />

          <CardDashboard
            titulo="Actas pendientes"
            valor={
              dashboard.actasPendientes
            }
            subtitulo="Sin aprobar"
            color="text-red-600"
            icono={<FileText />}
          />

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* EXPEDIENTES */}

          <div className="bg-white rounded-2xl shadow-sm border p-5">

            <div className="flex justify-between items-center mb-4">

              <h2 className="font-semibold text-gray-800">
                Expedientes recientes
              </h2>

              <Link
                to="/Expediente"
                className="text-blue-700 text-sm hover:underline"
              >
                Ver todos
              </Link>

            </div>

            <div className="space-y-3">

              {dashboard.expedientesRecientes?.length > 0 ? (

                dashboard.expedientesRecientes.map(
                  (exp) => (

                    <div
                      key={exp._id}
                      className="flex justify-between items-center border-b pb-2"
                    >

                      <div>

                        <p className="font-medium text-gray-700">
                          {exp.numero}
                        </p>

                        <p className="text-sm text-gray-500">
                          {exp.categoria}
                        </p>

                      </div>

                      <EstadoBadge
                        estado={exp.estado}
                      />

                    </div>
                  )
                )

              ) : (

                <p className="text-gray-500 text-sm">
                  No hay expedientes recientes
                </p>

              )}

            </div>

          </div>

          {/* ESTADOS */}

          <div className="bg-white rounded-2xl shadow-sm border p-5">

            <h2 className="font-semibold text-gray-800 mb-5">
              Estado de expedientes
            </h2>

            <div className="space-y-4">

              {dashboard.estadosExpedientes?.map(
                (estado, index) => (

                  <div key={index}>

                    <div className="flex justify-between text-sm mb-1">

                      <span>
                        {estado.nombre}
                      </span>

                      <span>
                        {estado.cantidad}
                      </span>

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">

                      <div
                        className={`h-2 rounded-full ${estado.color}`}
                        style={{
                          width:
                            porcentajeBarra(
                              estado.cantidad,
                              estado.total
                            ),
                        }}
                      />

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* ORDEN DEL DIA */}

          <div className="bg-white rounded-2xl shadow-sm border p-5">

            <div className="flex justify-between items-center mb-5">

              <h2 className="font-semibold text-gray-800">
                Orden del día
              </h2>

              <Link
                to="/TemarioProvisorio"
                className="text-blue-700 text-sm hover:underline"
              >
                Ver todos
              </Link>

            </div>

            <div className="space-y-4">

              {dashboard.ordenDia?.length > 0 ? (

                dashboard.ordenDia
                  .filter(
                    (item) =>
                      item.estado ===
                      "Despacho"
                  )
                  .map((item, index) => (

                    <div
                      key={item._id}
                      className="border rounded-xl p-4 flex justify-between items-center hover:shadow-sm transition"
                    >

                      <div className="flex gap-4">

                        <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>

                        <div>

                          <p className="font-medium text-gray-800">
                            {item.numero}
                          </p>

                          <p className="text-sm text-gray-500">
                            {item.categoria}
                          </p>

                        </div>

                      </div>

                      <EstadoBadge
                        estado={item.estado}
                      />

                    </div>
                  ))

              ) : (

                <p className="text-gray-500 text-sm">
                  No hay temas en despacho
                </p>

              )}

            </div>

          </div>

          {/* VOTACIONES */}

          <div className="bg-white rounded-2xl shadow-sm border p-5">

            <h2 className="font-semibold text-gray-800 mb-5">
              Últimas votaciones
            </h2>

            <div className="space-y-5">

              {dashboard.votaciones?.length > 0 ? (

                dashboard.votaciones.map(
                  (votacion) => (

                    <div
                      key={votacion._id}
                      className="border rounded-xl p-4"
                    >

                      <p className="font-medium text-gray-800 mb-3">
                        {votacion.tema}
                      </p>

                      <div className="flex gap-4 text-sm mb-3">

                        <span className="text-green-700">
                          A favor:
                          {" "}
                          {votacion.favor}
                        </span>

                        <span className="text-red-600">
                          En contra:
                          {" "}
                          {votacion.contra}
                        </span>

                        <span className="text-gray-600">
                          Abstención:
                          {" "}
                          {votacion.abstencion}
                        </span>

                      </div>

                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">

                        <div
                          className="bg-green-600"
                          style={{
                            width:
                              porcentajeBarra(
                                votacion.favor,
                                votacion.total
                              ),
                          }}
                        />

                        <div
                          className="bg-red-500"
                          style={{
                            width:
                              porcentajeBarra(
                                votacion.contra,
                                votacion.total
                              ),
                          }}
                        />

                        <div
                          className="bg-gray-500"
                          style={{
                            width:
                              porcentajeBarra(
                                votacion.abstencion,
                                votacion.total
                              ),
                          }}
                        />

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {votacion.resultado}
                      </p>

                    </div>
                  )
                )

              ) : (

                <p className="text-gray-500 text-sm">
                  No hay votaciones registradas
                </p>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

const CardDashboard = ({
  titulo,
  valor,
  subtitulo,
  color,
  icono,
}) => {

  return (

    <div className="bg-white rounded-2xl shadow-sm border p-5">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm text-gray-500 mb-2">
            {titulo}
          </p>

          <h2 className={`text-3xl font-bold ${color}`}>
            {valor}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            {subtitulo}
          </p>

        </div>

        <div className="bg-gray-100 p-3 rounded-xl text-gray-700">
          {icono}
        </div>

      </div>

    </div>
  );
};

const EstadoBadge = ({
  estado,
}) => {

  const colores = {

    Ingresado:
      "bg-blue-100 text-blue-700",

    Comisión:
      "bg-purple-100 text-purple-700",

    Despacho:
      "bg-yellow-100 text-yellow-700",

    Aprobado:
      "bg-green-100 text-green-700",

    Rechazado:
      "bg-red-100 text-red-700",
  };

  return (

    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colores[estado] ||
        "bg-gray-100 text-gray-700"
      }`}
    >

      {estado}

    </span>
  );
};

export default Dashboard;