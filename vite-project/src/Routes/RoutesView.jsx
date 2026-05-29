import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Drive from "../Pages/Drive";
import Reportes from "../Pages/Reportes";
import OlvidarContrasenia from "../Pages/OlvidarContrasenia";
import PythonDrive from "../Pages/PythonDrive";
import GoogleDocsDrive from "../Pages/GoogleDocsDrive";
import HomeAdmin from "../Pages/HomeAdmin";
import HomePublic from "../Pages/HomePublic";
import Votacion from "../Pages/Votacion";
import Disposicion from "../Pages/Disposicion";
import Consejero from "../Pages/Consejero";
import Comision from "../Pages/Comision";
import Acta from "../Pages/Acta";
import Trazabilidad from "../Pages/Trazabilidad";
import Reunion from "../Pages/Reunion";
import Usuario from "../Pages/Usuario";
import Reporte from "../Pages/Reporte";
import Expedientes from "../Pages/Expediente";
import Expediente from "../Pages/Expediente";
import NuevoExpediente from "../Pages/NuevoExpediente";
import ExpedienteTodos from "../Pages/ExpedienteTodos";
import Notificacion from "../Pages/Notificacion";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import Registro from "../Pages/Registro";
import EditarExpediente from "../Pages/EditarExpediente";
import NuevaReunion from "../Pages/NuevaReunion";
import EditarReunion from "../Pages/EditarReunion";
import TemarioProvisorio from "../Pages/TemarioProvisorio";
import NuevaActa from "../Pages/NuevaActa";
import EditarActa from "../Pages/EditarActa";
import NuevaDisposicion from "../Pages/NuevaDisposicion";
import EditarDisposicion from "../Pages/EditarDisposicion";
import EditarConsejero from "../Pages/EditarConsejero";
import NuevoConsejero from "../Pages/NuevoConsejero";
import NuevoUsuario from "../Pages/NuevoUsuario";
import EditarUsuario from "../Pages/EditarUsuario";
import PaginaPrincipal from "../Pages/PaginaPrincipal";

const RoutesView = () => {
  return (
    <Routes>
      {/*       <Route path="/" element={<Home />} />
       */}{" "}
      <Route path="/Login" element={<Login />} />
      <Route path="/Registro" element={<Registro />} />
      <Route path="/Drive" element={<Drive />} />
      <Route path="/Reportes" element={<Reportes />} />
      <Route path="/OlvidarContrasenia" element={<OlvidarContrasenia />} />
      <Route path="/PythonDrive" element={<PythonDrive />} />
      <Route path="/GoogleDocsDrive" element={<GoogleDocsDrive />} />
      <Route path="/HomeAdmin" element={<HomeAdmin />} />
      <Route path="/HomePublic" element={<HomePublic />} />
      <Route path="/Votacion" element={<Votacion />} />
      <Route path="/Disposicion" element={<Disposicion />} />
      <Route path="/Consejero" element={<Consejero />} />
      <Route path="/Comision" element={<Comision />} />
      <Route path="/Acta" element={<Acta />} />
      <Route path="/Trazabilidad" element={<Trazabilidad />} />
      <Route path="/Reunion" element={<Reunion />} />
      <Route path="/Usuario" element={<Usuario />} />
      <Route path="/Reporte" element={<Reporte />} />
      <Route path="/Expediente" element={<Expediente />} />
      <Route path="/NuevoExpediente" element={<NuevoExpediente />} />
      <Route path="/ExpedienteTodos" element={<ExpedienteTodos />} />
      <Route path="/TemarioProvisorio" element={<TemarioProvisorio />} />
      <Route path="/Notificacion" element={<Notificacion />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/EditarExpediente/:id" element={<EditarExpediente />} />
      <Route path="/NuevaReunion" element={<NuevaReunion />} />
      <Route path="/EditarReunion/:id" element={<EditarReunion />} />
      <Route path="/NuevaActa" element={<NuevaActa />} />
      <Route path="/EditarActa/:id" element={<EditarActa />} />
      <Route path="/NuevaDisposicion" element={<NuevaDisposicion />} />
      <Route path="/EditarDisposicion/:id" element={<EditarDisposicion />} />
      <Route path="/EditarConsejero/:id" element={<EditarConsejero />} />
      <Route path="/NuevoConsejero" element={<NuevoConsejero />} />
      <Route path="/NuevoUsuario" element={<NuevoUsuario />} />
      <Route path="/EditarUsuario/:id" element={<EditarUsuario />} />
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/OlvidarContrasenia" element={<OlvidarContrasenia />} />
    </Routes>
  );
};

export default RoutesView;
