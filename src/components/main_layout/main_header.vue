<template>
<div class="main-header d-flex bg-dark">
  <b-container class="d-flex align-items-center" fluid>
    <router-link to="/">
      <h3 class="py-3">
        <span class="text-primary">S</span>
        <span class="text-warning">M</span>
        <span class="text-info">G</span>
        <span class="text-danger">C</span>
    </h3>
    </router-link>

    <div class="main-header-menu d-flex flex-grow-1 justify-content-end">
      <router-link to="/catalog" class="main-menu-link">Catalog</router-link>
    </div>
  </b-container>
</div>
</template>

<script>
export default {
  name: "main_header"
}
</script>

<style scoped>

</style>