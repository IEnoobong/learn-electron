// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')

const syncMsgButton = document.getElementById('sendSyncMsgBtn')

syncMsgButton.addEventListener('click', () => {
    const reply = ipcRenderer.sendSync('synchronous-message', 'Mr. Watson, come here');
    console.log(reply)

    const message = `Synchronous message reply: ${reply}`

    document.getElementById('syncReply').innerHTML = message
})

const asyncMsgButton = document.getElementById('sendAsyncMsgBtn')

asyncMsgButton.addEventListener('click', () => {
    ipcRenderer.send('asynchronous-message', `That's one small step for man`)
})

ipcRenderer.on('asynchronous-reply', function (event, arg) {
    const message = `Asynchronous message reply: ${arg}`
    document.getElementById('asyncReply').innerHTML = message
})

