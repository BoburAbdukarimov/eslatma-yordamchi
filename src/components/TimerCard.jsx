function TimerCard({ isStarted, seconds, taskSeconds, currentDuration, doneTasks, totalTasks }) {

  const format = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0')
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0')
    const s = String(sec % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  const remaining = Math.max(0, currentDuration - taskSeconds)
  const percent = currentDuration > 0
    ? ((currentDuration - remaining) / currentDuration) * 100
    : 0
  const isWarning = remaining <= 10 && remaining > 0 && isStarted

  return (
    <div className="timer-card">
      <div className="countdown-section">
        <p className="countdown-label">
          {isStarted ? 'VAZIFA — QOLGAN VAQT' : 'TAYYOR'}
        </p>
        <div className={`countdown-number ${isWarning ? 'warning' : ''}`}>
          {isStarted
            ? `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, '0')}`
            : '0:00'}
        </div>
        <div className="countdown-bar-bg">
          <div
            className="countdown-bar-fill"
            style={{
              width: `${100 - percent}%`,
              background: isWarning
                ? 'linear-gradient(90deg, #ef4444, #ff6b6b)'
                : 'linear-gradient(90deg, #f59e0b, #fbbf24)'
            }}
          />
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <p className="stat-label">O'TGAN VAQT</p>
          <p className="stat-value">{format(seconds)}</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">BAJARILDI</p>
          <p className="stat-value" style={{ color: '#22c55e' }}>
            {doneTasks} / {totalTasks}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TimerCard