import { FaCheckCircle, FaClock, FaCalendarAlt } from 'react-icons/fa'
import { MdPending } from 'react-icons/md'

function StatusCard({ isStarted, startTime }) {
  const formatDate = (date) => {
    if (!date) return ''
    const months = ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr']
    return `${date.getDate()}-${months[date.getMonth()]}, ${date.getFullYear()}`
  }

  const formatTime = (date) => {
    if (!date) return ''
    const h = String(date.getHours()).padStart(2, '0')
    const m = String(date.getMinutes()).padStart(2, '0')
    const s = String(date.getSeconds()).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  return (
    <div className={`status-card ${isStarted ? 'faol' : 'tayyor'}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        {isStarted 
          ? <FaCheckCircle size={14} color="#22c55e" />
          : <MdPending size={16} color="#ef4444" />
        }
        <p className="status-label" style={{ margin: 0 }}>
          {isStarted ? 'HODISA BOSHLANGAN' : 'KUTILMOQDA'}
        </p>
      </div>

      <h2 className="status-title">
        {isStarted ? 'FAOL' : 'TAYYOR'}
      </h2>

      {isStarted && (
        <div className="status-time">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
            <FaCalendarAlt size={10} color="#888888" />
            <p className="time-value">{formatDate(startTime)}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <FaClock size={10} color="#888888" />
            <p className="time-value">{formatTime(startTime)}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatusCard