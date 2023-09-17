<template>
<b-col cols="12" md="6" lg="4">
  <div class="game-card position-relative h-100 d-flex flex-column">
    <img :src="image" class="game-card-image flex-grow-1" :alt="name">

    <div class="game-card-body mt-auto">
      <p class="mb-3 h5">
        {{name}}
      </p>

      <div class="d-flex align-items-center w-100">
        <div>
          <p class="mb-0 text-warning">
            <b-icon class="mr-1" icon="star" /> {{rating}}
          </p>

          <p class="mb-0 text-muted">
            <b-icon class="mr-1" icon="calendar" />
            {{released}}
          </p>
        </div>

        <b-btn class="ml-auto" :to="`/game?id=${id}`" variant="light">
          Open game page
        </b-btn>
      </div>
    </div>
  </div>
</b-col>
</template>

<script>
export default {
  name: "game_card",
  props: ['image', 'name', 'rating', 'released', 'id'],
}
</script>

<style scoped>

</style>