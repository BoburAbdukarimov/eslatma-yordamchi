export const saveReport = (report) => {
  const existing = JSON.parse(localStorage.getItem('hisobotlar') || '[]')
  existing.push(report)
  localStorage.setItem('hisobotlar', JSON.stringify(existing))
}

export const getReports = () => {
  return JSON.parse(localStorage.getItem('hisobotlar') || '[]')
}

export const clearReports = () => {
  localStorage.removeItem('hisobotlar')
}