import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, Plus, Trash2, X, CreditCard } from 'lucide-react'

const Reservations = () => {
  const [reservas, setReservas] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    checkInDate: '', checkOutDate: '', value: '', paymentMethod: 'Dinheiro'
  })

  const fetchReservas = async () => {
    try {
      const res = await axios.get('/api/reservations')
      setReservas(res.data)
    } catch (err) { console.error(err) }
  }

  useEffect(() => { fetchReservas() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/reservations', formData)
      setIsModalOpen(false)
      fetchReservas()
      setFormData({ checkInDate: '', checkOutDate: '', value: '', paymentMethod: 'Dinheiro' })
    } catch (err) { console.error('Erro ao cadastrar reserva:', err) }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Excluir esta reserva?')) {
      try {
        await axios.delete(`/api/reservations/${id}`)
        fetchReservas()
      } catch (err) { console.error(err) }
    }
  }

  return (
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2 style={{fontSize: '1.8rem'}}><CalendarCheck size={24} style={{marginRight: '0.5rem'}}/> Gerenciamento de Reservas</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <Plus size={20}/> Nova Reserva
        </button>
      </div>

      <div className="glass-card" style={{padding: '0'}}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead style={{background: 'rgba(255,255,255,0.02)'}}>
            <tr style={{textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--text-dim)'}}>
              <th style={{padding: '1.5rem'}}>ID</th>
              <th style={{padding: '1.5rem'}}>Check-in</th>
              <th style={{padding: '1.5rem'}}>Check-out</th>
              <th style={{padding: '1.5rem'}}>Valor</th>
              <th style={{padding: '1.5rem'}}>Meio de Pagamento</th>
              <th style={{padding: '1.5rem'}}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(res => (
              <tr key={res.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '1.5rem'}}>#{res.id}</td>
                <td style={{padding: '1.5rem'}}>{res.checkInDate}</td>
                <td style={{padding: '1.5rem'}}>{res.checkOutDate}</td>
                <td style={{padding: '1.5rem', fontWeight: 600}}>R$ {res.value}</td>
                <td style={{padding: '1.5rem'}}>{res.paymentMethod}</td>
                <td style={{padding: '1.5rem'}}>
                  <button onClick={() => handleDelete(res.id)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#ff4444'}}>
                    <Trash2 size={18}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Cadastro */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0.9, opacity: 0}} className="glass-card modal-content" style={{maxWidth: '500px', width: '90%', padding: '2rem', position: 'relative'}}>
              <button onClick={() => setIsModalOpen(false)} style={{position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'white'}}><X/></button>
              <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Cadastrar Reserva</h3>
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <div>
                    <label style={labelStyle}>Data de Entrada</label>
                    <input type="date" required style={inputStyle} value={formData.checkInDate} onChange={e => setFormData({...formData, checkInDate: e.target.value})}/>
                  </div>
                  <div>
                    <label style={labelStyle}>Data de Saída</label>
                    <input type="date" required style={inputStyle} value={formData.checkOutDate} onChange={e => setFormData({...formData, checkOutDate: e.target.value})}/>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Valor da Reserva (R$)</label>
                  <input type="number" step="0.01" required placeholder="Ex: 450.00" style={inputStyle} value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})}/>
                </div>
                <div>
                  <label style={labelStyle}>Forma de Pagamento</label>
                  <select required style={inputStyle} value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})}>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Pix">Pix</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{marginTop: '1rem', padding: '1rem'}}>Confirmar Reserva</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--border)',
  color: 'white',
  outline: 'none'
}

const labelStyle = {
  fontSize: '0.85rem',
  color: 'var(--text-dim)',
  marginBottom: '0.5rem',
  display: 'block'
}

export default Reservations
