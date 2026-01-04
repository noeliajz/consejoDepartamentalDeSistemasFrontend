import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import IniciarSesion from '../Pages/IniciarSesion'
import Registrarse from '../Pages/Registrarse'
import Drive from '../Pages/Drive'
import Reportes from '../Pages/Reportes'
import OlvidarContrasenia from '../Pages/OlvidarContrasenia'

const RoutesView = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/IniciarSesion' element={<IniciarSesion/>}/>
        <Route path='/Registrarse' element={<Registrarse/>}/>
        <Route path='/Drive' element={<Drive/>}/>
        <Route path='/Reportes' element={<Reportes/>}/>
        <Route path='/OlvidarContrasenia' element={<OlvidarContrasenia/>}/>
    
    </Routes>
  )
}

export default RoutesView