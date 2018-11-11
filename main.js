// Modules to control application life and create native browser window
const electron = require('electron')
const { app, BrowserWindow, webContents, ipcMain } = electron
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondWindow, windowToCapture, windowToPrint

function createWindow(fileStr, options) {
  // Create the browser window.
  let win = new BrowserWindow(options)

  // and load the index.html of the app.
  win.loadFile(fileStr)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  return win
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  getScreenInfo()
  console.log(app.getLocale())
  mainWindow = createWindow('index.html', { width: 800, height: 600, title: 'MAIN', backgroundColor: '#FFF' })
  secondWindow = createWindow('index.html', { width: 400, height: 400, title: 'SECOND', backgroundColor: '#FFF' })
})

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
ipcMain.on('capture-window', event => {
  windowToCapture = BrowserWindow.fromId(event.sender.webContents.id)
  let bounds = windowToCapture.getBounds()
  setTimeout(() => {
    windowToCapture.webContents.capturePage({
      x: 0, y: 0, width: bounds.width,
      height: bounds.height
    }, imageCaptured)
  }, 500)
})
function imageCaptured(image) {
  let desktop = app.getPath('desktop')
  let filePath = desktop + '/' + windowToCapture.getTitle() + '-captured-file.png'
  console.log(filePath)
  let png = image.toPNG()
  fs.writeFileSync(filePath, png)
}

ipcMain.on('print-to-pdf', event => {
  windowToPrint = BrowserWindow.fromId(event.sender.webContents.id)
  windowToPrint.webContents.printToPDF({}, pdfCreated)
})

function pdfCreated(error, data) {
  let desktop = app.getPath('desktop')
  let filePath = desktop + '/' + windowToPrint.getTitle() + '-printed.pdf'
  if (error) {
    console.error(error.message)
  }
  if (data) {
    fs.writeFile(filePath, data, error => {
      if (error) {
        console.error(error.message)
      }
    })
  }
}

function getScreenInfo() {
  let screen = electron.screen
  let currentScreens = screen.getAllDisplays()
  console.log('screens', currentScreens)
}