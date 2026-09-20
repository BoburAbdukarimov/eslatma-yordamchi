const isElectron = () => {
  return window && window.process && window.process.type
}

export const getXodimlar = async () => {
  if (isElectron()) {
    const { ipcRenderer } = window.require('electron')
    return await ipcRenderer.invoke('xodimlar-get')
  }
  return JSON.parse(localStorage.getItem('xodimlar') || '[]')
}

export const saveXodimlar = async (xodimlar) => {
  if (isElectron()) {
    const { ipcRenderer } = window.require('electron')
    return await ipcRenderer.invoke('xodimlar-save', xodimlar)
  }
  localStorage.setItem('xodimlar', JSON.stringify(xodimlar))
  return true
}