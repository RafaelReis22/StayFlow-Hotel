import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Trash2, X } from 'lucide-react'

const Guests = () => {
  const [guests, setGuests] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '', sobrenome: '', birthDate: '', nacionalidade: '', telefone: ''
  })

  const fetchGuests = async () => {
    try {
      const res = await axios.get('/api/guests')
      setGuests(res.data)
    } catch (err) { console.error(err) }
  }

  useEffect(() => { fetchGuests() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/guests', formData)
      setIsModalOpen(false)
      fetchGuests()
      setFormData({ nome: '', sobrenome: '', birthDate: '', nacionalidade: '', telefone: '' })
    } catch (err) { console.error('Erro ao cadastrar hóspede:', err) }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Excluir este hóspede?')) {
      try {
        await axios.delete(`/api/guests/${id}`)
        fetchGuests()
      } catch (err) { console.error(err) }
    }
  }

  return (
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h2 style={{fontSize: '1.8rem'}}><Users size={24} style={{marginRight: '0.5rem'}}/> Gerenciamento de Hóspedes</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <Plus size={20}/> Novo Hóspede
        </button>
      </div>

      <div className="glass-card" style={{padding: '0'}}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead style={{background: 'rgba(255,255,255,0.02)'}}>
            <tr style={{textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--text-dim)'}}>
              <th style={{padding: '1.5rem'}}>Nome Completo</th>
              <th style={{padding: '1.5rem'}}>Nacionalidade</th>
              <th style={{padding: '1.5rem'}}>Telefone</th>
              <th style={{padding: '1.5rem'}}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(guest => (
              <tr key={guest.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '1.5rem', fontWeight: 500}}>{guest.nome} {guest.sobrenome}</td>
                <td style={{padding: '1.5rem'}}>{guest.nacionalidade}</td>
                <td style={{padding: '1.5rem'}}>{guest.telefone}</td>
                <td style={{padding: '1.5rem'}}>
                  <button onClick={() => handleDelete(guest.id)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#ff4444'}}>
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
              <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Cadastrar Hóspede</h3>
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{display: 'flex', gap: '1rem'}}>
                  <input placeholder="Nome" required  style={inputStyle} value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})}/>
                  <input placeholder="Sobrenome" required style={inputStyle} value={formData.sobrenome} onChange={e => setFormData({...formData, sobrenome: e.target.value})}/>
                </div>
                <input type="date" required style={inputStyle} value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})}/>
                <input placeholder="Nacionalidade" required style={inputStyle} value={formData.nacionalidade} onChange={e => setFormData({...formData, nacionalidade: e.target.value})}/>
                <input placeholder="Telefone" required style={inputStyle} value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})}/>
                <button type="submit" className="btn-primary" style={{marginTop: '1rem', padding: '1rem'}}>Salvar Hóspede</button>
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

export default Guests
