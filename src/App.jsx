import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import StatusCard from './components/StatusCard'
import TimerCard from './components/TimerCard'
import ProgressCard from './components/ProgressCard'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import { playBeep, playSuccess, speak } from './utils/sound.js'
import { generateTasks } from './data/Task.js'
import { saveReport } from './utils/Storage.js'
import ReportModal from './components/ReportModal'
import Xodimlar from './pages/Xodimlar.jsx'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(generateTasks)
  const [isStarted, setIsStarted] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [taskSeconds, setTaskSeconds] = useState(0)
  const [showReport, setShowReport] = useState(false)
  const [showXodimlar, setShowXodimlar] = useState(false)
  const taskSecondsRef = useRef(0)
  const tasksRef = useRef(tasks)

  useEffect(() => {
    tasksRef.current = tasks
  }, [tasks])

  const allDone = tasks.every(t =>
    t.status === "bajarildi" || t.status === "o'tkazib yuborildi"
  )

  const hasSkipped = tasks.some(t => t.status === "o'tkazib yuborildi")
  const currentTask = tasks.find(t => t.status === "jarayon")
  const doneTasks = tasks.filter(t => t.status === "bajarildi").length
  const totalTasks = tasks.length

  useEffect(() => {
    if (!allDone || !isStarted) return

    const hasSkipped = tasks.some(t => t.status === "o'tkazib yuborildi")

    if (hasSkipped) {
      playBeep()
      speak("bajarilmadi")
    } else {
      playSuccess()
      speak("yakunlandi")
    }

    const now = new Date()
    const months = ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr']

    const report = {
      id: Date.now(),
      sana: `${now.getDate()}-${months[now.getMonth()]}, ${now.getFullYear()}`,
      boshlanganVaqt: (() => {
        const h = String(startTime?.getHours()).padStart(2, '0')
        const m = String(startTime?.getMinutes()).padStart(2, '0')
        const s = String(startTime?.getSeconds()).padStart(2, '0')
        return `${h}:${m}:${s}`
      })(),
      yakunlanganVaqt: (() => {
        const h = String(now.getHours()).padStart(2, '0')
        const m = String(now.getMinutes()).padStart(2, '0')
        const s = String(now.getSeconds()).padStart(2, '0')
        return `${h}:${m}:${s}`
      })(),
      umumiyVaqt: (() => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
        const s = String(seconds % 60).padStart(2, '0')
        return `${h}:${m}:${s}`
      })(),
      bajarildi: tasks.filter(t => t.status === "bajarildi").length,
      otkazib: tasks.filter(t => t.status === "o'tkazib yuborildi").length,
      samaradorlik: Math.round((tasks.filter(t => t.status === "bajarildi").length / tasks.length) * 100),
      vazifalar: tasks.map(t => ({ id: t.id, title: t.title, status: t.status, time: t.time || null }))
    }

    saveReport(report)
  }, [allDone])

  useEffect(() => {
    if (!isStarted || allDone) return

    const interval = setInterval(() => {
      setSeconds(s => s + 1)
      taskSecondsRef.current += 1
      setTaskSeconds(taskSecondsRef.current)

      const current = tasksRef.current.find(t => t.status === "jarayon")
      if (!current) return

      const remaining = current.duration - taskSecondsRef.current

      if (remaining === 10) {
        playBeep()
        speak("ogohlantirish")
      }

      if (remaining <= 10 && remaining > 0) {
        setCountdown(remaining)
      } else {
        setCountdown(null)
      }

      if (remaining <= 0) {
        setCountdown(null)
        taskSecondsRef.current = 0
        setTaskSeconds(0)
        playBeep()
        speak("keyingiga")

        setTasks(prev => prev.map(task => {
          if (task.id === current.id) return { ...task, status: "o'tkazib yuborildi" }
          if (task.id === current.id + 1) return { ...task, status: "jarayon" }
          return task
        }))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isStarted, allDone])

  const handleStart = () => {
    playBeep()
    speak("boshlandi")
    setIsStarted(true)
    setStartTime(new Date())
    setSeconds(0)
    setTaskSeconds(0)
    taskSecondsRef.current = 0
    setTasks(prev => prev.map(task =>
      task.id === 1 ? { ...task, status: "jarayon" } : task
    ))
  }

  const handleReset = () => {
    setIsStarted(false)
    setStartTime(null)
    setSeconds(0)
    setTaskSeconds(0)
    taskSecondsRef.current = 0
    setCountdown(null)
    setTasks(generateTasks())
  }

  const handleComplete = (id) => {
    const remaining = tasks.filter(t =>
      t.status !== "bajarildi" && t.status !== "o'tkazib yuborildi"
    )
    const isLast = remaining.length === 1

    if (!isLast) {
      playBeep()
      speak("bajarildi")
    }

    setCountdown(null)
    taskSecondsRef.current = 0
    setTaskSeconds(0)

    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
        const s = String(seconds % 60).padStart(2, '0')
        return { ...task, status: "bajarildi", time: `${h}:${m}:${s}` }
      }
      if (task.id === id + 1) return { ...task, status: "jarayon" }
      return task
    }))
  }

  if (showXodimlar) {
    return <Xodimlar onBack={() => setShowXodimlar(false)} isDark={isDark} />
  }

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      {showReport && <ReportModal onClose={() => setShowReport(false)} />}
      {allDone && (
        <div className={`success-banner ${hasSkipped ? 'warning' : ''}`}>
          {hasSkipped
            ? `⚠️ ${tasks.filter(t => t.status === "o'tkazib yuborildi").length} ta vazifa vaqtida bajarilmadi!`
            : "🎉 Barcha vazifalar bajarildi! Hodisa muvaffaqiyatli yakunlandi!"}
        </div>
      )}
      <Header isStarted={isStarted} onStart={handleStart} isDark={isDark} setIsDark={setIsDark} />
      <div className="main">
        <div className="left-panel">
          <StatusCard isStarted={isStarted} startTime={startTime} />
          <TimerCard
            isStarted={isStarted}
            seconds={seconds}
            setSeconds={setSeconds}
            allDone={allDone}
            taskSeconds={taskSeconds}
            currentDuration={currentTask?.duration || 60}
            doneTasks={doneTasks}
            totalTasks={totalTasks}
          />
          <ProgressCard tasks={tasks} />
        </div>
        <div className="right-panel">
          <TaskList tasks={tasks} onComplete={handleComplete} countdown={countdown} />
        </div>
      </div>
      <Footer
        isStarted={isStarted}
        onStart={handleStart}
        onReset={handleReset}
        allDone={allDone}
        onReport={() => setShowReport(true)}
        onXodimlar={() => setShowXodimlar(true)}
        isDark={isDark}
      />
    </div>
  )
}

export default App