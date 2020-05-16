<template>
  <div class="fit row no-wrap justify-start items-start content-start">
    <q-page>
      <div class="activity-pane">
        <div class="row items-center justify-center activity-selector-icon-holder">
          <q-icon name="folder_open" class="activity-selector-icon" />
        </div>
        <div class="row items-center justify-center activity-selector-icon-holder">
          <q-icon name="search" class="activity-selector-icon" />
        </div>
        <div class="row items-center justify-center activity-selector-icon-holder">
          <q-icon name="publish" class="activity-selector-icon" />
        </div>
        <div class="row items-center justify-center activity-selector-icon-holder">
          <q-icon name="settings" class="activity-selector-icon" />
        </div>
      </div>
    </q-page>
    <div class="col" style="display:inline-block;">
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-page style="background-color:pink;">
            <q-scroll-area class="q-pa-sm bg-blue-3" style="height:500px;min-height:inherit;" visible>
                <div @contextmenu="showNodeSelected">TEST</div>
                <div class="q-pa-md">
                  <button v-on:click = "showNodeSelected">showClickedNode</button>
                  <q-tree
      :nodes="customize"
      node-key="label"
      default-expand-all
    >
      <template v-slot:header-root="prop">
        <div class="row items-center">
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" class="avatar q-mr-sm">
          <div>
            {{ prop.node.label }}
            <q-badge color="orange" class="q-ml-sm">New!</q-badge>
          </div>
        </div>
      </template>

      <template v-slot:header-generic="prop">
        <div class="row items-center">
          <q-icon :name="prop.node.icon || 'star'" color="orange" size="28px" class="q-mr-sm" />
          <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:body-story="prop">
        <span class="text-weight-thin" :id="prop.node.myid" @contextmenu="miketest">The story is: {{ prop.node.story }}</span>
      </template>

      <template v-slot:body-toggle="prop">
        <p class="text-caption">{{ prop.node.caption }}</p>
        <q-toggle v-model="prop.node.enabled" label="I agree to the terms and conditions" />
      </template>
    </q-tree>
                </div>
            </q-scroll-area>
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
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">After</div>
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
      splitterModel: 20, // start at 50%
      splitterModel2: 50,
      customize: [
        {
          label: 'Satisfied customers',
          header: 'root',
          children: [
            {
              label: 'Good food',
              icon: 'restaurant_menu',
              header: 'generic',
              children: [
                {
                  label: 'Quality ingredients',
                  header: 'generic',
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
              // body: 'toggle',
              // caption: 'Why are we as consumers so captivated by stories of great customer service? Perhaps it is because...',
              enabled: false,
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Pleasant surroundings',
              children: [
                { label: 'Happy atmosphere' },
                { label: 'Good table presentation', header: 'generic' },
                { label: 'Pleasing decor' }
              ]
            }
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
      console.log(this.selected)
    },
    miketest: function () {
      event.preventDefault()
      console.log(event.currentTarget.id)
      // JSON.stringify(this)
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
