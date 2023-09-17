<template>
  <div id="app">
    <main-layout>
      <router-view/>
    </main-layout>
  </div>
</template>

<script>
import main_layout from "@/layouts/main_layout";

  export default ({
    components: {
      'main-layout': main_layout,
    }
  })
</script>

<style lang="scss">
@import "sass/theme.scss";
</style>
