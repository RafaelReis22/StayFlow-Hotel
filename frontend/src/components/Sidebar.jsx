import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react'

const Sidebar = () => (
  <aside className="sidebar">
    <div className="logo mb-10">
      <h1 className="text-2xl font-bold gradient-text" style={{fontSize: '1.5rem', marginBottom: '2rem'}}>STAYFLOW HOTEL</h1>
    </div>
    
    <nav style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <NavItem to="/" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
      <NavItem to="/reservas" icon={<CalendarCheck size={20}/>} label="Reservas" />
      <NavItem to="/hospedes" icon={<Users size={20}/>} label="Hóspedes" />
      <NavItem to="/config" icon={<Settings size={20}/>} label="Configurações" />
    </nav>

    <div style={{marginTop: 'auto', paddingTop: '2rem'}}>
      <NavItem to="/logout" icon={<LogOut size={20}/>} label="Sair" />
    </div>
  </aside>
)

const NavItem = ({ to, icon, label }) => (
  <NavLink 
    to={to}
    style={({ isActive }) => ({
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem', 
      padding: '0.75rem 1rem', 
      borderRadius: '12px',
      cursor: 'pointer',
      background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
      color: isActive ? 'var(--primary)' : 'var(--text-dim)',
      textDecoration: 'none',
      transition: 'all 0.3s'
    })}
    className="nav-item"
  >
    {icon}
    <span style={{fontWeight: 500}}>{label}</span>
  </NavLink>
)

export default Sidebar
