<template>
    <div>
        <div @contextmenu="showNodeSelected">TEST</div>
            <div class="q-pa-md">
              <button v-on:click="testTreeUpdate">Test Tree Update</button>
              <button v-on:click="showParam">Test Param</button>
              <button v-on:click="showNodeSelected">showClickedNode</button>
              <div class="tree-wrapper">
                <q-tree
                  :nodes="storeState.explorer"
                  :duration="100"
                  node-key="label"
                  default-expand-all
                  ref="mytree"
                  v-if="storeState.explorer.length > 0"
                >
                <!--@contextmenu="miketest"
                      @click="mikeclick"
                      @doubleclick="mikedouble"-->
                  <template v-slot:header-generic="prop">
                    <div style="cursor:pointer;" @click="treeClick($event, prop.node.myid)">
                      <div
                        class="row items-center no-wrap"
                        :id="prop.node.myid"
                      >
                        <q-icon
                          :name="prop.node.icon || 'star'"
                          :color="prop.node.iconcolor || 'orange'"
                          class="icon-common"
                        />
                        <div class="node-common">{{ prop.node.label }}</div>
                      </div>
                      <TreeContextMenu />
                    </div>
                  </template>

                  <template v-slot:default-header="prop">
                    <div class="node-common" style="cursor:pointer;" @click="treeClick($event, prop.node.myid)" @contextmenu="treeContext(prop.node.myid)">
                      <TreeContextMenu />
                      {{ prop.node.label }}
                      </div>
                  </template>

                  <template v-slot:body-story="prop">
                    <span
                      class="row items-center"
                      :id="prop.node.myid"
                      >The story is: {{ prop.node.story }}</span
                    >
                  </template>
                </q-tree>
              </div>
            </div>
    </div>
</template>
<script>
import { store } from '../mainstore'
import TreeContextMenu from '../components/TreeContextMenu'
export default {
  components: {
     TreeContextMenu
  },
  data () {
      return {
          storeState: store.state,
          treeClickCount: 0,
          treeClickTimer: null,
          treeDoubleClickDelay: 300
      }
  },
  methods: {
    showParam: function () {
      console.log(this.customize)
    },
    showNodeSelected: function () {
      this.$refs.mytree.setExpanded('Good food', false)
    },
    testTreeUpdate: function () {
      store.updateExplorer([
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
      ])
    },
    treeClick: function (event, inId) {
      // console.log(event)
      event.cancelBubble = true
      // console.log('click: ' + inId)
      // JSON.stringify(this)
      event.preventDefault()

      this.treeClickCount++

      if (this.treeClickCount === 1) {
        this.treeClickTimer = setTimeout(() => {
          this.treeClickCount = 0
          this.treeSingleClick(inId)
        }, this.treeDoubleClickDelay)
      } else if (this.treeClickCount === 2) {
        clearTimeout(this.treeClickTimer)
        this.treeClickCount = 0
        this.treeDoubleClick(inId)
      }
    },
    treeSingleClick: function (inId) {
      console.log('Tree single click')
    },
    treeDoubleClick: function (inId) {
      console.log('Tree double click')
    },
    treeContext: function (inId) {
      event.cancelBubble = true
      console.log('click: ' + inId)

      // JSON.stringify(this)
    }
    
  }
  // watch: {
  //   'pob.eTree': function (val) {
  //     console.log('MIKE CHANGED')
  //     this.customize = this.pob.eTree
  //   }
  // },
  // mounted: function () {
  //   this.customize = this.pob.eTree
  // }
}
</script>
