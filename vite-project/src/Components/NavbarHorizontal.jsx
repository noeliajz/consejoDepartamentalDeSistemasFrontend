import { useState } from "react";

/**
 * NavbarHorizontal — UTN Facultad Regional Tucumán
 * Colores institucionales: azul #1a3a6b / rojo #c8102e
 *
 * Props:
 *  - activePage  : string  — id de la página activa ("inicio" | "expedientes" | "actas" | "reuniones")
 *  - onNavigate  : fn(page: string) => void
 *  - onLoginClick: fn() => void
 */
export default function NavbarHorizontal({
  activePage = "inicio",
  onNavigate,
  onLoginClick,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { id: "inicio", label: "Inicio" },
    { id: "expedientes", label: "Expedientes" },
    { id: "actas", label: "Actas" },
    { id: "reuniones", label: "Reuniones" },
  ];

  const handleNav = (id) => {
    setMobileOpen(false);
    onNavigate?.(id);
  };

  return (
    <nav className="bg-[#1a3a6b] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── LOGO ── */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => handleNav("inicio")}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              {/* Ícono grilla institucional */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a3a6b"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-bold leading-tight tracking-tight">
                Consejo Directivo
              </p>
              <p className="text-[#93b4d8] text-[10px] font-normal">
                UTN · Facultad Regional Tucumán
              </p>
            </div>
          </div>

          {/* ── LINKS DESKTOP ── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={[
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-150",
                  activePage === link.id
                    ? "bg-white/15 text-white"
                    : "text-[#b8d0eb] hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── ACCIONES DESKTOP ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Buscador mini */}
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 w-44 group focus-within:bg-white/15 transition-colors">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#93b4d8"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent outline-none text-white text-xs placeholder-[#93b4d8] w-full font-normal"
              />
            </div>

            {/* Botón login */}
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 bg-[#c8102e] hover:bg-[#a50d25] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-150 shadow-sm"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Acceder
            </button>
          </div>

          {/* ── HAMBURGER MOBILE ── */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── MENÚ MOBILE ── */}
      {mobileOpen && (
        <div className="md:hidden bg-[#142e58] border-t border-white/10 px-4 pb-4 pt-2 flex flex-col gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={[
                "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                activePage === link.id
                  ? "bg-white/15 text-white"
                  : "text-[#b8d0eb] hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <button
            onClick={() => {
              setMobileOpen(false);
              onLoginClick?.();
            }}
            className="flex items-center justify-center gap-2 bg-[#c8102e] hover:bg-[#a50d25] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Acceder al sistema
          </button>
        </div>
      )}
    </nav>
  );
}
