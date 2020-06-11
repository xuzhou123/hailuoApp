<template>
  <div id="app">
    <loadSvga />
    <router-view />
  </div>
</template>

<script>
import loadSvga from './components/load-svga'
export default {
  name: 'App',
  components:{
      loadSvga
  }
}
</script>

<style>
</style>
