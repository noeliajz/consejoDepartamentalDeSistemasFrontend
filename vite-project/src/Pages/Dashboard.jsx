// Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavbarHorizontalAdmin from "../Components/NavbarHorizontalAdmin";

const API = "http://localhost:5000/api";

// ─── Íconos ───────────────────────────────────────────────────────────────────

const Ico = ({ children, className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);
const IcoFolder = ({ c = "w-5 h-5" }) => (
  <Ico className={c}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </Ico>
);
const IcoCalendar = ({ c = "w-5 h-5" }) => (
  <Ico className={c}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Ico>
);
const IcoUsers = ({ c = "w-5 h-5" }) => (
  <Ico className={c}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </Ico>
);
const IcoFileText = ({ c = "w-5 h-5" }) => (
  <Ico className={c}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </Ico>
);
const IcoAlert = ({ c = "w-4 h-4" }) => (
  <Ico className={c}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Ico>
);
const IcoArrow = ({ c = "w-3.5 h-3.5" }) => (
  <Ico className={c}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Ico>
);
const IcoPlus = ({ c = "w-4 h-4" }) => (
  <Ico className={c}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Ico>
);
const IcoX = ({ c = "w-4 h-4" }) => (
  <Ico className={c}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Ico>
);

// ─── Alerta con botón de cierre ───────────────────────────────────────────────
// Las alertas NO están hardcodeadas: vienen de GET /api/dashboard → data.alertas
// Cada alerta: { mensaje: string, tipo: "warning" | "error" | "info" }
// Se cierran localmente hasta la próxima recarga

const ALERTA_STYLES = {
  warning: {
    wrap: "bg-amber-50  border-amber-300  text-amber-800",
    icon: "text-amber-500",
    close: "text-amber-400 hover:text-amber-700 hover:bg-amber-100",
  },
  error: {
    wrap: "bg-red-50    border-red-300    text-red-800",
    icon: "text-red-400",
    close: "text-red-400   hover:text-red-700   hover:bg-red-100",
  },
  info: {
    wrap: "bg-blue-50   border-blue-200   text-blue-800",
    icon: "text-blue-400",
    close: "text-blue-300  hover:text-blue-700  hover:bg-blue-100",
  },
};

function AlertaBanner({ mensaje, tipo = "warning", onClose }) {
  const s = ALERTA_STYLES[tipo] ?? ALERTA_STYLES.warning;
  return (
    <div
      className={`flex items-start gap-3 border rounded-xl px-4 py-3 ${s.wrap}`}
    >
      <IcoAlert c={`w-4 h-4 flex-shrink-0 mt-0.5 ${s.icon}`} />
      <span className="flex-1 text-sm leading-snug">{mensaje}</span>
      <button
        onClick={onClose}
        aria-label="Cerrar alerta"
        className={`flex-shrink-0 p-1 rounded-lg transition-colors ${s.close}`}
      >
        <IcoX c="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Badge estado ─────────────────────────────────────────────────────────────

const ESTADO_COLORS = {
  Ingresado: "bg-blue-100 text-blue-700",
  Comisión: "bg-purple-100 text-purple-700",
  Despacho: "bg-amber-100 text-amber-700",
  Aprobado: "bg-green-100 text-green-700",
  Rechazado: "bg-red-100 text-red-700",
};
function EstadoBadge({ estado }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px]
                      font-semibold whitespace-nowrap
                      ${ESTADO_COLORS[estado] ?? "bg-slate-100 text-slate-600"}`}
    >
      {estado}
    </span>
  );
}

// ─── Tarjeta métrica ──────────────────────────────────────────────────────────

function StatCard({ titulo, valor, subtitulo, iconBg, icon }) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5
                    flex items-start justify-between gap-3
                    hover:shadow-md transition-shadow duration-200"
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500 font-medium mb-1 leading-tight">
          {titulo}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a3a6b] leading-none truncate">
          {valor ?? "—"}
        </h2>
        <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">
          {subtitulo}
        </p>
      </div>
      <div
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center
                       justify-center flex-shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
}

// ─── Modal nuevo expediente ───────────────────────────────────────────────────

function ModalNuevoExpediente({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    numero: "",
    descripcion: "",
    categoria: "Docentes",
    estado: "Ingresado",
  });
  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(form);
    setForm({
      numero: "",
      descripcion: "",
      categoria: "Docentes",
      estado: "Ingresado",
    });
    onClose();
  };
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]
                    flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-[#1a3a6b] via-[#1a5faa] to-[#c8102e]" />
        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Nuevo expediente
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg
                         hover:bg-slate-100 transition-colors text-lg leading-none"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Completá los datos para ingresar un nuevo expediente al sistema.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Número de expediente
              </label>
              <input
                name="numero"
                value={form.numero}
                onChange={handleChange}
                placeholder="EXP-2026-XXX"
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm
                           outline-none focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Descripción
              </label>
              <input
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción del expediente"
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm
                           outline-none focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Categoría
                </label>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm
                             outline-none focus:border-[#1a3a6b] bg-white transition"
                >
                  {["Docentes", "Alumnos", "Administrativo", "Otros"].map(
                    (o) => (
                      <option key={o}>{o}</option>
                    ),
                  )}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Estado inicial
                </label>
                <select
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm
                             outline-none focus:border-[#1a3a6b] bg-white transition"
                >
                  {["Ingresado", "Comisión"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium
                           text-slate-600 bg-slate-50 border border-slate-200
                           rounded-xl hover:bg-slate-100 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-bold
                           text-white bg-[#1a3a6b] hover:bg-[#14305c]
                           rounded-xl transition shadow-sm"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard principal ──────────────────────────────────────────────────────

export default function Dashboard() {
  const [data, setData] = useState({
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
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  // índices de alertas que el usuario cerró (solo persiste en la sesión actual)
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const dismissAlert = (idx) =>
    setDismissedAlerts((prev) => new Set([...prev, idx]));

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: res } = await axios.get(`${API}/dashboard`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (form) => {
    try {
      await axios.post(`${API}/expedientes`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const pct = (v, t) => (!t ? "0%" : `${Math.min(100, (v / t) * 100)}%`);

  // Fallbacks mientras la API carga
  const expedientes =
    data.expedientesRecientes?.length > 0
      ? data.expedientesRecientes
      : [
          {
            _id: "1",
            numero: "EXP-2026-003",
            descripcion: "Designación docente",
            categoria: "Docentes",
            estado: "Comisión",
          },
          {
            _id: "2",
            numero: "EXP-13-02",
            descripcion: "Licencia sin goce",
            categoria: "Docentes",
            estado: "Ingresado",
          },
          {
            _id: "3",
            numero: "EXP 25-05",
            descripcion: "Equivalencias alumno",
            categoria: "Alumnos",
            estado: "Despacho",
          },
        ];
  const estados =
    data.estadosExpedientes?.length > 0
      ? data.estadosExpedientes
      : [
          { nombre: "Ingresado", cantidad: 2, total: 4, color: "bg-blue-500" },
          { nombre: "Comisión", cantidad: 1, total: 4, color: "bg-purple-500" },
          { nombre: "Despacho", cantidad: 1, total: 4, color: "bg-amber-400" },
        ];
  const ordenDia = data.ordenDia?.filter((i) => i.estado === "Despacho") ?? [];

  return (
    /*
     * ─── LAYOUT PRINCIPAL ───────────────────────────────────────────
     *
     *  bg-[#f0f4f8]   → fondo gris institucional en toda la pantalla
     *  min-h-screen   → ocupa al menos 100vh
     *  pt-14          → 56px de padding-top = altura exacta del navbar fijo
     *
     * El navbar es fixed, entonces el contenido necesita ese padding-top
     * para no quedar "tapado" debajo de él.
     * ─────────────────────────────────────────────────────────────────
     */
    <div className="min-h-screen bg-[#f0f4f8] pt-14">
      {/* Navbar horizontal fijo arriba */}
      <NavbarHorizontalAdmin user={user} />

      {/*
       * ─── WRAPPER DE CONTENIDO ──────────────────────────────────────
       *
       *  max-w-screen-xl  → ancho máximo 1280px (no se estira infinito)
       *  mx-auto          → centra horizontalmente en pantallas grandes
       *  px-4 sm:px-6
       *  lg:px-8          → padding lateral responsive
       *  py-6 sm:py-8     → padding vertical
       *
       * ──────────────────────────────────────────────────────────────
       */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ── HEADER DE PÁGINA ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center
                        justify-between gap-3 mb-6 sm:mb-8"
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Resumen general del sistema
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="self-start sm:self-auto flex items-center gap-2
                       bg-[#1a3a6b] hover:bg-[#14305c] text-white
                       text-sm font-semibold px-4 py-2.5 rounded-xl
                       transition shadow-sm"
          >
            <IcoPlus c="w-4 h-4" /> Nuevo expediente
          </button>
        </div>

        {/* ── ALERTAS ── */}
        {data.alertas?.length > 0 && (
          <div className="flex flex-col gap-2 mb-6">
            {data.alertas.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-amber-50 border border-amber-300
                           text-amber-800 text-sm rounded-xl px-4 py-3"
              >
                <IcoAlert c="w-4 h-4 flex-shrink-0 text-amber-500 mt-0.5" />
                <span className="leading-snug">{a.mensaje}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── TARJETAS MÉTRICAS ─────────────────────────────────────────
         *   2 cols en mobile, 4 cols en pantallas md+
         * ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard
            titulo="Expedientes activos"
            valor={loading ? "…" : data.expedientesActivos}
            subtitulo={`${data.expedientesSemana ?? 0} ingresados esta semana`}
            iconBg="bg-blue-50 text-blue-600"
            icon={<IcoFolder />}
          />
          <StatCard
            titulo="Próxima reunión"
            valor={loading ? "…" : (data.proximaReunion?.fecha ?? "Sin fecha")}
            subtitulo={`${data.proximaReunion?.realizadas ?? 0} realizadas`}
            iconBg="bg-amber-50 text-amber-600"
            icon={<IcoCalendar />}
          />
          <StatCard
            titulo="Consejeros activos"
            valor={loading ? "…" : data.consejerosActivos}
            subtitulo={`${data.consejerosLicencia ?? 0} con licencia`}
            iconBg="bg-green-50 text-green-600"
            icon={<IcoUsers />}
          />
          <StatCard
            titulo="Actas pendientes"
            valor={loading ? "…" : data.actasPendientes}
            subtitulo="Sin aprobar"
            iconBg="bg-red-50 text-red-500"
            icon={<IcoFileText />}
          />
        </div>

        {/* ── GRID DE CARDS ────────────────────────────────────────────
         *   1 col en mobile/tablet, 2 cols en xl+
         * ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Expedientes recientes */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  Expedientes recientes
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Últimos ingresados
                </p>
              </div>
              <Link
                to="/Expediente"
                style={{ textDecoration: "none" }}
                className="inline-flex items-center gap-1 text-xs font-semibold
                           text-[#1a3a6b] hover:text-[#c8102e] transition-colors"
              >
                Ver todos <IcoArrow />
              </Link>
            </div>

            {/* Tabla — visible en sm+ */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="text-left px-5 py-3 font-semibold">Nº</th>
                    <th className="text-left px-5 py-3 font-semibold">
                      Descripción
                    </th>
                    <th className="text-left px-5 py-3 font-semibold">Cat.</th>
                    <th className="text-left px-5 py-3 font-semibold">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {expedientes.map((exp) => (
                    <tr
                      key={exp._id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-5 py-3 font-mono font-bold text-[#1a3a6b] text-[11px] whitespace-nowrap">
                        {exp.numero}
                      </td>
                      <td className="px-5 py-3 text-slate-700 max-w-[160px] truncate">
                        {exp.descripcion}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="bg-blue-50 text-[#1a3a6b] px-2.5 py-0.5
                                         rounded-full text-[10.5px] font-semibold whitespace-nowrap"
                        >
                          {exp.categoria}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <EstadoBadge estado={exp.estado} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Lista compacta — solo mobile */}
            <div className="sm:hidden divide-y divide-slate-100">
              {expedientes.map((exp) => (
                <div
                  key={exp._id}
                  className="flex items-center justify-between px-4 py-3 gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono font-bold text-[#1a3a6b] text-xs truncate">
                      {exp.numero}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {exp.descripcion}
                    </p>
                  </div>
                  <EstadoBadge estado={exp.estado} />
                </div>
              ))}
            </div>
          </div>

          {/* Estado de expedientes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-bold text-slate-800 mb-5">
              Estado de expedientes
            </h2>
            <div className="space-y-4">
              {estados.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-700 font-medium">
                      {e.nombre}
                    </span>
                    <span className="font-bold text-slate-800">
                      {e.cantidad}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${e.color}`}
                      style={{ width: pct(e.cantidad, e.total) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orden del día */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-slate-800">
                Orden del día
              </h2>
              <Link
                to="/TemarioProvisorio"
                style={{ textDecoration: "none" }}
                className="inline-flex items-center gap-1 text-xs font-semibold
                           text-[#1a3a6b] hover:text-[#c8102e] transition-colors"
              >
                Ver todos <IcoArrow />
              </Link>
            </div>
            {ordenDia.length > 0 ? (
              <div className="space-y-3">
                {ordenDia.map((item, i) => (
                  <div
                    key={item._id}
                    className="border border-slate-100 rounded-xl p-4
                               flex items-center justify-between gap-3 hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full bg-amber-100 text-amber-700
                                      flex items-center justify-center font-bold text-xs flex-shrink-0"
                      >
                        {i + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 text-sm truncate">
                          {item.numero}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.categoria}
                        </p>
                      </div>
                    </div>
                    <EstadoBadge estado={item.estado} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <IcoFileText c="w-8 h-8 mb-2 opacity-30" />
                <p className="text-xs">No hay temas en despacho</p>
              </div>
            )}
          </div>

          {/* Votaciones */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-bold text-slate-800 mb-5">
              Últimas votaciones
            </h2>
            {data.votaciones?.length > 0 ? (
              <div className="space-y-4">
                {data.votaciones.map((v) => (
                  <div
                    key={v._id}
                    className="border border-slate-100 rounded-xl p-4"
                  >
                    <p className="font-medium text-slate-800 text-sm mb-3 leading-snug">
                      {v.tema}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs mb-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                        <span className="text-slate-500">A favor:</span>
                        <span className="font-bold text-green-700">
                          {v.favor}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                        <span className="text-slate-500">En contra:</span>
                        <span className="font-bold text-red-600">
                          {v.contra}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
                        <span className="text-slate-500">Abstención:</span>
                        <span className="font-bold text-slate-600">
                          {v.abstencion}
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: pct(v.favor, v.total) }}
                      />
                      <div
                        className="bg-red-500 h-full"
                        style={{ width: pct(v.contra, v.total) }}
                      />
                      <div
                        className="bg-slate-400 h-full"
                        style={{ width: pct(v.abstencion, v.total) }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      {v.resultado}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <IcoUsers c="w-8 h-8 mb-2 opacity-30" />
                <p className="text-xs">No hay votaciones registradas</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalNuevoExpediente
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
