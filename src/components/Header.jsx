import { useState, useEffect } from 'react'
import { FaBell, FaSun, FaMoon, FaClipboardList } from 'react-icons/fa'

function Header({ isStarted, onStart, isDark, setIsDark }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date) => {
    const h = String(date.getHours()).padStart(2, '0')
    const m = String(date.getMinutes()).padStart(2, '0')
    const s = String(date.getSeconds()).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  const formatDate = (date) => {
    const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
    const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
    const day = days[date.getDay()]
    const dateNum = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day}, ${dateNum}-${month} ${year}`
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <FaClipboardList size={28} color="#a855f7" />
        </div>
        <div>
          <h1>VAZIFALAR <span>MONITORI</span></h1>
          <p>Ketma-ket ishlar nazorati tizimi</p>
        </div>
      </div>

      <div className="header-center">
        <span className="dot"></span>
        <span>TIZIM FAOL</span>
      </div>

      <div className="header-right">
        <FaBell size={20} color={isDark ? '#888888' : '#aaaaaa'} />
        <div>
          <h2>{formatTime(time)}</h2>
          <p>{formatDate(time)}</p>
        </div>
        <span
          onClick={() => setIsDark(!isDark)}
          style={{ cursor: 'pointer' }}
        >
          {isDark 
            ? <FaSun size={22} color="#f59e0b" /> 
            : <FaMoon size={22} color="#555559" />
          }
        </span>
      </div>
    </header>
  )
}

export default Header