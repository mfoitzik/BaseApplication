<template>
  <div class="q-pa-none">
    <q-layout view="lHh lpr fFf">
      <q-header>
        <q-bar class="q-electron-drag menubar">
          <q-img
            src="../assets/BaseApplicationLogoWeb7.svg"
            class="menubar-logo"
          />
          <div
            class="q-electron-drag--exception cursor-pointer non-selectable q-px-sm row items-center ba-menu-item"
          >
            <div>
              File
              <q-menu>
                <q-list dense style="min-width: 100px;">
                  <q-item clickable v-close-popup>
                    <q-item-section @click="openFolder">Open Folder</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section @click="closeApp">Exit</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
          <div
            class="q-electron-drag--exception cursor-pointer non-selectable q-px-sm row items-center ba-menu-item"
          >
            Edit
            <q-menu>
              <q-list dense style="min-width: 100px;">
                <q-item clickable v-close-popup>
                  <q-item-section>Cut</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Copy</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Paste</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
          <div
            class="q-electron-drag--exception cursor-pointer non-selectable q-px-sm row items-center ba-menu-item"
          >
            View
            <q-menu>
              <q-list dense style="min-width: 100px;">
                <q-item clickable v-close-popup>
                  <q-item-section @click="reloadApp">Reload</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section @click="toggleDev">Toggle Dev Tools</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
          <div
            class="q-electron-drag--exception cursor-pointer non-selectable q-px-sm row items-center ba-menu-item"
          >
              Help
              <q-menu>
                <q-list dense style="min-width: 100px;">
                  <q-item clickable v-close-popup>
                    <q-item-section>Documentation</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section>About</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          <q-space />
          <div>Base Application - </div>
          <div>Open Folder Name</div>
          <q-space />
          <q-btn dense flat icon="mdi-window-minimize" @click="minimize" />
          <q-btn dense flat :icon="minbut" @click="maximize" />
          <q-btn dense flat icon="mdi-window-close" @click="closeApp" />
        </q-bar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
      <q-footer>
        <q-toolbar class="status-bar">
          <q-icon name="settings" />
          <q-space />
          <div style="padding-left: 8px; padding-right: 8px;">online</div>
          <q-icon name="settings" class="ba-footer-icon" />
          <q-icon name="publish" class="hidden ba-footer-icon" />
          <q-icon name="search" class="ba-footer-icon" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>
