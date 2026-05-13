import React, { useState } from "react";
import NavbarLateral from "../components/NavbarLateral";
import {
  Bell,
  UserX,
  CalendarX,
  Send,
  Users,
  HardDrive,
  CheckCircle,
  Trash2,
  Filter,
  RefreshCw,
  BellOff,
  AlertCircle,
  Info,
  Mail,
  X,
  Zap,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ─── mock temporal (borrar cuando tengas el backend) ─────────────────────────
const MOCK_USER = { role: "admin", nombre: "María Sánchez" };

// ─── lista de consejeros (reemplazar con fetch al backend) ───────────────────
const CONSEJEROS = [
  { id: 1, nombre: "Carlos Mendoza",    telefono: "3814151917", email: "c.mendoza@utn.edu.ar",    activo: true  },
  { id: 2, nombre: "Laura Fernández",   telefono: "3816501006", email: "l.fernandez@utn.edu.ar",  activo: true  },
  { id: 3, nombre: "Roberto Suárez",    telefono: "3814755118", email: "r.suarez@utn.edu.ar",     activo: true  },
  { id: 4, nombre: "Diana García",      telefono: "3815001234", email: "d.garcia@utn.edu.ar",     activo: false },
  { id: 5, nombre: "Marcelo Torres",    telefono: "3814889900", email: "m.torres@utn.edu.ar",     activo: true  },
  { id: 6, nombre: "Valeria Romero",    telefono: "3816772233", email: "v.romero@utn.edu.ar",     activo: true  },
];

// ─── datos de ejemplo ────────────────────────────────────────────────────────
const NOTIFICACIONES_INICIALES = [
  {
    id: 1,
    tipo: "danger",
    icono: "user-x",
    titulo: "Dar de baja al consejero Diana García",
    descripcion:
      "Registra 2 ausencias consecutivas a reuniones del Consejo Directivo. Requiere acción administrativa.",
    fecha: "Hoy · 08:45",
    leida: false,
  },
  {
    id: 2,
    tipo: "warning",
    icono: "calendar-x",
    titulo: "Quedan 3 reuniones ordinarias disponibles",
    descripcion:
      "Se realizaron 5 de las 8 reuniones ordinarias anuales. Notificación enviada al director.",
    fecha: "Hoy · 08:00",
    leida: false,
  },
  {
    id: 3,
    tipo: "info",
    icono: "send",
    titulo: "Convocatoria sesión 06/2025 enviada",
    descripcion:
      "11 consejeros activos notificados por WhatsApp y correo electrónico. Fecha: 20 de mayo 2025.",
    fecha: "Ayer · 17:30",
    leida: false,
  },
  {
    id: 4,
    tipo: "info",
    icono: "users",
    titulo: "Notificación comisión Enseñanza",
    descripcion:
      "6 consejeros convocados a la comisión de Enseñanza para analizar EXP-2025-046.",
    fecha: "28/04/25 · 10:15",
    leida: true,
  },
  {
    id: 5,
    tipo: "success",
    icono: "drive",
    titulo: "Acta 05/2025 subida a Drive",
    descripcion:
      'El acta fue aprobada y subida correctamente a la carpeta "Actas 2025" del Departamento de Sistemas.',
    fecha: "10/04/25 · 16:20",
    leida: true,
  },
  {
    id: 6,
    tipo: "warning",
    icono: "calendar-x",
    titulo: "Quedan 4 reuniones ordinarias disponibles",
    descripcion:
      "Se realizaron 4 de las 8 reuniones ordinarias anuales. Notificación enviada al director.",
    fecha: "15/03/25 · 08:00",
    leida: true,
  },
  {
    id: 7,
    tipo: "info",
    icono: "send",
    titulo: "Convocatoria sesión 05/2025 enviada",
    descripcion:
      "11 consejeros activos notificados por WhatsApp y correo electrónico. Fecha: 10 de abril 2025.",
    fecha: "05/04/25 · 09:00",
    leida: true,
  },
];

// ─── estilos por tipo ────────────────────────────────────────────────────────
const ESTILOS = {
  danger: {
    bg: "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    badge: "bg-red-100 text-red-700",
    label: "Alerta",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    label: "Advertencia",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    label: "Información",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badge: "bg-green-100 text-green-700",
    label: "Éxito",
  },
};

const ICONOS = {
  "user-x": UserX,
  "calendar-x": CalendarX,
  send: Send,
  users: Users,
  drive: HardDrive,
};

// ─── ícono SVG de WhatsApp ────────────────────────────────────────────────────
const WhatsAppIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── modal de envío masivo ────────────────────────────────────────────────────
const ModalNotificar = ({ tipo, onClose, onEnviado }) => {
  const esWsp = tipo === "whatsapp";

  const consejerosFiltrados = CONSEJEROS.filter((c) => c.activo);

  const [seleccionados, setSeleccionados] = useState(
    consejerosFiltrados.map((c) => c.id)
  );
  const [mensaje, setMensaje] = useState(
    "Estimado/a consejero/a,\n\nLe informamos que hay una nueva notificación del Consejo Directivo - UTN Facultad Regional.\n\nPor favor, tome las acciones correspondientes.\n\nSaludos,\nSecretaría del Consejo Directivo"
  );
  const [estado, setEstado] = useState("idle"); // idle | enviando | enviado
  const [progresoActual, setProgresoActual] = useState(0);
  const [mostrarLista, setMostrarLista] = useState(false);

  const toggleSeleccion = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleTodos = () => {
    if (seleccionados.length === consejerosFiltrados.length) {
      setSeleccionados([]);
    } else {
      setSeleccionados(consejerosFiltrados.map((c) => c.id));
    }
  };

  const consejerosSel = CONSEJEROS.filter((c) => seleccionados.includes(c.id));

  // ── envío masivo ──────────────────────────────────────────────────────────
  const handleEnviarMasivo = () => {
    if (consejerosSel.length === 0) {
      alert("Seleccioná al menos un consejero.");
      return;
    }

    setEstado("enviando");
    setProgresoActual(0);

    if (esWsp) {
      // Abre una pestaña por consejero con delay para no ser bloqueado
      consejerosSel.forEach((c, i) => {
        setTimeout(() => {
          const num = `54${c.telefono.replace(/\D/g, "")}`;
          const texto = encodeURIComponent(mensaje);
          window.open(`https://wa.me/${num}?text=${texto}`, "_blank");
          setProgresoActual(i + 1);

          if (i === consejerosSel.length - 1) {
            setEstado("enviado");
            setTimeout(() => {
              onEnviado(tipo, consejerosSel.length);
              onClose();
            }, 1800);
          }
        }, i * 800); // 800ms entre cada pestaña
      });
    } else {
      // Email: un mailto con todos en BCC
      const bcc = consejerosSel.map((c) => c.email).join(",");
      const asunto = encodeURIComponent("Notificación - Consejo Directivo UTN");
      const cuerpo = encodeURIComponent(mensaje);
      window.open(`mailto:?bcc=${bcc}&subject=${asunto}&body=${cuerpo}`, "_blank");

      setTimeout(() => {
        setProgresoActual(consejerosSel.length);
        setEstado("enviado");
        setTimeout(() => {
          onEnviado(tipo, consejerosSel.length);
          onClose();
        }, 1800);
      }, 600);
    }
  };

  const porcentaje =
    consejerosSel.length > 0
      ? Math.round((progresoActual / consejerosSel.length) * 100)
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] flex flex-col">

        {/* cabecera */}
        <div
          className={`px-6 py-4 flex items-center justify-between flex-shrink-0 ${
            esWsp ? "bg-green-500" : "bg-blue-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              {esWsp ? (
                <WhatsAppIcon size={20} />
              ) : (
                <Mail size={20} className="text-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white font-bold text-sm">
                  {esWsp ? "Notificar por WhatsApp" : "Notificar por Email"}
                </h2>
                <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap size={10} />
                  Masivo
                </span>
              </div>
              <p className="text-white/70 text-xs">
                {esWsp
                  ? "Abre una pestaña de WhatsApp por consejero"
                  : "Envía un email con BCC a todos los seleccionados"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* cuerpo scrolleable */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">

          {/* selector de consejeros */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-600">
                Destinatarios
              </label>
              <button
                onClick={() => setMostrarLista((v) => !v)}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                {mostrarLista ? (
                  <>
                    Ocultar <ChevronUp size={13} />
                  </>
                ) : (
                  <>
                    Ver lista <ChevronDown size={13} />
                  </>
                )}
              </button>
            </div>

            {/* resumen + toggle todos */}
            <div
              className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                esWsp
                  ? "bg-green-50 border-green-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users
                  size={16}
                  className={esWsp ? "text-green-600" : "text-blue-600"}
                />
                <span className="text-sm font-semibold text-gray-800">
                  {seleccionados.length} de {consejerosFiltrados.length} consejeros activos
                </span>
              </div>
              <button
                onClick={toggleTodos}
                className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                  esWsp
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {seleccionados.length === consejerosFiltrados.length
                  ? "Deseleccionar todos"
                  : "Seleccionar todos"}
              </button>
            </div>

            {/* lista expandible */}
            {mostrarLista && (
              <div className="mt-2 border border-gray-100 rounded-xl overflow-hidden">
                {consejerosFiltrados.map((c, i) => (
                  <label
                    key={c.id}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors ${
                      i !== 0 ? "border-t border-gray-100" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(c.id)}
                      onChange={() => toggleSeleccion(c.id)}
                      className="rounded accent-blue-600"
                    />
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <User size={14} className="text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {c.nombre}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {esWsp ? `+54 ${c.telefono}` : c.email}
                      </p>
                    </div>
                    {seleccionados.includes(c.id) && (
                      <CheckCircle
                        size={14}
                        className={esWsp ? "text-green-500" : "text-blue-500"}
                      />
                    )}
                  </label>
                ))}
                {/* consejeros inactivos (solo lectura) */}
                {CONSEJEROS.filter((c) => !c.activo).map((c, i) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 px-4 py-2.5 border-t border-gray-100 opacity-40 cursor-not-allowed"
                  >
                    <input type="checkbox" disabled className="rounded" />
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <UserX size={14} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 truncate">
                        {c.nombre}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        Dado de baja
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* mensaje */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Mensaje
            </label>
            <textarea
              rows={6}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          {/* info */}
          <div
            className={`flex items-start gap-2 text-xs rounded-lg p-3 ${
              esWsp ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
            }`}
          >
            <Info size={13} className="mt-0.5 flex-shrink-0" />
            <span>
              {esWsp
                ? `Se abrirán ${consejerosSel.length} pestaña(s) de WhatsApp Web, una por consejero, con un intervalo de 0.8s para evitar bloqueos del navegador.`
                : `Se abrirá tu cliente de correo con ${consejerosSel.length} destinatario(s) en BCC. Todos recibirán el mismo mensaje sin ver los otros correos.`}
            </span>
          </div>

          {/* barra de progreso (solo durante el envío) */}
          {estado === "enviando" && esWsp && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Abriendo pestañas...</span>
                <span>
                  {progresoActual}/{consejerosSel.length}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
            </div>
          )}

          {/* estado enviado */}
          {estado === "enviado" && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              <p className="text-sm font-semibold text-green-700">
                ¡Enviado a {consejerosSel.length} consejero
                {consejerosSel.length !== 1 ? "s" : ""}!
              </p>
            </div>
          )}
        </div>

        {/* pie */}
        <div className="px-6 pb-5 pt-3 flex gap-3 justify-end flex-shrink-0 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleEnviarMasivo}
            disabled={estado !== "idle" || consejerosSel.length === 0}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all active:scale-95
              ${
                estado !== "idle" || consejerosSel.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : esWsp
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
          >
            {estado === "enviando" ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Enviando...
              </>
            ) : estado === "enviado" ? (
              <>
                <CheckCircle size={14} /> ¡Listo!
              </>
            ) : esWsp ? (
              <>
                <WhatsAppIcon size={14} /> Enviar a {consejerosSel.length} consejero
                {consejerosSel.length !== 1 ? "s" : ""}
              </>
            ) : (
              <>
                <Send size={14} /> Enviar a {consejerosSel.length} consejero
                {consejerosSel.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── tarjeta individual ──────────────────────────────────────────────────────
const NotifCard = ({ notif, onMarcar, onEliminar }) => {
  const e = ESTILOS[notif.tipo];
  const Icono = ICONOS[notif.icono] || Info;

  return (
    <div
      className={`relative flex gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm
        ${notif.leida ? "bg-white border-gray-100" : `${e.bg} ${e.border}`}`}
    >
      {!notif.leida && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500" />
      )}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          notif.leida ? "bg-gray-100" : e.iconBg
        }`}
      >
        <Icono
          size={18}
          className={notif.leida ? "text-gray-400" : e.iconColor}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1 flex-wrap">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              notif.leida ? "bg-gray-100 text-gray-500" : e.badge
            }`}
          >
            {e.label}
          </span>
        </div>
        <p
          className={`text-sm font-semibold leading-snug mb-1 ${
            notif.leida ? "text-gray-600" : "text-gray-900"
          }`}
        >
          {notif.titulo}
        </p>
        <p className="text-xs text-gray-500 leading-relaxed mb-2">
          {notif.descripcion}
        </p>
        <span className="text-xs text-gray-400">{notif.fecha}</span>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0 pt-0.5">
        <button
          onClick={() => onMarcar(notif.id)}
          title={notif.leida ? "Marcar como no leída" : "Marcar como leída"}
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <CheckCircle size={16} />
        </button>
        <button
          onClick={() => onEliminar(notif.id)}
          title="Eliminar notificación"
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

// ─── componente principal ────────────────────────────────────────────────────
const Notificacion = ({ user }) => {
  const userParaNavbar = user ?? MOCK_USER;

  const [notifs, setNotifs] = useState(NOTIFICACIONES_INICIALES);
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [modalTipo, setModalTipo] = useState(null); // "whatsapp" | "email" | null
  const [historialEnvios, setHistorial] = useState([]);

  const noLeidas = notifs.filter((n) => !n.leida).length;

  const marcar = (id) =>
    setNotifs((p) =>
      p.map((n) => (n.id === id ? { ...n, leida: !n.leida } : n))
    );
  const eliminar = (id) => setNotifs((p) => p.filter((n) => n.id !== id));
  const marcarTodas = () => setNotifs((p) => p.map((n) => ({ ...n, leida: true })));
  const eliminarLeidas = () => setNotifs((p) => p.filter((n) => !n.leida));

  const handleEnviado = (tipo, cantidad) => {
    const hora = new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setHistorial((p) => [{ tipo, hora, cantidad, id: Date.now() }, ...p]);
  };

  const filtradas = notifs.filter((n) => {
    const matchFiltro =
      filtro === "todas" ||
      (filtro === "no-leidas" && !n.leida) ||
      (filtro === "leidas" && n.leida) ||
      n.tipo === filtro;
    const matchBusqueda =
      !busqueda ||
      n.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      n.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return matchFiltro && matchBusqueda;
  });

  const conteos = {
    danger: notifs.filter((n) => n.tipo === "danger" && !n.leida).length,
    warning: notifs.filter((n) => n.tipo === "warning" && !n.leida).length,
    info: notifs.filter((n) => n.tipo === "info" && !n.leida).length,
    success: notifs.filter((n) => n.tipo === "success" && !n.leida).length,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavbarLateral user={userParaNavbar} />

      {/* Modal */}
      {modalTipo && (
        <ModalNotificar
          tipo={modalTipo}
          onClose={() => setModalTipo(null)}
          onEnviado={handleEnviado}
        />
      )}

      <main className="ml-64 flex-1 p-8">
        {/* ── encabezado ── */}
        <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Bell size={22} className="text-blue-800" />
              <h1 className="text-2xl font-bold text-gray-900">
                Notificaciones
              </h1>
              {noLeidas > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {noLeidas} sin leer
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 ml-9">
              Centro de alertas y notificaciones del sistema
            </p>
          </div>

          {/* ── botones de envío masivo ── */}
          <div className="flex gap-3 items-center">
            {/* WhatsApp masivo */}
            <button
              onClick={() => setModalTipo("whatsapp")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white
                bg-green-500 hover:bg-green-600 active:scale-95 transition-all shadow-sm"
            >
              <WhatsAppIcon size={17} />
              Notificar WhatsApp
              {historialEnvios.filter((e) => e.tipo === "whatsapp").length >
                0 && (
                <span className="bg-white/25 text-white text-xs px-1.5 py-0.5 rounded-full leading-none">
                  {historialEnvios.filter((e) => e.tipo === "whatsapp").length}
                </span>
              )}
            </button>

            {/* Email masivo */}
            <button
              onClick={() => setModalTipo("email")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white
                bg-blue-700 hover:bg-blue-800 active:scale-95 transition-all shadow-sm"
            >
              <Mail size={17} aria-hidden="true" />
              Notificar Email
              {historialEnvios.filter((e) => e.tipo === "email").length > 0 && (
                <span className="bg-white/25 text-white text-xs px-1.5 py-0.5 rounded-full leading-none">
                  {historialEnvios.filter((e) => e.tipo === "email").length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* historial de envíos recientes */}
        {historialEnvios.length > 0 && (
          <div className="flex gap-2 mb-5 flex-wrap">
            {historialEnvios.slice(0, 5).map((e) => (
              <span
                key={e.id}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full
                  ${
                    e.tipo === "whatsapp"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
              >
                <CheckCircle size={11} />
                {e.tipo === "whatsapp" ? "WhatsApp" : "Email"} · {e.cantidad}{" "}
                consejero{e.cantidad !== 1 ? "s" : ""} · {e.hora}
              </span>
            ))}
          </div>
        )}

        {/* ── tarjetas resumen / filtros rápidos ── */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            {
              tipo: "danger",
              label: "Alertas",
              icon: AlertCircle,
              color: "text-red-600",
              bg: "bg-red-50",
              border: "border-red-100",
            },
            {
              tipo: "warning",
              label: "Advertencias",
              icon: CalendarX,
              color: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-100",
            },
            {
              tipo: "info",
              label: "Información",
              icon: Send,
              color: "text-blue-600",
              bg: "bg-blue-50",
              border: "border-blue-100",
            },
            {
              tipo: "success",
              label: "Éxito",
              icon: CheckCircle,
              color: "text-green-600",
              bg: "bg-green-50",
              border: "border-green-100",
            },
          ].map(({ tipo, label, icon: Ic, color, bg, border }) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo === filtro ? "todas" : tipo)}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all
                ${
                  filtro === tipo
                    ? `${bg} ${border} shadow-sm`
                    : "bg-white border-gray-100 hover:border-gray-200"
                }`}
            >
              <div className={`p-2 rounded-lg ${bg}`}>
                <Ic size={18} className={color} />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-gray-900">
                  {conteos[tipo]}
                </p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </button>
          ))}
        </div>

        {/* ── barra de herramientas ── */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 mb-4 flex gap-3 items-center flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Filter
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar notificación..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {[
              { val: "todas", label: "Todas" },
              { val: "no-leidas", label: "Sin leer" },
              { val: "leidas", label: "Leídas" },
            ].map(({ val, label }) => (
              <button
                key={val}
                onClick={() => setFiltro(val)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all
                  ${
                    filtro === val
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={marcarTodas}
            className="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
          >
            <RefreshCw size={14} />
            Marcar todas leídas
          </button>
          <button
            onClick={eliminarLeidas}
            className="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors border border-gray-200"
          >
            <BellOff size={14} />
            Eliminar leídas
          </button>
        </div>

        {/* ── lista ── */}
        <div className="space-y-3">
          {filtradas.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
              <BellOff size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">
                No hay notificaciones para mostrar
              </p>
            </div>
          ) : (
            filtradas.map((n) => (
              <NotifCard
                key={n.id}
                notif={n}
                onMarcar={marcar}
                onEliminar={eliminar}
              />
            ))
          )}
        </div>

        {filtradas.length > 0 && (
          <p className="text-center text-xs text-gray-400 mt-6">
            Mostrando {filtradas.length} de {notifs.length} notificaciones
          </p>
        )}
      </main>
    </div>
  );
};

export default Notificacion;
