import { useState, useEffect, useRef } from 'react'
import { playBeep, speak } from '../utils/sound.js'

export function useTimer({ isStarted, allDone, tasks, setTasks }) {
  const [seconds, setSeconds] = useState(0)
  const [taskSeconds, setTaskSeconds] = useState(0)
  const [countdown, setCountdown] = useState(null)
  const taskSecondsRef = useRef(0)
  const tasksRef = useRef(tasks)

  tasksRef.current = tasks

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

  const reset = () => {
    setSeconds(0)
    setTaskSeconds(0)
    taskSecondsRef.current = 0
    setCountdown(null)
  }

  const resetTask = () => {
    taskSecondsRef.current = 0
    setTaskSeconds(0)
    setCountdown(null)
  }

  return { seconds, taskSeconds, countdown, reset, resetTask }
}