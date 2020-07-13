<template>
    <div>
        <div @contextmenu="showNodeSelected">TEST</div>
            <div class="q-pa-md">
              <button v-on:click="showParam">Test Param</button>
              <button v-on:click="showNodeSelected">showClickedNode</button>
              <div class="tree-wrapper">
                <q-tree
                  :nodes="customize"
                  :duration="100"
                  node-key="label"
                  default-expand-all
                  ref="mytree"
                >
                <!--@contextmenu="miketest"
                      @click="mikeclick"
                      @doubleclick="mikedouble"-->
                  <template v-slot:header-generic="prop">
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
                  </template>

                  <template v-slot:default-header="prop">
                    <div class="node-common">{{ prop.node.label }}</div>
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
export default {
  props: ['pob'],
  data () {
      return {
          customize: [],
          testmike: this.pob.eTree
      }
  },
  methods: {
    showParam: function () {
      console.log(this.customize)
    },
    showNodeSelected: function () {
      this.$refs.mytree.setExpanded('Good food', false)
    }
    
  },
  watch: {
    'pob.eTree': function (val) {
      console.log('MIKE CHANGED')
      this.customize = this.pob.eTree
    }
  }
}
</script>
