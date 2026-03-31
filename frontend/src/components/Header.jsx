import React from 'react'
import { Search, Bell, Plus } from 'lucide-react'

const Header = ({ onNewReserva }) => (
  <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem'}}>
    <div>
      <h2 style={{fontSize: '1.8rem', fontWeight: 600}}>Bem-vindo, <span className="gradient-text">Rafael</span></h2>
      <p style={{color: 'var(--text-dim)'}}>Ocupação do hotel hoje.</p>
    </div>
    
    <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
      <div className="glass-card" style={{padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Search size={18} color="var(--text-dim)" />
        <input type="text" placeholder="Buscar..." style={{background: 'none', border: 'none', color: 'white', outline: 'none'}} />
      </div>
      <button className="glass-card" style={{padding: '0.75rem', cursor: 'pointer', border: 'none'}}><Bell size={20} color="white"/></button>
      <button 
        onClick={onNewReserva}
        className="btn-primary" 
        style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}
      >
        <Plus size={20}/> Nova Reserva
      </button>
    </div>
  </header>
)

export default Header
