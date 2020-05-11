<template>
  <div class="fit row no-wrap justify-start items-start content-start">
    <q-page>
    <div style="display:inline-block;width:50px;height:500px;min-height:inherit;">
        <p>TT</p>
        <p>TX</p>
    </div>
    </q-page>
    <div class="col" style="display:inline-block;">
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-page style="background-color:pink;">
            <q-scroll-area class="q-pa-sm bg-blue-3" style="height:500px;min-height:inherit;" visible>
                <div class="q-pa-md">
                <div class="text-h4 q-mb-md">Before</div>
                <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
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
      splitterModel: 50, // start at 50%
      splitterModel2: 50
    }
  }
}
</script>
