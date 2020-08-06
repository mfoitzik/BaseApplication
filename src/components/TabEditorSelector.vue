<template>
  <div ref="toptab" style="height:100%">
    <div v-if="template==='splash'">
        <splash />
    </div>
    <div v-if="template==='text'" ref="seltab" style="height:100%;box-sizing: border-box;">
        <!--<p>Test: {{computedHeight}}</p>{{store.state.editorHeight}}-->
        <!--<lined-text-area v-bind:styles="computedHeight" :value="data" />-->
        <!--<q-input
      v-model="text"
      filled
      type="textarea"
      :input-style="computedTextHeight"
      class="self-stretch texteditor"
    />-->
    <textarea class="self-stretch texteditor" v-model="dataEditorData" />
    </div>
    <div v-if="template==='html'" id="testobs" class="row" style="border:4px solid black;height:100%;box-sizing: border-box;">
        <q-editor id="testmike" v-model="dataEditorData" class="fit" :height="hHeight" />
    </div>
  </div>
</template>

<script>
import Splash from '../components/Splash'
import LinedTextArea from '../components/LinedTextArea'
import { store } from '../mainstore'
export default {
  name: 'TabEditorSelector',
  data () {
    return {
        storeHeight: store.state.editorHeight,
        storeText: store.state.textEditor,
        storeHtml: store.state.htmlEditor,
        mtest: 'hhhhh',
        tempHeight: 100,
        tempWait: 250,
        tempWaitFlag: 0,
        editorSource: '',
        hHeight: '250px',
        dataEditorData: ''
    }
  },
  props: {
    template: {
      type: String,
      required: true
    },

    editorData: {
      type: String,
      default: ''
    },
    editorIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
      Splash,
      // LinedTextArea
  },
  computed: {
      computedHeight: function () {
       return {height: (store.state.editorHeight - 10 + 'px')}
      // return {height: ('250px')}
      },
      computedTextHeight: function () {
       return {height: (store.state.editorHeight - 50 + 'px')}
      // return {height: ('250px')}
      },
      computedHtmlHeight: function () {
       return  this.hHeight + 'px'
      // return {height: ('250px')}
      }
  },
  watch: {
    // sHeight (newHeight, oldHeight) {
    //     // Our fancy notification (2).
    //     console.log('element height: ' + this.$refs.toptab.clientHeight)
    //     console.log('old height: ' + oldHeight)
    //     console.log('new height: ' + newHeight)
    //     console.log('state height: ' + store.state.editorHeight)
    //     console.log('temp height: ' + this.tempHeight)
    //     var tempThis = this
    //     if (store.state.editorHeight !== this.tempHeight) {
    //         setTimeout (() => {
    //         console.log('I TIMED OUT!')
    //         console.log(tempThis.tempHeight)
    //         console.log(store.state.editorHeight)
    //         tempThis.tempHeight = store.state.editorHeight
    //         }, tempThis.tempWait)
    //     }
    // }
    storeText (newText, oldText) {
        // console.log(newHeight)
        // console.log('NEW height: ' + newHeight)
        // console.log('OLD height: ' + oldHeight)
        store.state.textEditor = newText
    },
    dataEditorData (newText, oldText) {
        // console.log(newHeight)
        // console.log('NEW height: ' + newHeight)
        // console.log('OLD height: ' + oldHeight)
        console.log('EDITOR DATA: ' + newText)
        store.state.mainTabs[this.editorIndex].data = newText
    }
  },
  mounted () {
      // console.log('MOUNTED TAB EDITOR SELECTOR: ' + this.$refs.toptab.clientHeight + ' TEMPHEIGHT: ' + this.tempHeight)
      // this.tempHeight = this.$refs.toptab.clientHeight - 10
      // console.log('NEW TEMP HEIGHT: ' + this.tempHeight)
      // console.log('TEMP WAIT: ' + this.tempWait)
      this.dataEditorData = this.editorData
      var mThis = this
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered
            console.log('TEST MOUNTED: ' + this.editorData)
            const myObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                    // console.log('width::', entry.contentRect.width)
                    // console.log('height::', entry.contentRect.height)
                    mThis.hHeight = entry.contentRect.height - 36 + 'px'
                    
                })
            })
            const someEl = document.getElementById('testobs')
            if (someEl !== null) {
                myObserver.observe(someEl)
            }
            
        })
      
  },
  methods: {
    editorResize (val) {
    console.log('I HAVE RESIZED')
    //   console.log('SPLITTERTOP')
    //   console.log(this.$refs.splitterTop)
    console.log(val)
    this.hHeight = val.height - 40
    //   console.log('RESIZE TEMP HEIGHT: ' + this.tempHeight)
    //   // var tof = typeof this.$refs.toptab.clientHeight
    //   console.log('TYPEOF: ' + (typeof this.$refs.toptab.clientHeight))
    //   if (typeof this.$refs.toptab.clientHeight !== 'undefined') {
    //     console.log('RESIZE REF HEIGHT: ' + this.$refs.toptab.clientHeight)
    //     // console.log('RESIZE SEL HEIGHT: ' + this.$refs.seltab.clientHeight)
    //     this.tempHeight = this.$refs.toptab.clientHeight
    //   }
      
    // setTimeout (() => {
    //     console.log('I TIMED OUT!')
    //     console.log('TIMEOUT TEMP HEIGHT: ' + this.tempHeight)
    //     console.log('TIMEOUT REF HEIGHT: ' + this.$refs.toptab.clientHeight)
    //     }, 250)
      
      // this.tempHeight = val.height
    }
  }
}
</script>

