<template>
  <q-page class="vertical-top">
    <q-btn color="Primary" @click="test2" label="primary" /><br />
    <p v-html="message"></p>
  </q-page>
</template>

<script>
var bMike = 'this is a test'
// var fs = require('fs')
export default {
  name: 'PageIndex',
  data () {
    return {
      message: bMike
    }
  },
  methods: {
    test1 () {
      // var fileList = ''
      // var vm = this
      // fs.readdir(this.$route.query.id, function (err, files) {
      //   if (err) {
      //     throw err
      //   }
      //   for (var index in files) {
      //     console.log(files[index])
      //     fileList += files[index] + '<br />'
      //   }
      //   console.log('FILELIST: ' + fileList)
      //   vm.message = fileList
      // })
      this.message = this.$route.query.id
    },
    test2 () {
      console.log('test: ' + this.$route.query.id)
      this.message = this.$route.query.id
    }
  },
  mounted () {
    this.test1()
  }
}
</script>
