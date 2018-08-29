<template>
  <div id="app">
    <site-header></site-header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    <background-graphic/>
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue'
import BackgroundGraphic from './components/BackgroundGraphic.vue';
export default {
    name: 'app',
		components: {
      SiteHeader,
      BackgroundGraphic,
    }
}
</script>
<style>
@import 'scss/app.scss';

</style>
