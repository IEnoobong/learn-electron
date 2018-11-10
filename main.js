// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, nativeImage } = require('electron')
const fs = require('fs')

ipcMain.on('open-directory-dialog', (event) => {
  dialog.showOpenDialog(mainWindow, {
    title: 'Where you wan shit',
    properties: ['openDirectory'],
    buttonLabel: 'Shit',
    // defaultPath: ''
  }, (files) => {
    if (files) event.sender.send('selectedItem', files)
  })
})

ipcMain.on('open-file-dialog', (event) => {
  let startPath = ''
  if (process.platform === 'darwin') {
    startPath = '/Users/<username>/Documents/'
  }

  dialog.showOpenDialog(mainWindow, {
    title: 'Select a workspace',
    properties: ['openFile'],
    defaultPath: startPath,
    buttonLabel: 'Select ...',
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
  }, (files) => {
    if (files) event.sender.send('selectedItem', files)
  })
})

ipcMain.on('save-file-dialog', (event) => {
  dialog.showSaveDialog(mainWindow, {
    title: 'Save file...',
    defaultPath: '/Users/<username>/Documents/highscores.txt',
    buttonLabel: "Save",
    filters: [
      { name: 'Text', extensions: ['txt'] }
    ]
  }, (file) => {
    console.log(file)
    if (file) {
      let theData = "Chris,10000"
      fs.writeFile(file, theData, function (err) {
        if (err === null) {
          console.log('It\'s saved!');
        } else {
          //ERROR OCCURRED
          console.log(err);
        }
      });
    }
  })
})

ipcMain.on('display-dialog', function (event, dialogType) {
  console.log(dialogType)
  dialog.showMessageBox(mainWindow, {
    buttons: ['Save', 'Cancel', 'Don\'t Save'],
    defaultId: 0,
    cancelId: 1,
    title: 'Save Score',
    message: 'Backup your score file?',
    detail: 'Message detail',
    type: dialogType
  }, (index) => {
    console.log(index)
  })
})


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  dialog.showErrorBox('Frak!', 'Cyclons reported on the port hanger deck!')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
