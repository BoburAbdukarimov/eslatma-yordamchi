import { useState } from 'react'
import { getReports, clearReports } from '../utils/Storage.js'
import { FaChartBar, FaCheck, FaTimes, FaArrowLeft, FaTrash, FaArrowRight, FaClock } from 'react-icons/fa'

function ReportModal({ onClose }) {
  const [selected, setSelected] = useState(null)
  const reports = getReports().reverse()

  if (reports.length === 0) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2><FaChartBar size={16} /> Hisobotlar</h2>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <div className="modal-empty">
            <FaChartBar size={40} color="#333333" style={{ marginBottom: '12px' }} />
            <p>Hali hech qanday hodisa yakunlanmagan</p>
          </div>
        </div>
      </div>
    )
  }

  if (selected) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          
          <div className="modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="modal-back" onClick={() => setSelected(null)}>
                <FaArrowLeft size={11} style={{ marginRight: '5px' }} />
                Orqaga
              </button>
              <h2><FaChartBar size={15} /> {selected.sana}</h2>
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>

          <div className="modal-stats">
            <div className="modal-stat">
              <p className="modal-stat-label">UMUMIY VAQT</p>
              <p className="modal-stat-value">{selected.umumiyVaqt}</p>
            </div>
            <div className="modal-stat">
              <p className="modal-stat-label">BAJARILDI</p>
              <p className="modal-stat-value" style={{ color: '#22c55e' }}>
                {selected.bajarildi} / {selected.bajarildi + selected.otkazib}
              </p>
            </div>
            <div className="modal-stat">
              <p className="modal-stat-label">O'TKAZIB YUBORILDI</p>
              <p className="modal-stat-value" style={{ color: '#ef4444' }}>
                {selected.otkazib} ta
              </p>
            </div>
            <div className="modal-stat">
              <p className="modal-stat-label">SAMARADORLIK</p>
              <p className="modal-stat-value" style={{ color: '#3b82f6' }}>
                {selected.samaradorlik}%
              </p>
            </div>
          </div>

          <div className="modal-tasks">
            <p className="modal-tasks-label">VAZIFALAR TAFSILOTI</p>
            {selected.vazifalar.map(task => (
              <div key={task.id} className={`modal-task-item ${task.status === "bajarildi" ? 'done' : 'skipped'}`}>
                <span className="modal-task-icon">
                  {task.status === "bajarildi" 
                    ? <FaCheck size={13} color="#22c55e" />
                    : <FaTimes size={13} color="#ef4444" />
                  }
                </span>
                <span className="modal-task-title">{task.title}</span>
                <span className="modal-task-time">
                  {task.time 
                    ? <><FaClock size={10} style={{ marginRight: 4 }} />{task.time}</>
                    : "—"
                  }
                </span>
                <span className={`modal-task-badge ${task.status === "bajarildi" ? 'done' : 'skipped'}`}>
                  {task.status === "bajarildi" ? "Bajarildi" : "O'tkazib yuborildi"}
                </span>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <span className="modal-count">
              <FaClock size={11} style={{ marginRight: 5 }} />
              {selected.boshlanganVaqt} — {selected.yakunlanganVaqt}
            </span>
            <button className="modal-close-btn" onClick={onClose}>Yopish</button>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2><FaChartBar size={16} /> Hisobotlar</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-tasks">
          {reports.map((report, index) => (
            <div
              key={report.id}
              className="report-list-item"
              onClick={() => setSelected(report)}
            >
              <div className="report-list-left">
                <span className="report-list-num">#{reports.length - index}</span>
                <div>
                  <p className="report-list-date">{report.sana}</p>
                  <p className="report-list-time">
                    <FaClock size={10} style={{ marginRight: 4 }} />
                    {report.boshlanganVaqt} — {report.yakunlanganVaqt}
                  </p>
                </div>
              </div>
              <div className="report-list-right">
                <span className="report-list-stat green">
                  <FaCheck size={10} style={{ marginRight: 3 }} />
                  {report.bajarildi} bajarildi
                </span>
                {report.otkazib > 0 && (
                  <span className="report-list-stat red">
                    <FaTimes size={10} style={{ marginRight: 3 }} />
                    {report.otkazib} o'tkazib
                  </span>
                )}
                <span className="report-list-percent">{report.samaradorlik}%</span>
                <FaArrowRight size={13} color="#555555" />
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <span className="modal-count">Jami {reports.length} ta hodisa</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="modal-clear-btn" onClick={() => { clearReports(); onClose() }}>
              <FaTrash size={12} style={{ marginRight: 6 }} />
              Tozalash
            </button>
            <button className="modal-close-btn" onClick={onClose}>Yopish</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReportModal