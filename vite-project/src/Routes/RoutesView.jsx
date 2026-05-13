import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import IniciarSesion from '../Pages/IniciarSesion'
import Registrarse from '../Pages/Registrarse'
import Drive from '../Pages/Drive'
import Reportes from '../Pages/Reportes'
import OlvidarContrasenia from '../Pages/OlvidarContrasenia'
import PythonDrive from '../Pages/PythonDrive'
import GoogleDocsDrive from '../Pages/GoogleDocsDrive'
import HomeAdmin from '../Pages/HomeAdmin'
import HomePublic from '../Pages/HomePublic'
import Votacion from '../Pages/Votacion'
import Disposicion from '../Pages/Disposicion'
import Consejero from '../Pages/Consejero'
import Comision from '../Pages/Comision'
import Acta from '../Pages/Acta'
import Trazabilidad from '../Pages/Trazabilidad'
import Reunion from '../Pages/Reunion'
import Usuario from '../Pages/Usuario'
import Reporte from '../Pages/Reporte'
import Expedientes from '../Pages/Expediente'
import Expediente from '../Pages/Expediente'
import NuevoExpediente from '../Pages/NuevoExpediente'
import ExpedienteTodos from '../Pages/ExpedienteTodos'
import OrdenDelDia from '../Pages/OrdenDelDia'
import Notificacion from '../Pages/Notificacion'

const RoutesView = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/IniciarSesion' element={<IniciarSesion/>}/>
        <Route path='/Registrarse' element={<Registrarse/>}/>
        <Route path='/Drive' element={<Drive/>}/>
        <Route path='/Reportes' element={<Reportes/>}/>
        <Route path='/OlvidarContrasenia' element={<OlvidarContrasenia/>}/>
        <Route path='/PythonDrive' element={<PythonDrive/>}/>
        <Route path='/GoogleDocsDrive' element={<GoogleDocsDrive/>}/>
        <Route path='/HomeAdmin' element={<HomeAdmin/>}/>
        <Route path='/HomePublic' element={<HomePublic/>}/>
        <Route path='/Votacion' element={<Votacion/>}/>
        <Route path='/Disposicion' element={<Disposicion/>}/>
        <Route path='/Consejero' element={<Consejero/>}/>
        <Route path='/Comision' element={<Comision/>}/>
        <Route path='/Acta' element={<Acta/>}/>
        <Route path='/Trazabilidad' element={<Trazabilidad/>}/>
        <Route path='/Reunion' element={<Reunion/>}/>
        <Route path='/Usuario' element={<Usuario/>}/>
        <Route path='/Reporte' element={<Reporte/>}/>
        <Route path='/Expediente' element={<Expediente/>}/>
        <Route path='/NuevoExpediente' element={<NuevoExpediente/>}/>
        <Route path='/ExpedienteTodos' element={<ExpedienteTodos/>}/>
        <Route path='/OrdenDelDia' element={<OrdenDelDia/>}/>
        <Route path='/Notificacion' element={<Notificacion/>}/>

    </Routes>
  )
}

export default RoutesView