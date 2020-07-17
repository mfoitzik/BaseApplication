<template>
  <div class="fit row no-wrap justify-start items-start content-start">
    <div class="activity-pane self-stretch">
      <div
        class="row items-center justify-center activity-selector-icon-holder"
      >
        <q-icon name="mdi-folder-outline" class="activity-selector-icon" clickable @click="$router.replace('/')" />
      </div>
      <div
        class="row items-center justify-center activity-selector-icon-holder"
      >
        <q-icon name="mdi-chart-bar-stacked" class="activity-selector-icon" clickable @click="$router.replace('/reports')" />
      </div>
      <div
        class="row items-center justify-center activity-selector-icon-holder"
      >
        <q-icon name="mdi-cog" class="activity-selector-icon" clickable @click="$router.replace('/settings')" />
      </div>
    </div>
    <div class="col" style="display: inline-block;">
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <div
            class="q-pa-sm"
            style="
              border: 1px solid red;
              height: calc(100vh - 57px);
              overflow: auto;
            "
            visible
          >
            <router-view />
          </div>
        </template>

        <template v-slot:after>
          <div style="background-color: white;height: calc(100vh - 57px);border:1px solid red;overflow: hidden;">
            <q-splitter
              v-model="splitterModel2"
              :limits="[0, Infinity]"
              :horizontal="splitterOrientation"
              style="min-height: inherit;height:100%;"
            >
              <template v-slot:before>
                <div class="q-pa-md bg-brown-11 full-height" style="overflow:auto;">
                  <div class="text-h4 q-mb-md">Before</div>
                  <q-btn color="primary" @click="openDialog" label="primary" />
                  <q-btn color="secondary" @click="changeTree" label="secondary" />
                  <q-btn color="secondary" @click="toggleDev" label="Toggle Dev" />
                  <q-btn color="purple" @click="forceReload" label="reload" />
                  <q-btn color="green" @click="readFolder" label="read folder" />
                  <q-btn color="indigo" @click="deleteFile" label="delete file" />
                  <q-btn color="lime" @click="saveFile" label="save as" />
                  <q-btn color="green" @click="readFolderReaddirp" label="read folder readdirp" />
                  <q-btn color="green" @click="readFolderGlobby" label="read folder globby" />
                  <q-btn color="green" @click="testParam" label="test route param" />
                  <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                </div>
              </template>

              <template v-slot:after>
                <div class="q-pa-md bg-teal-2 full-height" style="overflow:auto;">
                  <div class="text-h4 q-mb-md">After</div>
                  <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                <p>test line</p>
                  
                </div>
              </template>
            </q-splitter>
          </div>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar' 
