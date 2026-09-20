export const playBeep = () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()
  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)
  oscillator.frequency.value = 800
  oscillator.type = 'sine'
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 0.5)
}

export const playSuccess = () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const notes = [523, 659, 784]
  notes.forEach((freq, i) => {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    oscillator.frequency.value = freq
    oscillator.type = 'sine'
    const start = ctx.currentTime + i * 0.15
    gainNode.gain.setValueAtTime(0.3, start)
    gainNode.gain.exponentialRampToValueAtTime(0.001, start + 0.3)
    oscillator.start(start)
    oscillator.stop(start + 0.3)
  })
}

export const speak = (type) => {
  const sounds = {
    "boshlandi": "./tadbir.mp3",
    "bajarildi": "./bajarildi.mp3",
    "yakunlandi": "./yakunlandi.mp3",
    "ogohlantirish": "./ogohlantirish.mp3",
    "keyingiga": "./bajarilmadi.mp3",
    "bajarilmadi": "./bazivazifa.mp3",
  }
  
  const audio = new Audio(sounds[type])
  audio.volume = 1
  audio.play().catch(err => console.log(err))
}