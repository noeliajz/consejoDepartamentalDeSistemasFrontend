// NavbarHorizontalAdmin.jsx  →  ahora es un NAVBAR HORIZONTAL con dropdowns
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// ─── Íconos ───────────────────────────────────────────────────────────────────

const Svg = ({ c = "w-4 h-4", children }) => (
  <svg
    className={c}
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

const IcoDashboard = ({ c }) => (
  <Svg c={c}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </Svg>
);
const IcoFolder = ({ c }) => (
  <Svg c={c}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </Svg>
);
const IcoGit = ({ c }) => (
  <Svg c={c}>
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </Svg>
);
const IcoCalendar = ({ c }) => (
  <Svg c={c}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Svg>
);
const IcoListCheck = ({ c }) => (
  <Svg c={c}>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </Svg>
);
const IcoUsers = ({ c }) => (
  <Svg c={c}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);
const IcoCheckbox = ({ c }) => (
  <Svg c={c}>
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </Svg>
);
const IcoFileText = ({ c }) => (
  <Svg c={c}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </Svg>
);
const IcoGavel = ({ c }) => (
  <Svg c={c}>
    <path d="m14 13-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10" />
    <path d="m16 16 6-6" />
    <path d="m8 8 6-6" />
    <path d="m9 7 8 8" />
  </Svg>
);
const IcoBell = ({ c }) => (
  <Svg c={c}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </Svg>
);
const IcoUser = ({ c }) => (
  <Svg c={c}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Svg>
);
const IcoUserCog = ({ c }) => (
  <Svg c={c}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <circle cx="19" cy="19" r="2" />
  </Svg>
);
const IcoChartBar = ({ c }) => (
  <Svg c={c}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </Svg>
);
const IcoLogout = ({ c }) => (
  <Svg c={c}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Svg>
);
const IcoChevDown = ({ c }) => (
  <Svg c={c}>
    <polyline points="6 9 12 15 18 9" />
  </Svg>
);
const IcoMenu = ({ c }) => (
  <Svg c={c}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Svg>
);
const IcoX = ({ c }) => (
  <Svg c={c}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);

// ─── Estructura del menú ──────────────────────────────────────────────────────

const MENU = [
  {
    id: "principal",
    label: "Principal",
    icon: IcoDashboard,
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        to: "/Dashboard",
        icon: IcoDashboard,
      },
      {
        id: "expedientes",
        label: "Expedientes",
        to: "/Expediente",
        icon: IcoFolder,
      },
      {
        id: "trazabilidad",
        label: "Trazabilidad",
        to: "/Trazabilidad",
        icon: IcoGit,
      },
    ],
  },
  {
    id: "sesiones",
    label: "Sesiones",
    icon: IcoCalendar,
    items: [
      {
        id: "reuniones",
        label: "Reuniones",
        to: "/Reunion",
        icon: IcoCalendar,
      },
      {
        id: "temario",
        label: "Temario Provisorio",
        to: "/TemarioProvisorio",
        icon: IcoListCheck,
      },
      {
        id: "comisiones",
        label: "Comisiones",
        to: "/Comision",
        icon: IcoUsers,
      },
      {
        id: "votaciones",
        label: "Votaciones",
        to: "/Votacion",
        icon: IcoCheckbox,
      },
    ],
  },
  {
    id: "documentos",
    label: "Documentos",
    icon: IcoFileText,
    items: [
      { id: "actas", label: "Actas", to: "/Acta", icon: IcoFileText },
      {
        id: "disposiciones",
        label: "Disposiciones",
        to: "/Disposicion",
        icon: IcoGavel,
      },
    ],
  },
  {
    id: "administracion",
    label: "Administración",
    icon: IcoUser,
    items: [
      {
        id: "notificaciones",
        label: "Notificaciones",
        to: "/Notificacion",
        icon: IcoBell,
      },
      {
        id: "consejeros",
        label: "Consejeros",
        to: "/Consejero",
        icon: IcoUser,
      },
      { id: "usuarios", label: "Usuarios", to: "/Usuario", icon: IcoUserCog },
      { id: "reportes", label: "Reportes", to: "/Reporte", icon: IcoChartBar },
    ],
  },
];

