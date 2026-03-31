import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TrendingUp, CalendarCheck, Users, UserCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const [reservas, setReservas] = useState([])
  const [stats, setStats] = useState({
    receita: 'R$ 0,00',
    reservas: 0,
    hospedes: 0,
    ocupacao: '0%'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/reservations')
        setReservas(res.data.slice(-5)) // Top 5 recentes
        
        // Mocking stats expansion based on real data
        setStats({
          receita: `R$ ${(res.data.length * 450).toLocaleString('pt-BR')}`,
          reservas: res.data.length,
          hospedes: res.data.length * 2, // Estimativa
          ocupacao: '82%'
        })
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
      }
    }
    fetchData()
  }, [])

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
      {/* Cards de Estatística */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem'}}>
        <StatCard icon={<TrendingUp color="#10b981"/>} label="Receita Mensal" value={stats.receita} change="+12.5%" />
        <StatCard icon={<CalendarCheck color="#6366f1"/>} label="Reservas Ativas" value={stats.reservas} change="+8%" />
        <StatCard icon={<Users color="#a855f7"/>} label="Hóspedes do Mês" value={stats.hospedes} change="+15%" />
        <StatCard icon={<UserCheck color="#f59e0b"/>} label="Taxa de Ocupação" value={stats.ocupacao} change="+4%" />
      </div>

      {/* Tabela de Reservas */}
      <section className="glass-card" style={{padding: '2rem'}}>
        <h3 style={{fontSize: '1.2rem', marginBottom: '1.5rem'}}>Reservas Recentes</h3>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--text-dim)'}}>
              <th style={{padding: '1rem'}}>ID</th>
              <th style={{padding: '1rem'}}>Check-in</th>
              <th style={{padding: '1rem'}}>Check-out</th>
              <th style={{padding: '1rem'}}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {reservas.length > 0 ? reservas.map(res => (
              <tr key={res.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '1rem'}}>#{res.id}</td>
                <td style={{padding: '1rem'}}>{res.checkInDate}</td>
                <td style={{padding: '1rem'}}>{res.checkOutDate}</td>
                <td style={{padding: '1rem'}}>R$ {res.value}</td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{padding: '2rem', textAlign: 'center', color: 'var(--text-dim)'}}>Nenhuma reserva recente.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </motion.div>
  )
}

const StatCard = ({ icon, label, value, change }) => (
  <motion.div whileHover={{y: -5}} className="glass-card stat-card">
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div style={{padding: '0.5rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)'}}>
        {icon}
      </div>
      <span style={{fontSize: '0.8rem', color: '#10b981', fontWeight: 600}}>{change}</span>
    </div>
    <span style={{color: 'var(--text-dim)', fontSize: '0.9rem'}}>{label}</span>
    <span className="stat-value">{value}</span>
  </motion.div>
)

export default Dashboard