<script>
import { store } from '../mainstore'
const dialog = electron.remote.dialog
const getCurrentWindow = electron.remote.getCurrentWindow
const firstBy = require('thenby')
export default {
  data () {
    return {
      minbut: 'crop_square',
    }
  },
  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        // this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
        electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        // const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()
        const win = electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
          this.minbut = 'mdi-window-maximize'
        } else {
          win.maximize()
          this.minbut = 'mdi-window-restore'
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        // this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
        electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    },
    reloadApp: function () {
      getCurrentWindow().reload()
    },
    toggleDev () {
      getCurrentWindow().toggleDevTools()
    },
    openFolder () {
      let allPaths = []
      let localthis = this
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
      }).then(result => {
        if (result.canceled === false) {
          let dir = result.filePaths[0]
          readdirp(dir, {alwaysStat: true, type: 'files_directories'})
          .on('data', (entry) => {
            let isDirectory = entry.stats.isDirectory()
            let isFile = entry.stats.isFile()
            const {path, stats: {size}} = entry
            let fileSize = size.toString()
            let fileExtension = fspath.extname(path)
            let pathPieces = path.split('\\')
            let level = pathPieces.length - 1
            let levelName = pathPieces[level]
            let levelParent = ''
            if (level > 0) {
              let curName = '\\' + pathPieces[level]
              // let curLevelParentname = '\\' + pathPieces[level - 1]
              levelParent = path.replace(curName, '')
            }
            let fileOrDirectory = 'x'
            if (isFile == true) {
              fileOrDirectory = 'f'
            }
            if (isDirectory == true) {
              fileOrDirectory = 'd'
            }
            allPaths.push({path, fileSize, fileExtension, fileOrDirectory, level, levelName, levelParent})         
          })
          .on('warn', error => console.error('non-fatal error', error))
          .on('error', error => console.error('fatal error', error))
          .on('end', function () {
              let allFiles = []
              let allDirectories = []
              for (let i = 0; i <= allPaths.length - 1; i ++) {
                if (allPaths[i].fileOrDirectory == 'd') {
                  allDirectories.push(allPaths[i])
                }
                if (allPaths[i].fileOrDirectory == 'f') {
                  allFiles.push(allPaths[i])
                }
              }
              allDirectories.sort(firstBy('level').thenBy('levelName', {ignoreCase:true}))
              allFiles.sort(firstBy('level').thenBy('levelName', {ignoreCase:true}))
              let newTree = []
              let start = 0
              for (let i = 0; i <= allDirectories.length - 1; i++) {
                let tempNode = {label: '', icon: 'mdi-folder', iconcolor: 'amber-5', header: 'generic', myid: '', fileType: 'd', level: 0, children: []}
                if (allDirectories[i].level == start) {
                  tempNode.label = allDirectories[i].levelName
                  tempNode.myid = result.filePaths[0] + '\\' + allDirectories[i].path
                  tempNode.level = allDirectories[i].level
                } else {
                  start++
                  tempNode.label = allDirectories[i].levelName
                  tempNode.myid = result.filePaths[0] + '\\' + allDirectories[i].path
                  tempNode.level = allDirectories[i].level
                }
                if (allDirectories[i].level === 0) {
                  newTree.push(tempNode)
                } else {
                  const findItemNested = (arr, itemLevel, itemLabel, nestingKey) => (
                    arr.reduce((a, item) => {
                      if (a) return a
                      if (item.level === itemLevel && item.myid === (result.filePaths[0] + '\\' + itemLabel)) {
                        return item
                      }
                      if (item[nestingKey] && item[nestingKey].length > 0) {
                        return findItemNested(item[nestingKey], itemLevel, itemLabel, nestingKey)
                      }
                    }, null)
                  )
                  if (allDirectories[i].levelParent != '') {
                    const correctParent = findItemNested(newTree, start - 1, allDirectories[i].levelParent, "children")
                    correctParent.children.push(tempNode)
                  } else {
                    newTree.push(tempNode)
                  }
                }
              }
              // now do files
              start = 0
              for (let i = 0; i <= allFiles.length - 1; i++) { 
                let tempNode = {label: '', icon: 'mdi-file-outline', iconcolor: 'grey-14', header: 'generic', myid: '', fileType: 'f', level: 0}
                if (allFiles[i].level == start) {
                  tempNode.label = allFiles[i].levelName
                  tempNode.myid = result.filePaths[0] + '\\' + allFiles[i].path
                  tempNode.level = allFiles[i].level
                } else {
                  start++
                  tempNode.label = allFiles[i].levelName
                  tempNode.myid = result.filePaths[0] + '\\' + allFiles[i].path
                  tempNode.level = allFiles[i].level
                }
                if (allFiles[i].level === 0) {
                  newTree.push(tempNode)
                } else {
                  const findItemNested = (arr, itemLevel, itemLabel, nestingKey) => (
                  arr.reduce((a, item) => {
                    if (a) return a
                    if (item.level === itemLevel && item.myid === (result.filePaths[0] + '\\' + itemLabel)) return item
                    if (item[nestingKey]) return findItemNested(item[nestingKey], itemLevel, itemLabel, nestingKey)
                  }, null)
                  )
                  if (allFiles[i].levelParent != '') {
                    const correctParent = findItemNested(newTree, start - 1, allFiles[i].levelParent, "children")
                    correctParent.children.push(tempNode)
                  } else {
                    newTree.push(tempNode)
                  }
                  
                  
                }
              }
              store.updateExplorer(newTree)
            } 
          )
        }
      }).catch(function (e) {
        console.error(e) // "oh, no!"
      })
    }
  },
}
</script>
