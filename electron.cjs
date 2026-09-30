const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 750,
    icon: path.join(__dirname, 'dist', 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile(path.join(__dirname, 'dist', 'index.html'))
}

// Xodimlar fayli yo'li
const getXodimlarPath = () => {
  return path.join(app.getPath('userData'), 'xodimlar.json')
}

// Xodimlarni o'qish
ipcMain.handle('xodimlar-get', () => {
  const filePath = getXodimlarPath()
  if (!fs.existsSync(filePath)) return []
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
})

// Xodimlarni saqlash
ipcMain.handle('xodimlar-save', (event, xodimlar) => {
  const filePath = getXodimlarPath()
  fs.writeFileSync(filePath, JSON.stringify(xodimlar, null, 2), 'utf-8')
  return true
})

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})