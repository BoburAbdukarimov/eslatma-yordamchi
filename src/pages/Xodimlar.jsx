import { useState, useEffect } from 'react'
import { FaUser, FaPhone, FaHome, FaBriefcase, FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaSearch, FaUsers } from 'react-icons/fa'
import { getXodimlar, saveXodimlar } from '../utils/xodimlarStorage.js'

const initialForm = {
  ism: '',
  familya: '',
  lavozim: '',
  telefon: '',
  yashashJoyi: '',
}

const AVATAR_COLORS = [
  { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)', text: '#a855f7' },
  { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)', text: '#22c55e' },
  { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)', text: '#3b82f6' },
  { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', text: '#f59e0b' },
  { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)', text: '#ef4444' },
]

function Xodimlar({ onBack, isDark }) {
  const [xodimlar, setXodimlar] = useState([])
  const [form, setForm] = useState(initialForm)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getXodimlar().then(data => {
      setXodimlar(data)
      setLoading(false)
    })
  }, [])

  const save = async (list) => {
    setXodimlar(list)
    await saveXodimlar(list)
  }

  const handleSubmit = async () => {
    if (!form.ism || !form.familya) return

    if (editId !== null) {
      await save(xodimlar.map(x => x.id === editId ? { ...form, id: editId } : x))
      setEditId(null)
    } else {
      await save([...xodimlar, { ...form, id: Date.now() }])
    }
    setForm(initialForm)
    setShowForm(false)
  }

  const handleEdit = (x) => {
    setForm(x)
    setEditId(x.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    await save(xodimlar.filter(x => x.id !== id))
  }

  const filtered = xodimlar.filter(x =>
    `${x.ism} ${x.familya} ${x.telefon} ${x.lavozim}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const getColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length]

  return (
    <div className={`xodimlar-page ${isDark ? 'dark' : 'light'}`}>

      {/* Header */}
      <div className="xodimlar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="back-btn" onClick={onBack}>← Orqaga</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaUsers size={18} color="#a855f7" />
            <h1 className="xodimlar-title">XODIMLAR</h1>
          </div>
          <span className="xodim-count">{xodimlar.length} ta</span>
        </div>
        <button className="add-btn" onClick={() => { setShowForm(true); setEditId(null); setForm(initialForm) }}>
          <FaPlus size={12} /> Qo'shish
        </button>
      </div>

      {/* Search */}
      <div className="xodimlar-search">
        <FaSearch size={14} color="#888888" />
        <input
          placeholder="Ism, familya yoki telefon bo'yicha qidirish..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        {search && (
          <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888888' }}>
            <FaTimes size={13} />
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="xodim-form">
          <p className="form-title">{editId ? 'Xodimni tahrirlash' : 'Yangi xodim qo\'shish'}</p>
          <div className="form-grid">
            <div className="form-group">
              <label>Ism *</label>
              <input placeholder="Ism..." value={form.ism} onChange={e => setForm({ ...form, ism: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Familya *</label>
              <input placeholder="Familya..." value={form.familya} onChange={e => setForm({ ...form, familya: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Lavozim</label>
              <input placeholder="Lavozim..." value={form.lavozim} onChange={e => setForm({ ...form, lavozim: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Telefon</label>
              <input placeholder="+998..." value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} />
            </div>
            <div className="form-group form-group-full">
              <label>Yashash joyi</label>
              <input placeholder="Shahar, tuman, ko'cha..." value={form.yashashJoyi} onChange={e => setForm({ ...form, yashashJoyi: e.target.value })} />
            </div>
          </div>
          <div className="form-actions">
            <button className="cancel-btn" onClick={() => { setShowForm(false); setForm(initialForm); setEditId(null) }}>
              <FaTimes size={11} /> Bekor qilish
            </button>
            <button className="save-btn" onClick={handleSubmit}>
              <FaSave size={11} /> Saqlash
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="xodimlar-table-wrap">
        {loading ? (
          <div className="xodimlar-empty"><p>Yuklanmoqda...</p></div>
        ) : filtered.length === 0 ? (
          <div className="xodimlar-empty">
            <FaUsers size={40} color="#333333" />
            <p>{search ? 'Hech narsa topilmadi' : 'Hali xodim qo\'shilmagan'}</p>
          </div>
        ) : (
          <table className="xodimlar-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ISM FAMILYA</th>
                <th>LAVOZIM</th>
                <th>TELEFON</th>
                <th>YASHASH JOYI</th>
                <th>AMALLAR</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((x, i) => {
                const color = getColor(i)
                return (
                  <tr key={x.id}>
                    <td className="td-num">{i + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="xodim-avatar" style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}>
                          {x.ism[0]}{x.familya[0]}
                        </div>
                        <span className="td-name">{x.ism} {x.familya}</span>
                      </div>
                    </td>
                    <td className="td-text">{x.lavozim || '—'}</td>
                    <td className="td-text">{x.telefon || '—'}</td>
                    <td className="td-text">{x.yashashJoyi || '—'}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <button className="edit-btn" onClick={() => handleEdit(x)}>
                          <FaEdit size={13} />
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(x.id)}>
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}

export default Xodimlar