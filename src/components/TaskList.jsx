import { FaCheck, FaTimes, FaClock } from 'react-icons/fa'
import { BsCircle } from 'react-icons/bs'

function TaskItem({ task, onComplete }) {
  const isJarayon = task.status === "jarayon"

  return (
    <div className={`task-item ${task.status === "o'tkazib yuborildi" ? "otkazib" : task.status}`}>
      
      <div className="task-left">
       <span className="task-num">
  {task.id < 10 ? `0${task.id}` : task.id}
</span>
        <div className="task-icon">
          {task.status === "bajarildi"
            ? <FaCheck size={16} color="#22c55e" />
            : task.status === "o'tkazib yuborildi"
            ? <FaTimes size={16} color="#ef4444" />
            : task.status === "jarayon"
            ? <FaClock size={16} color="#f59e0b" />
            : <BsCircle size={16} color="#444444" />
          }
        </div>
        <div style={{ flex: 1 }}>
          <p className="task-title">{task.title}</p>
          <p className="task-sub">
            {task.status === "bajarildi"
              ? `Bajarildi: ${task.time}`
              : task.status === "o'tkazib yuborildi"
              ? "Vaqtida bajarilmadi!"
              : task.status === "jarayon"
              ? "Hozir bajarilishi kerak!"
              : task.time ? `${task.time} da` : "Kutilmoqda"
            }
          </p>
        </div>
      </div>

      <div className="task-right">
        {task.status === "bajarildi" && (
          <span className="badge done-badge">BAJARILDI</span>
        )}
        {task.status === "jarayon" && (
          <button className="badge jarayon-badge" onClick={() => onComplete(task.id)}>
            BAJARILDI
          </button>
        )}
        {task.status === "kutilmoqda" && (
          <span className="badge kutilmoqda-badge">KUTILMOQDA</span>
        )}
        {task.status === "o'tkazib yuborildi" && (
          <span className="badge otkazib-badge">O'TKAZIB YUBORILDI</span>
        )}
      </div>
    </div>
  )
}

function TaskList({ tasks, onComplete, countdown }) {
  return (
    <div className="task-list">
      <div className="task-list-header">
        <h3>KETMA-KET VAZIFALAR</h3>
        <button className="expand-btn">Ro'yxatni kengaytirish ↗</button>
      </div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onComplete={onComplete} countdown={countdown} />
      ))}
    </div>
  )
}

export default TaskList