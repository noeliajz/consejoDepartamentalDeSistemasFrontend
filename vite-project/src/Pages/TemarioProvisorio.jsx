// src/pages/TemarioProvisorio.jsx

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import NavbarLateral from "../components/NavbarLateral";

import {
  Plus,
  ClipboardList,
  CalendarDays,
} from "lucide-react";

const TemarioProvisorio = () => {

  // TEMAS
  const [temas, setTemas] = useState([]);

  // FORM
  const [descripcion, setDescripcion] =
    useState("");

  const [categoria, setCategoria] =
    useState("Docente");

  const [despacho, setDespacho] =
    useState("Pendiente");

  const [fechaIngreso, setFechaIngreso] =
    useState("");

  const [fechaTratamiento, setFechaTratamiento] =
    useState("");

  // OBTENER TEMAS
  const obtenerTemas = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/temas"
      );

      setTemas(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  // CREAR
  const crearTema = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:5000/api/temas",
        {
          descripcion,
          categoria,
          despacho,
          fechaIngreso,
          fechaTratamiento
        }
      );

      alert("Tema agregado");

      setDescripcion("");

      obtenerTemas();

    } catch (error) {

      console.error(error);
    }
  };

  // CAMBIAR DESPACHO
  const cambiarEstado = async (
    id,
    nuevoEstado
  ) => {

    try {

      await axios.put(
        `http://127.0.0.1:5000/api/temas/${id}`,
        {
          despacho: nuevoEstado
        }
      );

      obtenerTemas();

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {
    obtenerTemas();
  }, []);

  // STATS
  const totalTemas = temas.length;

  const conDespacho =
    temas.filter(
      (t) => t.despacho === "Despacho"
    ).length;

  return (
    <div className="min-h-screen bg-slate-100">

      <NavbarLateral user={{ role: "admin" }} />

      <main className="ml-64 p-8">

        {/* HEADER */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">

          <h1 className="text-4xl font-bold">
            Temario Provisorio
          </h1>

          <p className="text-slate-500 mt-2">
            Gestión de temas y expedientes
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500">
                  Temas cargados
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {totalTemas}
                </h2>
              </div>

              <ClipboardList />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500">
                  Con despacho
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {conDespacho}
                </h2>
              </div>

              <CalendarDays />
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Agregar tema
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) =>
                setDescripcion(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            />

            <select
              value={categoria}
              onChange={(e) =>
                setCategoria(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            >
              <option>Docente</option>

              <option>Estudiante</option>

              <option>Otros</option>
            </select>

            <input
              type="date"
              value={fechaIngreso}
              onChange={(e) =>
                setFechaIngreso(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="date"
              value={fechaTratamiento}
              onChange={(e) =>
                setFechaTratamiento(
                  e.target.value
                )
              }
              className="border rounded-xl px-4 py-3"
            />

            <select
              value={despacho}
              onChange={(e) =>
                setDespacho(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            >
              <option>Pendiente</option>

              <option>Despacho</option>
            </select>
          </div>

          <button
            onClick={crearTema}
            className="
              mt-6
              bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              flex
              items-center
              gap-2
            "
          >

            <Plus size={18} />

            Agregar tema
          </button>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="grid grid-cols-6 bg-slate-100 p-4 font-semibold">

            <div>Descripción</div>

            <div>Categoría</div>

            <div>Ingreso</div>

            <div>Tratamiento</div>

            <div>Estado</div>

            <div>Acciones</div>
          </div>

          {temas.map((tema) => (

            <div
              key={tema._id}
              className="grid grid-cols-6 p-4 border-b"
            >

              <div>{tema.descripcion}</div>

              <div>{tema.categoria}</div>

              <div>{tema.fechaIngreso}</div>

              <div>{tema.fechaTratamiento}</div>

              <div>

                <span className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  ${
                    tema.despacho === "Despacho"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}>
                  {tema.despacho}
                </span>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    cambiarEstado(
                      tema._id,
                      "Despacho"
                    )
                  }
                  className="
                    bg-green-600
                    text-white
                    px-3
                    py-1
                    rounded-lg
                  "
                >
                  Despacho
                </button>

                <button
                  onClick={() =>
                    cambiarEstado(
                      tema._id,
                      "Pendiente"
                    )
                  }
                  className="
                    bg-yellow-500
                    text-white
                    px-3
                    py-1
                    rounded-lg
                  "
                >
                  Pendiente
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TemarioProvisorio;