// ─── Dropdown individual ──────────────────────────────────────────────────────

function Dropdown({ group, location, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const GroupIcon = group.icon;

  // ¿Algún hijo está activo?
  const hasActive = group.items.some(
    (i) =>
      location.pathname === i.to || location.pathname.startsWith(i.to + "/"),
  );

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Cerrar al navegar
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium",
          "transition-all duration-150 whitespace-nowrap select-none",
          hasActive || open
            ? "bg-white/15 text-white"
            : "text-[#b8d4f0] hover:bg-white/10 hover:text-white",
        ].join(" ")}
      >
        <GroupIcon c="w-4 h-4 flex-shrink-0" />
        <span>{group.label}</span>
        <IcoChevDown
          c={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 z-50
                        bg-white rounded-xl shadow-xl border border-slate-200
                        py-1.5 min-w-[200px] overflow-hidden
                        animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {group.items.map((item) => {
            const ItemIcon = item.icon;
            const active =
              location.pathname === item.to ||
              location.pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.id}
                to={item.to}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={[
                  "flex items-center gap-2.5 px-4 py-2.5 text-sm",
                  "transition-colors duration-100",
                  active
                    ? "bg-[#1a3a6b] text-white font-semibold"
                    : "text-slate-700 hover:bg-slate-50 font-medium",
                ].join(" ")}
              >
                <ItemIcon c="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── NavbarHorizontal Admin ───────────────────────────────────────────────────

export default function NavbarHorizontalAdmin({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null); // sección expandida en mobile

  // Cerrar al cambiar ruta
  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, [location.pathname]);

  // Bloquear scroll con menú mobile abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const initials = user?.nombre
    ? user.nombre
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AD";

  const ICO = "w-[15px] h-[15px] flex-shrink-0";

  return (
    <>
      {/* ════════════════════════════════════════════════════
          NAVBAR HORIZONTAL — fijo en la parte superior
      ════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50
                      bg-[#1a3a6b] shadow-md select-none pt-2"
        style={{ height: 56 }}
      >
        <div className="h-full flex items-center justify-between px-4 lg:px-6 gap-4 ">
          {/* ── LOGO ── */}
          <Link
            to="/Dashboard"
            style={{ textDecoration: "none" }}
            className="flex items-center gap-2.5 flex-shrink-0"
          >
            <div
              className="w-8 h-8 bg-[#6495ED] rounded-lg flex items-center
                            justify-center flex-shrink-0"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-white text-[13px] font-bold leading-tight">
                UTN Tucumán
              </p>
              <p className="text-[#93b4d8] text-[10px] leading-tight">
                Consejo Directivo
              </p>
            </div>
          </Link>

          {/* ── DROPDOWNS DESKTOP ── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 px-4">
            {MENU.map((group) => (
              <Dropdown key={group.id} group={group} location={location} />
            ))}
          </div>

          {/* ── ACCIONES DESKTOP ── */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Notificaciones */}
            <Link
              to="/Notificacion"
              style={{ textDecoration: "none" }}
              className="relative w-9 h-9 flex items-center justify-center
                         rounded-xl border border-white/20 text-[#b8d4f0]
                         hover:bg-white/10 hover:text-white transition-colors"
            >
              <IcoBell c="w-4 h-4" />
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5
                               bg-[#c8102e] rounded-full border border-[#1a3a6b]"
              />
            </Link>

            {/* Avatar + nombre + logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/20">
              <div
                className="w-8 h-8 rounded-full bg-[#2563eb] text-white
                              text-[11px] font-bold flex items-center justify-center flex-shrink-0"
              >
                {initials}
              </div>
              <div className="hidden xl:block">
                <p className="text-white text-[12px] font-semibold leading-tight">
                  {user?.nombre ?? "Admin UTN"}
                </p>
                <p className="text-[#93b4d8] text-[10px] capitalize">
                  {user?.role ?? "Administrador"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                title="Cerrar sesión"
                className="text-[#93b4d8] hover:text-white transition-colors
                           p-1.5 rounded-lg hover:bg-white/10 ml-1"
              >
                <IcoLogout c="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── HAMBURGUESA MOBILE ── */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <IcoX c="w-5 h-5" /> : <IcoMenu c="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════
          MENÚ MOBILE — panel desplegable bajo el navbar
      ════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            style={{ top: 56 }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div
            className="lg:hidden fixed left-0 right-0 z-40
                       bg-[#1a3a6b] border-t border-white/10
                       overflow-y-auto shadow-xl"
            style={{ top: 56, maxHeight: "calc(100vh - 56px)" }}
          >
            {/* Secciones acordeón */}
            <div className="px-3 py-2 space-y-1">
              {MENU.map((group) => {
                const GroupIcon = group.icon;
                const isExpanded = mobileSection === group.id;
                const hasActive = group.items.some(
                  (i) =>
                    location.pathname === i.to ||
                    location.pathname.startsWith(i.to + "/"),
                );
                return (
                  <div key={group.id}>
                    {/* Botón sección */}
                    <button
                      onClick={() =>
                        setMobileSection(isExpanded ? null : group.id)
                      }
                      className={[
                        "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl",
                        "text-sm font-semibold transition-all duration-150",
                        hasActive || isExpanded
                          ? "bg-white/15 text-white"
                          : "text-[#b8d4f0] hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      <GroupIcon c="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 text-left">{group.label}</span>
                      <IcoChevDown
                        c={`w-4 h-4 transition-transform duration-200
                                        ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Items del grupo */}
                    {isExpanded && (
                      <div className="mt-1 ml-4 pl-3 border-l border-white/15 space-y-0.5 pb-1">
                        {group.items.map((item) => {
                          const ItemIcon = item.icon;
                          const active =
                            location.pathname === item.to ||
                            location.pathname.startsWith(item.to + "/");
                          return (
                            <Link
                              key={item.id}
                              to={item.to}
                              style={{ textDecoration: "none" }}
                              className={[
                                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg",
                                "text-sm transition-all duration-100",
                                active
                                  ? "bg-[#2563eb] text-white font-semibold"
                                  : "text-[#b8d4f0] hover:bg-white/10 hover:text-white font-medium",
                              ].join(" ")}
                            >
                              <ItemIcon c="w-4 h-4 flex-shrink-0" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Separador + usuario */}
            <div
              className="border-t border-white/10 px-4 py-3 flex items-center
                            justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full bg-[#2563eb] text-white
                                text-[11px] font-bold flex items-center justify-center flex-shrink-0"
                >
                  {initials}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold leading-tight">
                    {user?.nombre ?? "Admin UTN"}
                  </p>
                  <p className="text-[#93b4d8] text-[10px] capitalize">
                    {user?.role ?? "Administrador"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-[#93b4d8] hover:text-white
                           text-xs font-medium px-3 py-2 rounded-lg
                           hover:bg-white/10 transition-colors"
              >
                <IcoLogout c="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ─── Hook de utilidad ─────────────────────────────────────────────────────────
// Usalo en todas tus páginas admin:
//
//   import NavbarHorizontalAdmin, { useAdminLayout } from "../Components/NavbarHorizontalAdmin";
//
//   export default function MiPagina() {
//     return (
//       <div className="min-h-screen bg-[#f0f4f8] pt-14">
//         <NavbarHorizontalAdmin user={user} />
//         <main className="p-4 sm:p-6">…</main>
//       </div>
//     );
//   }
//
export function useAdminLayout() {
  return {
    // Clase para el wrapper de cada página (deja espacio al navbar de 56px = pt-14)
    page: "min-h-screen bg-[#f0f4f8] pt-14",
    // Clase para el contenido interior
    content: "p-4 sm:p-6",
  };
}
