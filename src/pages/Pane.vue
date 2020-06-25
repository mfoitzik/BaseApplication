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
var codetemplatebase = `This is line 1: {mystandard}
This is line 2
This is line 3`
var codetemplate = codetemplatebase
var tempArrowSize = ''
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
    }
  },
}
</script>
