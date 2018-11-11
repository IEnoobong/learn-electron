// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')

const captureButton = document.getElementById('captureButton');
captureButton.addEventListener('click', captureButtonClickHandler)

function captureButtonClickHandler() {
    ipcRenderer.send('capture-window')
}

document.getElementById('printButton').addEventListener('click', printButtonClickHandler)

function printButtonClickHandler() {
    ipcRenderer.send('print-to-pdf')
}