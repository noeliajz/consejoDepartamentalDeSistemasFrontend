// src/pages/Acta.jsx

import React, {
  useEffect,
  useState,
} from "react";

import NavbarLateral from "../Components/NavbarLateral";

import {
  Plus,
  Eye,
  Search,
  Bell,
  FileText,
  Trash2,
  Download,
} from "lucide-react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";

const Acta = () => {

  const user = {
    role: "admin",
  };

  const navigate = useNavigate();

  const [actas, setActas] =
    useState([]);

  const [busqueda, setBusqueda] =
    useState("");

  // OBTENER ACTAS
  useEffect(() => {

    obtenerActas();

  }, []);

  const obtenerActas =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/actas-reunion"
          );

        setActas(
          response.data
        );

      } catch (error) {

        console.error(
          "Error obteniendo actas:",
          error
        );

      }
    };

  // ELIMINAR ACTA
  const eliminarActa =
    async (id) => {

      const confirmar =
        window.confirm(
          "¿Desea eliminar esta acta?"
        );

      if (!confirmar) return;

      try {

        await axios.delete(
          `http://localhost:5000/api/actas-reunion/${id}`
        );

        alert(
          "Acta eliminada correctamente"
        );

        obtenerActas();

      } catch (error) {

        console.error(
          "Error eliminando acta:",
          error
        );

        alert(
          "Error eliminando acta"
        );

      }
    };


    // GENERAR PDF
