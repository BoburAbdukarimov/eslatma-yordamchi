function ProgressCard({ tasks }) {
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