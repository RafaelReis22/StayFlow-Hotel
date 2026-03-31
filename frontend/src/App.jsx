import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './views/Dashboard'
import Guests from './views/Guests'
import Reservations from './views/Reservations'

const App = () => {
  const navigate = useNavigate()

  return (
    <div className="dashboard-grid">
      {/* Sidebar - Barra Lateral */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="main-content">
        <Header onNewReserva={() => navigate('/reservas')} />

        {/* Rotas Dinâmicas */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hospedes" element={<Guests />} />
          <Route path="/reservas" element={<Reservations />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
