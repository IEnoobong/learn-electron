// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron');

const selectDirBtn = document.getElementById('select-directory')

selectDirBtn.addEventListener('click', (event) => {
    ipcRenderer.send('open-directory-dialog')
})

ipcRenderer.on('selectedItem', function (event, path) {
    document.getElementById('selectedItem').innerHTML = `You selected: ${path}`
})

const selectFileBtn = document.getElementById('select-file')

selectFileBtn.addEventListener('click', function (event) {
    ipcRenderer.send('open-file-dialog')
})

const saveFileBtn = document.getElementById('save-file')

saveFileBtn.addEventListener('click', function (event) {
    ipcRenderer.send('save-file-dialog')
})

const infoDialogBtn = document.getElementById('info')
const errorDialogBtn = document.getElementById('error')
const questionDialogBtn = document.getElementById('question')
const noneDialogBtn = document.getElementById('none')

infoDialogBtn.addEventListener('click', function (event) {
    ipcRenderer.send('display-dialog', 'info')
})

errorDialogBtn.addEventListener('click', function (event) {
    ipcRenderer.send('display-dialog', 'error')
})

questionDialogBtn.addEventListener('click', function (event) {
    ipcRenderer.send('display-dialog', 'question')
})

noneDialogBtn.addEventListener('click', function (event) {
    ipcRenderer.send('display-dialog', 'none')
})