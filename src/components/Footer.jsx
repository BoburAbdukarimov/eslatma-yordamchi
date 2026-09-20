import { FaVolumeUp, FaBell, FaPalette, FaPlay, FaPause, FaRedo, FaChartBar,FaUsers } from 'react-icons/fa'

function Footer({ isStarted, onStart, onReset, allDone, onReport,onXodimlar }) {
  return (
    <div className="footer">
      <div className="footer-left">
        <div className="footer-item">
          <FaVolumeUp size={14} color="#22c55e" />
          <div>
            <p className="footer-label">Ovoz</p>
            <p className="footer-value green">YOQILGAN</p>
          </div>
        </div>
        <div className="footer-item">
          <FaBell size={14} color="#22c55e" />
          <div>
            <p className="footer-label">Eslatmalar</p>
            <p className="footer-value green">YOQILGAN</p>
          </div>
        </div>
        <div className="footer-item">
          <FaPalette size={14} color="#a855f7" />
          <div>
            <p className="footer-label">Mavzu</p>
            <p className="footer-value blue">DARK</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        {!allDone ? (
          <button
            className="start-btn"
            onClick={onStart}
            disabled={isStarted}
            style={{ opacity: isStarted ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isStarted 
              ? <><FaPause size={13} /> HODISA JARAYONDA</>
              : <><FaPlay size={13} /> HODISANI BOSHLASH</>
            }
          </button>
        ) : (
          <button 
            className="reset-btn" 
            onClick={onReset}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaRedo size={13} /> HODISANI QAYTA BOSHLASH
          </button>
        )}
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
  <div className="footer-right" onClick={onXodimlar}>
    <FaUsers size={16} />
    <span>Xodimlar</span>
  </div>
  <div className="footer-right" onClick={onReport}>
    <FaChartBar size={16} />
    <span>Hisobotlar</span>
  </div>
</div>
</div>
  )
}

export default Footer