import { store } from '../store'
const dialog = electron.remote.dialog
const globalShortcut = electron.remote.globalShortcut
const getCurrentWindow = electron.remote.getCurrentWindow
const getCurrentWebContents = electron.remote.getCurrentWebContents
const firstBy = require('thenby')
export default {
  data () {
    return {
      splitterModel: 20, // start at 50%n
      splitterModel2: 90,
      splitterOrientation: true,
      customize: [
        {
          label: 'Good food',
          icon: 'mdi-folder',
          iconcolor: 'amber-5',
          header: 'generic',
          myid: 'gf1',
          children: [
            {
              label: 'Quality ingredients',
              body: 'story',
              story: 'Our ingredients are sourced locally.',
            },
            {
              label: 'Good recipe',
              body: 'story',
              story: 'Secret family recipes that everyone loves!',
              myid: 'gr1',
            },
          ],
        },
        {
          label: 'Good service',
          header: 'generic',
          myid: 'gs1',
          enabled: false,
          children: [
            {
              label: 'Prompt attention',
              children: [
                { label: 'child node one' },
                { label: 'child node two' },
              ],
            },
            { label: 'Professional waiter' },
          ],
        },
        {
          label: 'Pleasant surroundings',
          myid: 'ps1',
          children: [
            { label: 'Happy atmosphere' },
            { label: 'Good table presentation', header: 'generic' },
            { label: 'Pleasing decor' },
          ],
        },
        {
          label: 'Test Node',
          myid: 'testnode1',
          children: [{"label":"0","icon":"mdi-folder","iconcolor":"amber-5","header":"generic","myid":"C:\\Temp\\0","fileType":"d"},
          {"label":"01","icon":"mdi-folder","iconcolor":"amber-5","header":"generic","myid":"C:\\Temp\\01","fileType":"d"}
          ]
        }
      ],
      onclick (node) {
        alert(node.label)
      }
    }
  },
  methods: {
    toggleDev: function () {
      // electron.remote.BrowserWindow.webContents.toggleDevTools()
      // const testx = electron.remote.webContents.getAllWebContents()
      // testx[1].webContents.toggleDevTools()
      // console.log(testx)
      // console.log(testx.length)
      // console.log(JSON.stringify(electron.remote.getCurrentWindow))
      getCurrentWindow().toggleDevTools()
    },
    testParam: function () {
      console.log(this.passObject)
    },
    showNodeSelected: function () {
      this.$refs.mytree.setExpanded('Good food', false)
    },
    miketest: function () {
      event.preventDefault()
      console.log(event.currentTarget.id)
      // JSON.stringify(this)
    },
    mikeclick: function () {
      event.cancelBubble = true
      console.log('click: ' + event.currentTarget.id)

      // JSON.stringify(this)
    },
    mikedouble: function () {
      // event.cancelBubble = true
      console.log('DOUBLEclick: ' + event.currentTarget.id)
      // JSON.stringify(this)
    },
    readFolder: function () {
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
      }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        if (result.canceled === false) {
          console.log('result not cancelled')
          let dir = result.filePaths[0]
          var options
          var walker
        
          options = {
            followLinks: false
            // directories with these keys will be skipped
            // , filters: ["Temp", "_Temp"]
          }
        
          walker = walk.walk("c:/Temp", options)
        
          // OR
          // walker = walk.walkSync("/tmp", options);
        
          walker.on("names", function (root, nodeNamesArray) {
            console.log("Files & folders in the " + root + " folder: " + nodeNamesArray)
            // nodeNamesArray.sort(function (a, b) {
            //   if (a > b) return 1
            //   if (a < b) return -1
            //   return 0
            // })
          })
        
          walker.on("directories", function (root, dirStatsArray, next) {
            // dirStatsArray is an array of `stat` objects with the additional attributes
            // * type
            // * error
            // * name
            console.log(dirStatsArray)
            next()
          })
        
          walker.on("file", function (root, fileStats, next) {
            // fs.readFile(fileStats.name, function () {
            //   // doStuff
            //   console.log('FILE: ' + data)
            //   next()
            // })
            console.log(fileStats.name)
            next()
          })
        
          walker.on("errors", function (root, nodeStatsArray, next) {
            next()
          })
        
          walker.on("end", function () {
            console.log("all done")
          })
          
        }
      }).catch(function (e) {
        console.error(e) // "oh, no!"
      })
    },
    readFolderReaddirp: function () {
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
              // localthis.customize = newTree
              // localthis.passObject.eTree = newTree
              store.updateExplorer(newTree)
              // console.log(newTree)
              // console.log('HI MIKE')
            } 
          )
        }
      }).catch(function (e) {
        console.error(e) // "oh, no!"
      })
    },
    readFolderGlobby: function () {
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
      }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        if (result.canceled === false) {
          console.log('result not cancelled')
          let dir = result.filePaths[0]
          console.log('MIKE: ' + dir)
          (async () => {
          try {
            const paths = await globby([dir, '!cake'])
          }
          catch (e) {
            console.log(e.message)
          }
          
      
          console.log(paths)
          //=> ['unicorn', 'rainbow']
          })()
        }
      }).catch(function (e) {
        console.error(e) // "oh, no!"
      })
    },
    openDialog: function () {
      dialog.showOpenDialog({
        // properties: ['openFile', 'openDirectory']
        properties: ['openFile']
      }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        if (result.canceled === false) {
          // fs.readdir(result.filePaths[0], function (err, files) {
          //     //handling error
          //     if (err) {
          //         return console.log('Unable to scan directory: ' + err)
          //     } 
          //     //listing all files using forEach
          //     files.forEach(function (file) {
          //         // Do whatever you want to do with the file
          //         console.log(file)
          //     })
          // })
          fs.readFile(result.filePaths[0], (err, data) => {
            if (err) {
              console.error(err)
              return
            }
            console.log(data.toString())
          })
          let tempFile = result.filePaths[0].replace('.txt', '-2.txt')
          fs.writeFile(tempFile, 'Hi Mike! overwrite', function (err) {
              if(err) {
                  return console.log(err)
              }
              console.log("The file was saved!")
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    forceReload: function () {
      getCurrentWindow().reload()
    },
    changeTree: function () {
      this.customize = [
        {
          label: 'Mike was here',
          icon: 'restaurant_menu',
          iconcolor: 'teal-10',
          header: 'generic',
          myid: 'gf1'
        },
        {
          label: 'Good service',
          header: 'generic',
          myid: 'gs1',
          enabled: false,
          children: [
            {
              label: 'Prompt attention',
              children: [
                { label: 'child node one' },
                { label: 'child node two' },
              ],
            },
            { label: 'Professional waiter' },
          ],
        },
        {
          label: 'Pleasant surroundings',
          myid: 'ps1',
          children: [
            { label: 'Happy atmosphere' },
            { label: 'Good table presentation', header: 'generic' },
            { label: 'Pleasing decor' },
          ],
        },
      ]
    },
    deleteFile: function () {
      dialog.showOpenDialog({
        // properties: ['openFile', 'openDirectory']
        properties: ['openFile']
      }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        if (result.canceled === false) {
          fs.unlink(result.filePaths[0], function (err) {
              if(err) {
                  return console.log(err)
              }
              console.log("The file was deleted!")
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    saveFile: function () {
      let filename = dialog.showSaveDialog({}
      ).then(result => {
        filename = result.filePath
        if (filename === undefined) {
          alert('the user clicked the btn but didn\'t created a file')
          return
        }
        // fs.writeFile(filename, content, (err) => {
        //   if (err) {
        //     alert('an error ocurred with file creation ' + err.message)
        //     return
        //   }
        //   alert('WE CREATED YOUR FILE SUCCESFULLY')
        // })
        console.log(filename)
        alert('we End')
      }).catch(err => {
        alert(err)
      })

      
    }
      // console.log(__statics)
  },
}
</script>
