import { app, BrowserWindow, nativeTheme, Menu } from 'electron'
import { folderPath } from '../../src-common/open-folder'
import path from 'path'
var fs = require('fs')
try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }
const isMac = process.platform === 'darwin';
const isWin = process.platform === 'win32'
/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

let  menu = Menu.buildFromTemplate([
  {
      label: 'Menu',
      submenu: [
          {label:process.env.APP_URL,
          click() { 
            label = 'test';
          }},
          {label:'Item 2', 
          click() { 
            folderPath().then(
              function(res){
                console.log("The retrieved folder name is: " + res)
                console.log("URL: " + process.env.APP_URL)
                // fs.readdir(res, function (err, files) {
                //   if (err)
                //      throw err;
                //   for (var index in files) {
                //      console.log(files[index]);
                //   }
                //   });
                console.log("Encoded: " + encodeURIComponent(res + "/ mike?"))
                console.log("URL: " + process.env.APP_URL)
                //mainWindow.loadURL(process.env.APP_URL + "/#/?id=" + encodeURIComponent(process.env.APP_URL))
                mainWindow.loadURL(process.env.APP_URL)
              }
              )
            
            //folderPath().then(console.log("The retrieved folder name is: "))
              //mainWindow.loadURL("https://www.cnn.com")
          } },
          isMac ? { role: 'close' } : { role: 'quit' }
      ]
  }
])

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    frame: false,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION,

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
