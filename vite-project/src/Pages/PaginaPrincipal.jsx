import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarHorizontal from "../Components/NavbarHorizontal";

// ─── Datos estáticos ─────────────────────────────────────────────────────────

const STATS = [
  { value: "248", label: "Expedientes" },
  { value: "36", label: "Reuniones" },
  { value: "124", label: "Disposiciones" },
  { value: "18", label: "Consejeros" },
];

const FEATURES = [
  {
    icon: FileTextIcon,
    title: "Expedientes",
    desc: "Consultá el estado y trazabilidad de todos los expedientes presentados ante el Consejo.",
    color: "bg-blue-50 text-[#1a3a6b]",
    page: "expedientes",
  },
  {
    icon: ClipboardIcon,
    title: "Actas de sesión",
    desc: "Accedé a las actas históricas de las sesiones ordinarias y extraordinarias del Consejo.",
    color: "bg-red-50 text-[#c8102e]",
    page: "actas",
  },
  {
    icon: CalendarIcon,
    title: "Calendario de reuniones",
    desc: "Consultá el cronograma de reuniones programadas y los temarios provisorios disponibles.",
    color: "bg-amber-50 text-amber-700",
    page: "reuniones",
  },
  {
    icon: AwardIcon,
    title: "Disposiciones",
    desc: "Accedé al registro de disposiciones emitidas por el Consejo Directivo.",
    color: "bg-green-50 text-green-700",
    page: "disposiciones",
  },
  {
    icon: UsersGroupIcon,
    title: "Comisiones",
    desc: "Consultá la composición y actividad de las comisiones permanentes y especiales.",
    color: "bg-purple-50 text-purple-700",
    page: "comisiones",
  },
  {
    icon: ShieldIcon,
    title: "Transparencia",
    desc: "Todos los documentos públicos disponibles para la comunidad universitaria.",
    color: "bg-teal-50 text-teal-700",
    page: null,
  },
];

const EXPEDIENTES_RECIENTES = [
  {
    num: "EXP-2026-001",
    asunto: "Aprobación plan de estudio 2026",
    tipo: "Docentes",
    estado: "Aprobado",
  },
  {
    num: "EXP-2026-002",
    asunto: "Equipamiento laboratorio",
    tipo: "Alumnos",
    estado: "En comisión",
  },
  {
    num: "EXP-2026-003",
    asunto: "Designación docente interino",
    tipo: "Docentes",
    estado: "Ingresado",
  },
  {
    num: "EXP-2026-004",
    asunto: "Convenio con empresa ACME SA",
    tipo: "Otros",
    estado: "Despacho",
  },
  {
    num: "EXP-2026-005",
    asunto: "Beca de ayuda económica",
    tipo: "Alumnos",
    estado: "Aprobado",
  },
];

const ESTADO_STYLES = {
  Aprobado: "bg-green-100 text-green-700",
  "En comisión": "bg-amber-100 text-amber-700",
  Despacho: "bg-blue-100 text-blue-700",
  Ingresado: "bg-slate-100 text-slate-600",
};

const TIPO_STYLES = {
  Docentes: "bg-blue-50 text-[#1a3a6b]",
  Alumnos: "bg-red-50 text-[#c8102e]",
  Otros: "bg-slate-100 text-slate-600",
};

// Clave para localStorage del "Recordarme"
const REMEMBER_KEY = "utn_cd_remember";

// ─── Íconos SVG inline ────────────────────────────────────────────────────────

function FileTextIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
function CalendarIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function AwardIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
function ClipboardIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}
function UsersGroupIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="4" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </svg>
  );
}
function ShieldIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
function ChevronRightIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ArrowRightIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function LoginIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}
function EyeIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
function SpinnerIcon({ className = "" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ label, extraClass = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold ${extraClass}`}
    >
      {label}
    </span>
  );
}

// ─── Modal de Login ───────────────────────────────────────────────────────────

function LoginModal({ open, onClose }) {
  const navigate = useNavigate();

  // Recuperar credenciales guardadas si las hay
  const getSaved = () => {
    try {
      return JSON.parse(localStorage.getItem(REMEMBER_KEY)) || {};
    } catch {
      return {};
    }
  };

  const saved = getSaved();

  const [email, setEmail] = useState(saved.email ?? "");
  const [password, setPassword] = useState(saved.password ?? "");
  const [remember, setRemember] = useState(!!saved.email);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Limpiar error al escribir
  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleLogin = async (e) => {
    e?.preventDefault();

    if (!email || !password) {
      setErrorMsg("Completá el usuario y la contraseña.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        { email, password },
      );

      // Guardar token y datos de usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Recordarme: persistir o limpiar credenciales
      if (remember) {
        localStorage.setItem(REMEMBER_KEY, JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }

      onClose();
      navigate("/Dashboard");
    } catch (err) {
      setErrorMsg(
        err.response?.data?.error ||
          "Usuario o contraseña incorrectos. Intentá de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        {/* Franja de color institucional */}
        <div className="h-1.5 bg-gradient-to-r from-[#1a3a6b] via-[#1a5faa] to-[#c8102e]" />

        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#1a3a6b] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a3a6b] leading-tight">
                Consejo Directivo
              </p>
              <p className="text-[10px] text-slate-400">
                UTN · Facultad Regional Tucumán
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-1">Bienvenido</h2>
          <p className="text-xs text-slate-400 mb-6">
            Ingresá con tus credenciales institucionales
          </p>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4"
            noValidate
          >
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Usuario institucional
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@frt.utn.edu.ar"
                autoComplete="email"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none
                           focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition"
              />
            </div>

            {/* Contraseña con toggle de visibilidad */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 pr-10 text-sm outline-none
                             focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
                             hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                  aria-label={
                    showPass ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPass ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Mensaje de error */}
            {errorMsg && (
              <div
                className="flex items-start gap-2 text-xs text-[#c8102e] bg-red-50
                              border border-red-200 rounded-lg px-3 py-2.5"
              >
                <svg
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errorMsg}
              </div>
            )}

            {/* Recordarme + Olvidé contraseña */}
            <div className="flex items-center justify-between text-xs">
              {/* Toggle "Recordarme" */}
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-8 h-4 bg-slate-200 peer-checked:bg-[#1a3a6b]
                                  rounded-full transition-colors duration-200"
                  />
                  <div
                    className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow
                                  transition-transform duration-200 peer-checked:translate-x-4"
                  />
                </div>
                Recordarme
              </label>

              {/* → OlvidarContrasenia.jsx */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/OlvidarContrasenia");
                }}
                className="text-[#1a3a6b] font-semibold hover:text-[#c8102e] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2
                         bg-[#1a3a6b] hover:bg-[#14305c]
                         disabled:opacity-60 disabled:cursor-not-allowed
                         text-white font-bold py-3 rounded-xl text-sm
                         transition-all duration-150 shadow-sm mt-1"
            >
              {loading ? (
                <>
                  <SpinnerIcon className="w-4 h-4" /> Ingresando...
                </>
              ) : (
                <>
                  <LoginIcon className="w-4 h-4" /> Ingresar al sistema
                </>
              )}
            </button>

            {/* → Registro.jsx */}
            <p className="text-center text-xs text-slate-400">
              ¿Necesitás acceso?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/Registro");
                }}
                className="text-[#1a3a6b] font-semibold hover:text-[#c8102e] transition-colors"
              >
                Solicitá tu cuenta
              </button>
            </p>
          </form>
        </div>

        {/* Pie del modal */}
        <div className="px-8 pb-6">
          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs text-slate-400
                         hover:text-slate-600 transition-colors"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onNavigate, onLoginClick }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #12285a 0%, #1a3a6b 55%, #1a5faa 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-full" />
            Sistema institucional UTN-FRT
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            Gestión del{" "}
            <span className="text-[#f0c040]">Consejo Directivo</span>
          </h1>

          <p className="text-[#93b4d8] text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
            Plataforma oficial para la administración de expedientes, actas,
            reuniones y disposiciones de la Facultad Regional Tucumán.
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <button
              onClick={() => onNavigate?.("expedientes")}
              className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a50d25]
                         text-white text-sm font-bold px-6 py-3 rounded-xl
                         transition-all duration-150 shadow-md hover:-translate-y-0.5"
            >
              <FileTextIcon className="w-4 h-4" />
              Ver expedientes
            </button>
            <button
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/18
                         border border-white/25 text-white text-sm font-semibold px-6 py-3
                         rounded-xl transition-all duration-150"
            >
              <LoginIcon className="w-4 h-4" />
              Ingresar al sistema
            </button>
          </div>

          <div className="flex gap-6 mt-10 justify-center lg:justify-start">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-white">
                  {s.value}
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block flex-shrink-0 w-72">
          <div className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-5">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
              Próxima sesión
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#c8102e] rounded-xl px-3 py-2 text-white text-center flex-shrink-0">
                <div className="text-2xl font-extrabold leading-none">10</div>
                <div className="text-[10px] opacity-75 mt-0.5">ABR</div>
              </div>
              <div>
                <p className="text-white font-bold text-sm">
                  4° Sesión Ordinaria
                </p>
                <p className="text-white/55 text-xs mt-0.5">
                  18:00 hs · Sala del CD
                </p>
              </div>
            </div>
            <div className="h-px bg-white/10 mb-3" />
            <p className="text-white/50 text-xs">
              El temario provisorio estará disponible 72 hs antes de la sesión.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeaturesSection({ onNavigate }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-[#1a3a6b]">
          Acceso a la información pública
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Documentos y registros disponibles para toda la comunidad
          universitaria
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              onClick={() => f.page && onNavigate?.(f.page)}
              className={[
                "group bg-white border border-slate-200 rounded-2xl p-5 transition-all duration-200",
                f.page
                  ? "cursor-pointer hover:border-[#1a3a6b]/30 hover:shadow-lg hover:-translate-y-1"
                  : "",
              ].join(" ")}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${f.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1.5">
                {f.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              {f.page && (
                <div
                  className="flex items-center gap-1 mt-3 text-[#1a3a6b] text-xs font-semibold
                                opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Ver más <ArrowRightIcon className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Expedientes recientes ────────────────────────────────────────────────────

function ExpedientesRecientes({ onNavigate }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-[#1a3a6b]">
              Expedientes recientes
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Últimos ingresados — año 2026
            </p>
          </div>
          <button
            onClick={() => onNavigate?.("expedientes")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a3a6b]
                       hover:text-[#c8102e] transition-colors"
          >
            Ver todos <ChevronRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="text-left px-5 py-3 font-semibold">
                  N° Expediente
                </th>
                <th className="text-left px-5 py-3 font-semibold">Asunto</th>
                <th className="text-left px-5 py-3 font-semibold">Tipo</th>
                <th className="text-left px-5 py-3 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {EXPEDIENTES_RECIENTES.map((exp) => (
                <tr
                  key={exp.num}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono font-bold text-[#1a3a6b] text-[11px]">
                    {exp.num}
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 font-medium max-w-[220px]">
                    {exp.asunto}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      label={exp.tipo}
                      extraClass={
                        TIPO_STYLES[exp.tipo] ?? "bg-slate-100 text-slate-500"
                      }
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      label={exp.estado}
                      extraClass={
                        ESTADO_STYLES[exp.estado] ??
                        "bg-slate-100 text-slate-500"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#1a3a6b] py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[#93b4d8] text-xs">
          © 2026 UTN · Facultad Regional Tucumán · Consejo Directivo
        </p>
        <div className="flex gap-5">
          {["Contacto", "Política de privacidad", "utn.edu.ar"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[#93b4d8]/60 hover:text-[#93b4d8] text-xs transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * PaginaPrincipal
 *
 * Props:
 *  activePage : string           — sección activa del navbar ("inicio" | "expedientes" | ...)
 *  onNavigate : fn(page) => void — navegar entre secciones públicas
 */
export default function PaginaPrincipal({ activePage = "inicio", onNavigate }) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <NavbarHorizontal
        activePage={activePage}
        onNavigate={onNavigate}
        onLoginClick={() => setLoginOpen(true)}
      />

      <HeroSection
        onNavigate={onNavigate}
        onLoginClick={() => setLoginOpen(true)}
      />

      <FeaturesSection onNavigate={onNavigate} />

      <ExpedientesRecientes onNavigate={onNavigate} />

      <Footer />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
