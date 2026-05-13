
import { useState } from "react";
import NavbarLateral from "../components/NavbarLateral";

const CONSEJEROS = [
  {
    id: 1,
    nombre: "Roberto López",
    rol: "Profesor · Titular",
    iniciales: "RL",
  },
  {
    id: 2,
    nombre: "Ana Martínez",
    rol: "Graduado · Claustro",
    iniciales: "AM",
  },
  {
    id: 3,
    nombre: "Pedro González",
    rol: "Ausente",
    iniciales: "PG",
    ausente: true,
  },
  {
    id: 4,
    nombre: "Laura Herrera",
    rol: "Estudiante · Claustro",
    iniciales: "LH",
  },
  {
    id: 5,
    nombre: "Martín Rodríguez",
    rol: "Profesor · Titular",
    iniciales: "MR",
  },
  {
    id: 6,
    nombre: "Sofía Vázquez",
    rol: "Graduado · Claustro",
    iniciales: "SV",
  },
];

export default function Votacion() {

  // consejero seleccionado
  const [seleccionado, setSeleccionado] = useState(null);

  // votos actuales
  const [votos, setVotos] = useState({});

  // historial de votaciones guardadas
  const [historial, setHistorial] = useState([]);

  // ─────────────────────────────────────────────
  // seleccionar consejero
  // ─────────────────────────────────────────────

  const seleccionarConsejero = (consejero) => {

    if (consejero.ausente) return;

    setSeleccionado(consejero.id);
  };

  // ─────────────────────────────────────────────
  // votar
  // ─────────────────────────────────────────────

  const votar = (tipo) => {

    if (!seleccionado) return;

    setVotos((prev) => ({
      ...prev,
      [seleccionado]: tipo,
    }));

    // limpiar selección
    setSeleccionado(null);
  };

  // ─────────────────────────────────────────────
  // quitar voto
  // ─────────────────────────────────────────────

  const quitarVoto = () => {

    if (!seleccionado) return;

    setVotos((prev) => {

      const copia = { ...prev };

      delete copia[seleccionado];

      return copia;
    });

    setSeleccionado(null);
  };

  // ─────────────────────────────────────────────
  // conteos
  // ─────────────────────────────────────────────

  const aFavor =
    Object.values(votos).filter(
      v => v === "favor"
    ).length;

  const enContra =
    Object.values(votos).filter(
      v => v === "contra"
    ).length;

  const abstencion =
    Object.values(votos).filter(
      v => v === "abstencion"
    ).length;

  const botonesActivos =
    seleccionado !== null;

  // ─────────────────────────────────────────────
  // guardar votación
  // ─────────────────────────────────────────────

  const guardarVotacion = () => {

    const nueva = {
      fecha: new Date().toLocaleString(),
      votos: { ...votos },
      aFavor,
      enContra,
      abstencion,
    };

    setHistorial((prev) => [
      ...prev,
      nueva,
    ]);

    alert("Votación guardada correctamente");
  };

  // ─────────────────────────────────────────────
  // eliminar historial
  // ─────────────────────────────────────────────

  const eliminarHistorial = (index) => {

    const confirmar =
      window.confirm(
        "¿Eliminar esta votación?"
      );

    if (!confirmar) return;

    setHistorial((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >

      {/* MENU */}

      <NavbarLateral user={{ role: "admin" }} />

      {/* CONTENIDO */}

      <div
        style={{
          flex: 1,
          marginLeft: 260,
          padding: 40,
          fontFamily: "Arial",
        }}
      >

        {/* TITULO */}

        <h1
          style={{
            marginBottom: 30,
          }}
        >
          Punto 1 · Aprobación acta sesión 05/2025
        </h1>

        {/* MÉTRICAS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 20,
            marginBottom: 40,
          }}
        >

          <Card
            numero={CONSEJEROS.length}
            texto="Consejeros"
            color="#1d4ed8"
          />

          <Card
            numero={aFavor}
            texto="A favor"
            color="#15803d"
          />

          <Card
            numero={enContra}
            texto="En contra"
            color="#dc2626"
          />

          <Card
            numero={abstencion}
            texto="Abstención"
            color="#ca8a04"
          />

        </div>

        {/* SUBTITULO */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >

          <h2>
            Seleccioná un consejero y registrá su voto
          </h2>

          <div
            style={{
              background: "#dbeafe",
              color: "#1d4ed8",
              padding: "8px 16px",
              borderRadius: 999,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            Votación abierta
          </div>

        </div>

        {/* CONSEJEROS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(260px,1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >

          {CONSEJEROS.map((c) => {

            const estaSeleccionado =
              seleccionado === c.id;

            const voto =
              votos[c.id];

            let background = "#fff";
            let border = "2px solid #ddd";

            if (estaSeleccionado) {
              border = "2px solid #2563eb";
              background = "#eff6ff";
            }

            if (voto === "favor") {
              background = "#dcfce7";
              border = "2px solid #16a34a";
            }

            if (voto === "contra") {
              background = "#fee2e2";
              border = "2px solid #dc2626";
            }

            if (voto === "abstencion") {
              background = "#fef9c3";
              border = "2px solid #ca8a04";
            }

            return (
              <button
                key={c.id}
                onClick={() =>
                  seleccionarConsejero(c)
                }
                disabled={c.ausente}
                style={{
                  border,
                  background,
                  borderRadius: 20,
                  padding: 20,
                  cursor: c.ausente
                    ? "not-allowed"
                    : "pointer",

                  opacity:
                    c.ausente ? 0.5 : 1,

                  textAlign: "left",

                  transition: "0.2s",

                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                }}
              >

                {/* AVATAR */}

                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {c.iniciales}
                </div>

                {/* DATOS */}

                <div>

                  <div
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {c.nombre}
                  </div>

                  <div
                    style={{
                      color: "#666",
                      fontSize: 14,
                    }}
                  >
                    {c.rol}
                  </div>

                  {voto && (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      Voto: {voto}
                    </div>
                  )}

                </div>

              </button>
            );
          })}
        </div>

        {/* PANEL DE VOTACIÓN */}

        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 25,
            border: "1px solid #ddd",
            marginBottom: 40,
          }}
        >

          <div
            style={{
              marginBottom: 20,
              fontSize: 18,
            }}
          >

            {seleccionado
              ? (
                <>
                  Votando:
                  <strong>
                    {" "}
                    {
                      CONSEJEROS.find(
                        c =>
                          c.id === seleccionado
                      )?.nombre
                    }
                  </strong>
                </>
              )
              : "Seleccioná un consejero"}

          </div>

          {/* BOTONES */}

          <div
            style={{
              display: "flex",
              gap: 15,
              flexWrap: "wrap",
            }}
          >

            <button
              disabled={!botonesActivos}
              onClick={() =>
                votar("favor")
              }
              style={botonVoto(
                "#dcfce7",
                "#166534",
                botonesActivos
              )}
            >
              A favor
            </button>

            <button
              disabled={!botonesActivos}
              onClick={() =>
                votar("contra")
              }
              style={botonVoto(
                "#fee2e2",
                "#991b1b",
                botonesActivos
              )}
            >
              En contra
            </button>

            <button
              disabled={!botonesActivos}
              onClick={() =>
                votar("abstencion")
              }
              style={botonVoto(
                "#fef9c3",
                "#854d0e",
                botonesActivos
              )}
            >
              Abstención
            </button>

            <button
              disabled={!botonesActivos}
              onClick={quitarVoto}
              style={botonVoto(
                "#f3f4f6",
                "#374151",
                botonesActivos
              )}
            >
              Quitar voto
            </button>

            {/* GUARDAR */}

            <button
              onClick={guardarVotacion}
              style={{
                border: "none",
                borderRadius: 12,
                padding: "14px 22px",
                background: "#2563eb",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              Guardar votación
            </button>

          </div>

        </div>

        {/* HISTORIAL */}

        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 25,
            border: "1px solid #ddd",
          }}
        >

          <h2
            style={{
              marginBottom: 20,
            }}
          >
            Historial de votaciones
          </h2>

          {historial.length === 0 && (

            <p
              style={{
                color: "#777",
              }}
            >
              No hay votaciones guardadas.
            </p>

          )}

          {historial.map((item, index) => (

            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: 15,
                padding: 20,
                marginBottom: 15,
                background: "#fafafa",
              }}
            >

              {/* HEADER */}

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >

                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Votación #{index + 1}
                </div>

                {/* ELIMINAR */}

                <button
                  onClick={() =>
                    eliminarHistorial(index)
                  }
                  style={{
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 16px",
                    background: "#dc2626",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  Eliminar
                </button>

              </div>

              {/* FECHA */}

              <div
                style={{
                  marginBottom: 8,
                  color: "#666",
                  fontSize: 14,
                }}
              >
                {item.fecha}
              </div>

              {/* RESULTADOS */}

              <div
                style={{
                  display: "flex",
                  gap: 20,
                  flexWrap: "wrap",
                }}
              >

                <span
                  style={{
                    color: "#15803d",
                  }}
                >
                  A favor: {item.aFavor}
                </span>

                <span
                  style={{
                    color: "#dc2626",
                  }}
                >
                  En contra: {item.enContra}
                </span>

                <span
                  style={{
                    color: "#ca8a04",
                  }}
                >
                  Abstención: {item.abstencion}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTES
// ─────────────────────────────────────────────

function Card({
  numero,
  texto,
  color,
}) {

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 30,
        textAlign: "center",
        border: "1px solid #ddd",
      }}
    >

      <div
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color,
        }}
      >
        {numero}
      </div>

      <div
        style={{
          marginTop: 10,
          color: "#666",
        }}
      >
        {texto}
      </div>

    </div>
  );
}

function botonVoto(
  background,
  color,
  activo
) {

  return {
    border: "none",
    borderRadius: 12,
    padding: "14px 22px",

    background: activo
      ? background
      : "#e5e7eb",

    color: activo
      ? color
      : "#999",

    fontWeight: "bold",

    cursor: activo
      ? "pointer"
      : "not-allowed",

    transition: "0.2s",
  };
}

