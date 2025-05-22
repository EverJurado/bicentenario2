import { Routes, Route, Navigate } from 'react-router-dom'
import { Inicio } from '../pages/Inicio'
import { Contacto } from '../pages/Contacto'
import { Button } from '../components/Button'
import { Register } from '../pages/Register'
import { ConfirmarCuenta } from '../pages/ConfirmarCuenta'
import { Acceso } from '../pages/Acceso'
import { Recuperacion } from '../pages/Recuperacion'
import { ResetPassword } from '../pages/Reset'
import { CrearEvento } from '../pages/CrearEvento'
import { MostrarEventos } from '../pages/MostrarEventos'
import { Agenda } from '../pages/Agenda'
import Chat from '../pages/chat';
import Dashboard from '../pages/dashboard'; // o la ruta correcta
import DashboardUsuario from "../pages/dashboard/dashboard_usuarios";
import DashboardEvento from "../pages/dashboard/dashboard_eventos";



export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/contacto' element={<Contacto/>}/>
            <Route path='/crear-evento' element={<CrearEvento/>}/>
            <Route path="/mostrar-evento" element={<MostrarEventos/>} />
            <Route path="/agenda" element={<Agenda />} />
            {/*<Route path='/*' element={<Navigate to='/'/>}/>*/}
            <Route path='/*' element={<h1>Error 404</h1>}/>
            <Route path='/button' element={<Button/>} />
            <Route path="/confirmar/:token" element={<ConfirmarCuenta />} />
            <Route path="/login" element={<Acceso/>}/>
            <Route path="/recuperacion" element={<Recuperacion/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/usuarios" element={<DashboardUsuario />} />
            <Route path="/dashboard/eventos" element={<DashboardEvento />} />

        </Routes>
    )
}