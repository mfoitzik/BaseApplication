<template>
    <div>
        <h1>
            SEARCH
        </h1>
        <button v-on:click="showParam">Test Param</button>
        <h4>{{mike.message}}</h4>
    </div>
</template>
<script>
export default {
  props: ['mike'],
  data () {
      return {
          // customize: mike.eTree
      }
  },
  methods: {
    showParam: function () {
      console.log(this.mike.message)
    }
  }
}
</script>