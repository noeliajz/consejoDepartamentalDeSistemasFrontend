// src/pages/Comision.jsx

import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import NavbarLateral from "../components/NavbarLateral";

import {
  Bell,
  Plus,
  Users,
  FileText,
  ClipboardList,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Comision = () => {

  const navigate = useNavigate();

  // STATES
  const [comisiones, setComisiones] =
    useState([]);

  const [usuarios, setUsuarios] =
    useState([]);

  const [reuniones, setReuniones] =
    useState([]);

  const [asistencias, setAsistencias] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // REUNION SELECCIONADA
  const [
    reunionSeleccionada,
    setReunionSeleccionada
  ] = useState("");

  // OBTENER DATOS
  const obtenerDatos = async () => {

    try {

      setLoading(true);

      const [
        comisionesRes,
        usuariosRes,
        reunionesRes,
        asistenciasRes
      ] = await Promise.all([
        axios.get(
          "http://127.0.0.1:5000/api/comisiones"
        ),
        axios.get(
          "http://127.0.0.1:5000/api/usuarios"
        ),
        axios.get(
          "http://127.0.0.1:5000/api/reuniones"
        ),
        axios.get(
          "http://127.0.0.1:5000/api/asistencias"
        ),
      ]);

      setComisiones(comisionesRes.data);

      setUsuarios(usuariosRes.data);

      setReuniones(reunionesRes.data);

      setAsistencias(asistenciasRes.data);

      // seleccionar primera reunión
      if (
        reunionesRes.data.length > 0
      ) {

        setReunionSeleccionada(
          reunionesRes.data[0]._id
        );
      }

    } catch (error) {

      console.error(error);

      alert(
        "Error al obtener datos"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    obtenerDatos();

  }, []);

  // GUARDAR ASISTENCIA
  const guardarAsistencia = async (
    usuarioId,
    reunionId,
    estado
  ) => {

    if (!reunionId) {

      alert(
        "Selecciona una reunión"
      );

      return;
    }

    try {

      // VALIDAR SI YA EXISTE
      const asistenciaExistente =
        asistencias.find(
          (a) =>
            a.usuarioId ===
              usuarioId &&
            a.reunionId ===
              reunionId
        );

      // SI EXISTE -> UPDATE
      if (asistenciaExistente) {

        await axios.put(
          `http://127.0.0.1:5000/api/asistencias/${asistenciaExistente._id}`,
          {
            estado,
            fecha: new Date(),
            licencia: "No"
          }
        );

      } else {

        // SI NO EXISTE -> CREATE
        await axios.post(
          "http://127.0.0.1:5000/api/asistencias",
          {
            usuarioId,
            reunionId,
            estado,
            fecha: new Date(),
            licencia: "No"
          }
        );
      }

      obtenerDatos();

    } catch (error) {

      console.error(error);

      alert(
        "Error al guardar asistencia"
      );
    }
  };

  // CONTAR PRESENTES
  const obtenerPresentes = (
    reunionId
  ) => {

    return asistencias.filter(
      (a) =>
        a.reunionId ===
          reunionId &&
        a.estado ===
          "Presente"
    ).length;
  };

  // TOTAL USUARIOS
  const totalUsuarios =
    usuarios.length;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <NavbarLateral
        user={{ role: "admin" }}
      />

      {/* MAIN */}
      <main className="ml-64 p-8">

        {/* HEADER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Comisiones
            </h1>

            <p className="text-slate-500 mt-1">
              Gestión de asistencia y
              seguimiento de reuniones
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition">

              <Bell size={18} />

              Notificar reunión
            </button>

            <button
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
            >

              <Plus size={18} />

              Nueva asignación
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          {/* COMISIONES */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Comisiones activas
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {comisiones.length}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Registradas
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">

                <Users size={24} />
              </div>
            </div>
          </div>

          {/* USUARIOS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Integrantes
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {usuarios.length}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Usuarios registrados
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">

                <ClipboardList size={24} />
              </div>
            </div>
          </div>

          {/* REUNIONES */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Reuniones
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {reuniones.length}
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Registradas
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">

                <FileText size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* TABLA REUNIONES */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">

          <div className="px-6 py-5 border-b border-slate-200">

            <h2 className="text-xl font-semibold text-slate-800">
              Reuniones y asistencia
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Control de reuniones
            </p>
          </div>

          {/* SCROLL */}
          <div className="overflow-x-auto">

            <div className="min-w-[1200px]">

              {/* HEADERS */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase">

                <div className="col-span-2">
                  Sesión
                </div>

                <div className="col-span-2">
                  Fecha
                </div>

                <div className="col-span-2">
                  Tipo
                </div>

                <div className="col-span-2">
                  Estado
                </div>

                <div className="col-span-2">
                  Asistencia
                </div>

                <div className="col-span-2">
                  Acción
                </div>
              </div>

              {/* FILAS */}
              {reuniones.map(
                (reunion) => (

                  <div
                    key={reunion._id}
                    className="grid grid-cols-12 gap-4 px-6 py-5 items-center border-b border-slate-100"
                  >

                    <div className="col-span-2 font-semibold">
                      {
                        reunion.sesion
                      }
                    </div>

                    <div className="col-span-2">
                      {reunion.fecha}
                    </div>

                    <div className="col-span-2">
                      {reunion.tipo}
                    </div>

                    <div className="col-span-2">
                      {reunion.estado}
                    </div>

                    <div className="col-span-2">

                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">

                        {
                          obtenerPresentes(
                            reunion._id
                          )
                        }
                        {" / "}
                        {
                          totalUsuarios
                        }
                      </span>
                    </div>

                    <div className="col-span-2">

                      <button
                        onClick={() =>
                          setReunionSeleccionada(
                            reunion._id
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm"
                      >
                        Seleccionar
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* REGISTRAR ASISTENCIA */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200">

            <h2 className="text-xl font-semibold text-slate-800">
              Registrar asistencia
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Marcar presentes y
              ausentes
            </p>

            {/* SELECT */}
            <div className="mt-4">

              <select
                value={
                  reunionSeleccionada
                }
                onChange={(e) =>
                  setReunionSeleccionada(
                    e.target.value
                  )
                }
                className="border rounded-xl px-4 py-3"
              >

                {reuniones.map(
                  (r) => (

                    <option
                      key={r._id}
                      value={r._id}
                    >
                      {
                        r.sesion
                      }{" "}
                      -{" "}
                      {
                        r.fecha
                      }
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* SCROLL */}
          <div className="overflow-x-auto">

            <div className="min-w-[1300px]">

              {/* HEADERS */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase">

                <div className="col-span-3">
                  Usuario
                </div>

                <div className="col-span-2">
                  Claustro
                </div>

                <div className="col-span-2">
                  Rol
                </div>

                <div className="col-span-2">
                  Estado
                </div>

                <div className="col-span-3">
                  Acciones
                </div>
              </div>

              {/* FILAS */}
              {usuarios.map(
                (usuario) => {

                  const asistenciaUsuario =
                    asistencias.find(
                      (a) =>
                        a.usuarioId ===
                          usuario._id &&
                        a.reunionId ===
                          reunionSeleccionada
                    );

                  return (

                    <div
                      key={usuario._id}
                      className="grid grid-cols-12 gap-4 px-6 py-5 items-center border-b border-slate-100"
                    >

                      {/* NOMBRE */}
                      <div className="col-span-3 font-medium text-slate-800">

                        {
                          usuario.nombre
                        }{" "}
                        {
                          usuario.apellido
                        }
                      </div>

                      {/* CLAUSTRO */}
                      <div className="col-span-2 text-slate-600">

                        {
                          usuario.claustro
                        }
                      </div>

                      {/* ROL */}
                      <div className="col-span-2 text-slate-600">

                        {
                          usuario.rol
                        }
                      </div>

                      {/* ESTADO */}
                      <div className="col-span-2">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${
                              asistenciaUsuario?.estado ===
                              "Presente"
                                ? "bg-green-100 text-green-700"
                                : asistenciaUsuario?.estado ===
                                  "Ausente"
                                ? "bg-red-100 text-red-700"
                                : "bg-slate-100 text-slate-700"
                            }
                          `}
                        >

                          {
                            asistenciaUsuario?.estado ||
                            "Sin registrar"
                          }
                        </span>
                      </div>

                      {/* BOTONES */}
                      <div className="col-span-3 flex gap-3">

                        <button
                          onClick={() =>
                            guardarAsistencia(
                              usuario._id,
                              reunionSeleccionada,
                              "Presente"
                            )
                          }
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm"
                        >

                          <CheckCircle size={16} />

                          Presente
                        </button>

                        <button
                          onClick={() =>
                            guardarAsistencia(
                              usuario._id,
                              reunionSeleccionada,
                              "Ausente"
                            )
                          }
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm"
                        >

                          <XCircle size={16} />

                          Ausente
                        </button>
                      </div>
                    </div>
                  );
                }
              )}

              {/* VACIO */}
              {!loading &&
                usuarios.length ===
                  0 && (

                  <div className="p-10 text-center text-slate-500">

                    No hay usuarios
                    registrados
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Comision;