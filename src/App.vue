<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import Index from './views/Index.vue'
export default {
  name: 'App',
  components:{
    Index
  }
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2d4054;
  font-size: 14px;
}
</style>
