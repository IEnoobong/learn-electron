// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { remote, ipcRenderer } = require('electron')
const ipc = ipcRenderer

window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    ipc.send('show-context-menu')
})