<template>
  <div class="fit row no-wrap justify-start items-start content-start">
    <div class="activity-pane self-stretch">
      <div
        class="row items-center justify-center activity-selector-icon-holder"
      >
        <q-icon name="mdi-folder-outline" class="activity-selector-icon" />
      </div>
      <div
        class="row items-center justify-center activity-selector-icon-holder"
      >
        <q-icon name="mdi-magnify" class="activity-selector-icon" />
      </div>
      <div
        class="row items-center justify-center activity-selector-icon-holder"
      >
        <q-icon name="mdi-publish" class="activity-selector-icon" />
      </div>
      <div
        class="row items-center justify-center activity-selector-icon-holder"
      >
        <q-icon name="mdi-cog" class="activity-selector-icon" />
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
            <div @contextmenu="showNodeSelected">TEST</div>
            <div class="q-pa-md">
              <button v-on:click="showNodeSelected">showClickedNode</button>
              <div class="tree-wrapper">
                <q-tree
                  :nodes="customize"
                  :duration="100"
                  node-key="label"
                  default-expand-all
                  ref="mytree"
                >
                  <template v-slot:header-generic="prop">
                    <div
                      class="row items-center no-wrap"
                      :id="prop.node.myid"
                      @contextmenu="miketest"
                      @click="mikeclick"
                      @doubleclick="mikedouble"
                    >
                      <q-icon
                        :name="prop.node.icon || 'star'"
                        :color="prop.node.iconcolor || 'orange'"
                        class="icon-common"
                      />
                      <div class="node-common">{{ prop.node.label }}</div>
                    </div>
                  </template>

                  <template v-slot:default-header="prop">
                    <div class="node-common">{{ prop.node.label }}</div>
                  </template>

                  <template v-slot:body-story="prop">
                    <span
                      class="row items-center"
                      :id="prop.node.myid"
                      @contextmenu="miketest"
                      >The story is: {{ prop.node.story }}</span
                    >
                  </template>
                </q-tree>
              </div>
            </div>
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
                  <q-btn color="purple" @click="forceReload" label="reload" />
                  <q-btn color="green" @click="readFolder" label="read folder" />
                  <q-btn color="indigo" @click="deleteFile" label="delete file" />
                  <q-btn color="lime" @click="saveFile" label="save as" />
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
const dialog = electron.remote.dialog
const globalShortcut = electron.remote.globalShortcut
const getCurrentWindow = electron.remote.getCurrentWindow
const globby = electron.remote.globby
export default {
  data () {
    return {
      splitterModel: 20, // start at 50%
      splitterModel2: 90,
      splitterOrientation: true,
      customize: [
        {
          label: 'Good food',
          icon: 'restaurant_menu',
          iconcolor: 'teal-10',
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
      ],
      onclick (node) {
        alert(node.label)
      }
    }
  },
  methods: {
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
          const listAllFilesAndDirs = dir => globby(`${dir}/**/*`)
          (async () => {
            const result = await listAllFilesAndDirs(process.cwd())
            console.log(result)
          })()
        }
      }).catch(err => {
        console.log(err)
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
