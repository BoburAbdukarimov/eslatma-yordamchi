function TaskStartOverlay({ task, onClose }) {
  return (
    <div className="task-start-overlay" onClick={onClose}>
      <div className="task-start-card" onClick={e => e.stopPropagation()}>
        <p className="task-start-label">VAZIFA BOSHLANDI · {task.id < 10 ? `0${task.id}` : task.id}</p>
        <h2 className="task-start-title">{task.title}</h2>
      </div>
    </div>
  )
}

export default TaskStartOverlay
