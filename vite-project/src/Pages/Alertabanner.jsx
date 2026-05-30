// AlertaBanner.jsx
// Copiá este componente en src/Components/AlertaBanner.jsx
// y usalo en Dashboard.jsx (y cualquier otra página)
//
// Uso:
//   <AlertaBanner
//     mensaje="Se reprogramó la reunión para el viernes"
//     tipo="warning"           // "warning" | "error" | "info"
//     onClose={() => fn()}     // función para cerrar
//   />

// ─── Íconos inline (no necesitan import externo) ─────────────────────────────

function IcoSVG({ className, children }) {
  return (
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
}

function IcoTriangle({ className }) {
  return (
    <IcoSVG className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </IcoSVG>
  );
}

function IcoCircle({ className }) {
  return (
    <IcoSVG className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </IcoSVG>
  );
}

function IcoX({ className }) {
  return (
    <IcoSVG className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </IcoSVG>
  );
}

// ─── Estilos por tipo ─────────────────────────────────────────────────────────

const STYLES = {
  warning: {
    wrap: "bg-amber-50  border-amber-300",
    text: "text-amber-800",
    iconCls: "text-amber-500",
    closeCls: "text-amber-400 hover:text-amber-700 hover:bg-amber-100",
    Icon: IcoTriangle,
  },
  error: {
    wrap: "bg-red-50    border-red-300",
    text: "text-red-800",
    iconCls: "text-red-400",
    closeCls: "text-red-400   hover:text-red-700   hover:bg-red-100",
    Icon: IcoTriangle,
  },
  info: {
    wrap: "bg-blue-50   border-blue-200",
    text: "text-blue-800",
    iconCls: "text-blue-400",
    closeCls: "text-blue-400  hover:text-blue-700  hover:bg-blue-100",
    Icon: IcoCircle,
  },
};

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AlertaBanner({ mensaje, tipo = "warning", onClose }) {
  const s = STYLES[tipo] ?? STYLES.warning;
  const { Icon } = s;

  return (
    <div
      className={`
        flex items-center gap-3
        border rounded-xl px-4 py-3
        ${s.wrap} ${s.text}
      `}
    >
      {/* Ícono izquierda */}
      <Icon className={`w-4 h-4 flex-shrink-0 ${s.iconCls}`} />

      {/* Mensaje (ocupa todo el espacio disponible) */}
      <span className="flex-1 text-sm leading-snug">{mensaje}</span>

      {/* ── BOTÓN CERRAR (X) ── */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar notificación"
        className={`
          flex-shrink-0
          w-6 h-6
          flex items-center justify-center
          rounded-full
          transition-colors duration-150
          ${s.closeCls}
        `}
      >
        <IcoX className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
