function ProgressCard({ tasks }) {
  const total = tasks.length
  const done = tasks.filter(t => t.status === "bajarildi").length

  return (
    <div className="progress-dots">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`progress-dot ${task.status === "o'tkazib yuborildi" ? 'otkazib' : task.status}`}
        />
      ))}
    </div>
  )
}

export default ProgressCard