<script>
import 'vue3-toastify/dist/index.css'
import {RouterView} from 'vue-router'

const defaultLayout = 'auth-layout'

export default {
  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout
    }
  },

  components: {
    'RouterView': RouterView
  }
}
</script>

<template>
  <component :is="layout">
    <RouterView/>
  </component>
</template>

<style></style>
