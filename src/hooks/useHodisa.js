import { useState, useEffect } from 'react'
import { playBeep, playSuccess, speak } from '../utils/sound.js'
import { saveReport } from '../utils/Storage.js'
import { generateTasks } from '../data/Task.js'

export function useHodisa() {
  const [tasks, setTasks] = useState(generateTasks)
  const [isStarted, setIsStarted] = useState(false)
  const [startTime, setStartTime] = useState(null)

  const allDone = tasks.every(t =>
    t.status === "bajarildi" || t.status === "o'tkazib yuborildi"
  )

  const hasSkipped = tasks.some(t => t.status === "o'tkazib yuborildi")
  const currentTask = tasks.find(t => t.status === "jarayon")
  const doneTasks = tasks.filter(t => t.status === "bajarildi").length
  const totalTasks = tasks.length

  return {
    tasks, setTasks,
    isStarted, setIsStarted,
    startTime, setStartTime,
    allDone, hasSkipped,
    currentTask, doneTasks, totalTasks
  }
}