const generarPDF = async (acta) => {
  const doc = new jsPDF();
  const marginLeft = 20;
  let y = 20;

  // DEBUG — quitalo después de confirmar que funciona
  console.log("acta.temas recibidos:", acta.temas);

  // ===== TÍTULO =====
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("ACTA DE REUNIÓN", 105, y, { align: "center" });
  y += 10;
  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);
  y += 15;

  // ===== DATOS =====
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.text(`Fecha: ${acta.fecha || "-"}`, marginLeft, y);
  y += 10;
  doc.text(`Estado: ${acta.estado || "-"}`, marginLeft, y);
  y += 10;
  doc.text(`Cantidad de Consejeros: ${acta.consejeros || 0}`, marginLeft, y);
  y += 15;

  // ===== DESCRIPCIÓN =====
  doc.setFont("times", "bold");
  doc.text("Descripción:", marginLeft, y);
  y += 8;
  doc.setFont("times", "normal");
  const descripcion = doc.splitTextToSize(acta.descripcion || "Sin descripción", 170);
  doc.text(descripcion, marginLeft, y);
  y += descripcion.length * 7 + 15;

  // ===== TEMAS =====
  doc.setFont("times", "bold");
  doc.text("Temas Tratados:", marginLeft, y);
  y += 10;
  doc.setFont("times", "normal");

  if (acta.temas && acta.temas.length > 0) {

    for (const tema of acta.temas) {

      // Salto de página si es necesario
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      // Obtener descripción según el tipo que llegue
      let descripcionTema = "Sin descripción";

      if (typeof tema === "object" && tema !== null) {
        // Backend enriquecido — viene como objeto
        descripcionTema = tema.descripcion || tema.tema || "Sin descripción";
        console.log("Tema como objeto:", descripcionTema);

      } else if (typeof tema === "string") {
        // Fallback — viene como ID string, buscar en backend
        console.log("Tema como string ID:", tema);
        try {
          const res = await axios.get(`http://localhost:5000/api/temas/${tema}`);
          console.log("Respuesta del backend para tema:", res.data);
          descripcionTema = res.data.descripcion || res.data.tema || "Sin descripción";
        } catch (err) {
          console.error("Error buscando tema:", tema, err);
          descripcionTema = `Tema no disponible`;
        }
      }

      const texto = doc.splitTextToSize(`• ${descripcionTema}`, 160);
      doc.text(texto, marginLeft + 5, y);
      y += texto.length * 7 + 5;
    }

  } else {
    doc.text("Sin temas registrados", marginLeft + 5, y);
    y += 10;
  }

  // ===== FIRMAS =====
  y += 15;
  if (y > 250) { doc.addPage(); y = 20; }
  doc.line(20, y, 190, y);
  y += 20;
  doc.text("Firma Director/a", 35, y);
  doc.text("Firma Secretario/a", 130, y);
  y += 5;
  doc.line(20, y, 80, y);
  doc.line(110, y, 170, y);

  // ===== FOOTER =====
  doc.setFontSize(10);
  doc.text("Consejo Departamental - Ingeniería en Sistemas", 105, 285, { align: "center" });

  doc.save(`Acta_${acta._id}.pdf`);
};
  // FILTRO BUSQUEDA
  const actasFiltradas =
    actas.filter((acta) =>
      (
        acta.descripcion || ""
      )
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
    );

  // CONTADORES
  const totalActas =
    actas.length;

  const aprobadas =
    actas.filter(
      (a) =>
        a.estado ===
        "Aprobada"
    ).length;

  const pendientes =
    actas.filter(
      (a) =>
        a.estado ===
        "Pendiente"
    ).length;

  return (

    <div className="
      flex
      bg-slate-100
      min-h-screen
    ">

      {/* NAVBAR */}
      <NavbarLateral user={user} />

      {/* CONTENIDO */}
      <main className="
        flex-1
        ml-64
        p-8
      ">

        {/* HEADER */}
        <div className="
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
        ">

          <div>

            <h1 className="
              text-3xl
              font-bold
              text-slate-800
            ">
              Gestión de Actas
            </h1>

            <p className="
              text-slate-500
              mt-1
            ">
              Administración de actas
            </p>

          </div>

          <div className="
            flex
            items-center
            gap-4
          ">

            {/* NOTIFICAR */}
            <button className="
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
            ">

              <Bell size={18} />

              Notificar reunión

            </button>

            {/* NUEVA ACTA */}
            <button
              onClick={() =>
                navigate(
                  "/NuevaActa"
                )
              }
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-blue-700
                hover:bg-blue-800
                text-white
                shadow-md
                transition
              "
            >

              <Plus size={18} />

              Nueva acta

            </button>

          </div>

        </div>

        {/* CARDS */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-8
        ">

          <CardResumen
            titulo="Total Actas"
            valor={totalActas}
            icon={
              <FileText size={24} />
            }
          />

          <CardResumen
            titulo="Aprobadas"
            valor={aprobadas}
            icon={
              <Eye size={24} />
            }
          />

          <CardResumen
            titulo="Pendientes"
            valor={pendientes}
            icon={
              <FileText size={24} />
            }
          />

        </div>

        {/* TABLA */}
        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-slate-200
          p-6
        ">

          {/* TOP */}
          <div className="
            flex
            items-center
            justify-between
            mb-6
          ">

            <div>

              <h2 className="
                text-xl
                font-semibold
                text-slate-800
              ">
                Actas registradas
              </h2>

              <p className="
                text-slate-500
                text-sm
                mt-1
              ">
                Listado completo de actas
              </p>

            </div>

            {/* BUSCADOR */}
            <div className="
              relative
            ">

              <Search
                size={18}
                className="
                  absolute
                  left-3
                  top-3
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Buscar acta..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
                className="
                  pl-10
                  pr-4
                  py-2
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

          {/* TABLA */}
          <div className="
            overflow-x-auto
          ">

            <table className="
              w-full
              border-collapse
            ">

              <thead>

                <tr className="
                  border-b
                  border-slate-200
                  text-slate-500
                  text-sm
                ">

                  <th className="
                    text-left
                    py-4
                  ">
                    Fecha de Ingreso
                  </th>

                  <th className="
                    text-left
                    py-4
                  ">
                    Descripción
                  </th>

                  <th className="
                    text-left
                    py-4
                  ">
                    Cantidad de consejeros
                  </th>

                  <th className="
                    text-left
                    py-4
                  ">
                    Estado
                  </th>

                  <th className="
                    text-left
                    py-4
                  ">
                    Acciones
                  </th>

                </tr>

              </thead>

              <tbody>

                {actasFiltradas.length > 0 ? (

                  actasFiltradas.map(
                    (acta) => (

                      <tr
                        key={
                          acta._id
                        }
                        className="
                          border-b
                          border-slate-100
                          hover:bg-slate-50
                          transition
                        "
                      >

                        <td className="
                          py-5
                          text-slate-600
                        ">
                          {
                            acta.fecha ||
                            "-"
                          }
                        </td>

                        <td className="
                          py-5
                          text-slate-600
                          max-w-sm
                        ">
                          {
                            acta.descripcion ||
                            "-"
                          }
                        </td>

                        <td className="
                          py-5
                          text-slate-600
                        ">
                          {
                            acta.consejeros ||
                            0
                          }
                        </td>

                        <td className="
                          py-5
                        ">

                          <EstadoBadge
                            estado={
                              acta.estado ||
                              "Pendiente"
                            }
                          />

                        </td>

                        <td className="
                          py-5
                        ">

                          <div className="
                            flex
                            items-center
                            gap-3
                            flex-wrap
                          ">

                            <button
                              onClick={() =>
                                navigate(
                                  `/EditarActa/${acta._id}`
                                )
                              }
                              className="
                                rounded-lg
                                border
                                border-yellow-200
                                bg-yellow-50
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-yellow-700
                                hover:bg-yellow-100
                                transition
                              "
                            >
                              Editar
                            </button>

                            <button
                              onClick={() =>
                                generarPDF(
                                  acta
                                )
                              }
                              className="
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-blue-200
                                bg-blue-50
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-blue-700
                                hover:bg-blue-100
                                transition
                              "
                            >

                              <Download
                                size={16}
                              />

                              PDF

                            </button>

                            <button
                              onClick={() =>
                                eliminarActa(
                                  acta._id
                                )
                              }
                              className="
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-red-700
                                hover:bg-red-100
                                transition
                              "
                            >

                              <Trash2
                                size={16}
                              />

                              Eliminar

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="
                        text-center
                        py-10
                        text-slate-500
                      "
                    >
                      No se encontraron actas
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
};

// CARD
const CardResumen = ({
  titulo,
  valor,
  icon,
}) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      shadow-sm
      p-6
      flex
      items-center
      justify-between
      hover:shadow-md
      transition
    ">

      <div>

        <p className="
          text-slate-500
          text-sm
        ">
          {titulo}
        </p>

        <h3 className="
          text-3xl
          font-bold
          text-slate-800
          mt-2
        ">
          {valor}
        </h3>

      </div>

      <div className="
        w-14
        h-14
        rounded-2xl
        bg-blue-100
        flex
        items-center
        justify-center
        text-blue-700
      ">
        {icon}
      </div>

    </div>
  );
};

// BADGE
const EstadoBadge = ({
  estado,
}) => {

  const colores = {

    Aprobada:
      "bg-green-100 text-green-700",

    Pendiente:
      "bg-yellow-100 text-yellow-700",

    "En revisión":
      "bg-blue-100 text-blue-700",
  };

  return (

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${
          colores[
            estado
          ] ||
          "bg-gray-100 text-gray-700"
        }
      `}
    >
      {estado}
    </span>

  );
};

export default Acta;