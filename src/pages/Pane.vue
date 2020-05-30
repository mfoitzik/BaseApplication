<template>
  <div class="fit row no-wrap justify-start items-start content-start">
    <q-page>
      <div class="activity-pane">
        <div class="row items-center justify-center activity-selector-icon-holder">
          <q-icon name="mdi-folder-outline" class="activity-selector-icon" />
        </div>
        <div class="row items-center justify-center activity-selector-icon-holder">
          <q-icon name="mdi-magnify" class="activity-selector-icon" />
        </div>
        <div class="row items-center justify-center activity-selector-icon-holder">
          <q-icon name="mdi-publish" class="activity-selector-icon" />
        </div>
        <div class="row items-center justify-center activity-selector-icon-holder">
          <q-icon name="mdi-cog" class="activity-selector-icon" />
        </div>
      </div>
    </q-page>
    <div class="col" style="display:inline-block;">
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-page>
            <div class="q-pa-sm" style="height:10px;min-height:inherit;border:1px solid red;overflow:auto;" visible>
                <div @contextmenu="showNodeSelected">TEST</div>
                <div class="q-pa-md">
                  <button v-on:click = "showNodeSelected">showClickedNode</button>
                  <div class="mifo">
                    <q-tree
                      :nodes="customize"
                      :duration="100"
                      node-key="label"
                      default-expand-all
                      ref="mytree"
                    >

                      <template v-slot:header-generic="prop">
                        <div class="row items-center no-wrap" :id="prop.node.myid" @contextmenu="miketest" @click="mikeclick" @doubleclick="mikedouble">
                          <q-icon :name="prop.node.icon || 'star'" :color="prop.node.iconcolor || 'orange'" class="icon-common" />
                          <div class="node-common">{{ prop.node.label }}</div>
                        </div>
                      </template>

                      <template v-slot:default-header="prop">
                        <div class="node-common">{{ prop.node.label }}</div>
                      </template>

                      <template v-slot:body-story="prop">
                        <span class="row items-center text-weight-thin" :id="prop.node.myid" @contextmenu="miketest">The story is: {{ prop.node.story }}</span>
                      </template>

                  </q-tree>
                </div>
                </div>
            </div>
        </q-page>
      </template>

      <template v-slot:after>
        <q-page style="background-color:white;">
            <q-splitter
      v-model="splitterModel2"
      :limits="[0, Infinity]"
      horizontal
      style="height: 10px;min-height:inherit;"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Before</div>
          <p class="mike">Hello Mike Test</p>
          <p class="mike">Hello Mike Test</p>
          <p class="mike">Hello Mike Test</p>
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">After</div>
          <q-btn color="purple" label="Account Settings">
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <q-color
                  v-model="hexStory"
                  class="my-picker"
                  style="width:100px; !important"
                  @change="val => { setStoryColor (val) }"
                 />
              </div>
            </q-menu>
          </q-btn>
          <q-btn color="purple" label="Account Settings">
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <q-color
                  v-model="hexNode"
                  class="my-picker"
                  style="width:100px; !important"
                  @change="val => { setNodeColor (val) }"
                 />
              </div>
            </q-menu>
          </q-btn>
          <q-slider v-model="standard" :min="-10" :max="20" style="max-width:200px;" />
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

    </q-splitter>
        </q-page>
      </template>
    </q-splitter>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      standard: 2,
      hexStory: '#37997a',
      hexNode: '#37997a',
      splitterModel: 20, // start at 50%
      splitterModel2: 50,
      customize: [
        {
          label: 'Good food',
          icon: 'mdi-fire-truck',
          iconcolor: 'teal-10',
          header: 'generic',
          myid: 'gf1',
          children: [
            {
              label: 'Quality ingredients',
              body: 'story',
              story: 'Lorem ipsum dolor sit amet.'
            },
            {
              label: 'Good recipe',
              body: 'story',
              story: 'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.',
              myid: 'mifo1'
            }
          ]
        },
        {
          label: 'Good service',
          header: 'generic',
          myid: 'gs1',
          // body: 'toggle',
          // caption: 'Why are we as consumers so captivated by stories of great customer service? Perhaps it is because...',
          enabled: false,
          children: [
            {
              label: 'Prompt attention',
              children: [
                { label: 'child node one' },
                { label: 'child node two' }
              ]
            },
            { label: 'Professional waiter' }
          ]
        },
        {
          label: 'Pleasant surroundings',
          myid: 'ps1',
          children: [
            { label: 'Happy atmosphere' },
            { label: 'Good table presentation', header: 'generic' },
            { label: 'Pleasing decor' }
          ]
        }
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
    setStoryColor: function (newColor) {
      const titems = document.querySelectorAll('.q-tree__node-body')
      titems.forEach(function (userItem) { userItem.style.setProperty('--story-color', newColor) })
    },
    setNodeColor: function (newColor) {
      const titems = document.querySelectorAll('.q-tree__node')
      titems.forEach(function (userItem) { userItem.style.setProperty('--node-color', newColor) })
    }
  }
}
// function decycle (obj, stack = []) {
//   if (!obj || typeof obj !== 'object') {
//     return obj
//   }
//   if (stack.includes(obj)) {
//     return null
//   }
//   const s = stack.concat([obj])

//   return Array.isArray(obj)
//     ? obj.map(x => decycle(x, s))
//     : Object.fromEntries(
//       Object.entries(obj)
//         .map(([k, v]) => [k, decycle(v, s)]))
// }
</script>
