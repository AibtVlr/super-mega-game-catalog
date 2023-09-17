<template>
<div class="main-layout">
  <main-header />

  <slot />
</div>
</template>

<script>
import main_header from "@/components/main_layout/main_header";

export default {
  name: "main_layout",
  components: {
    'main-header': main_header,
  },
}
</script>

<style scoped>

</style>