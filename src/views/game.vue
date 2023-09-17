<template>
<b-container class="p-0 position-relative" fluid>
  <div class="game-page-image-container top-0 w-100">
    <img class="game-page-image" :src="game.background_image_additional" alt="">
  </div>

  <div class="game-page-content top-0">
    <b-container>
      <div class="d-flex flex-wrap align-items-center">
        <h1 class="font-weight-bold mr-3">
          {{ game.name }}
        </h1>

        <b-form-rating v-model="game.rating" show-value variant="warning" class="bg-transparent border-0 p-0 text-white" inline readonly></b-form-rating>
      </div>

      <div class="d-flex gap-1 flex-wrap mb-2">
        <b-badge class="px-3 py-2" variant="dark" v-for="platform in game.platforms" :key="platform.platform.id">
          {{ platform.platform.name }}
        </b-badge>
      </div>

      <b-link class="mb-2 d-inline-block" variant="light" target="_blank" :href="game.website">
        {{ game.website }}
      </b-link>

      <p class="mb-5 text-muted">
        {{ game.released }}
      </p>

      <b-tabs content-class="pt-3">
        <b-tab title="Details">
          <template #title>
            <div class="d-flex align-items-center">
              <b-icon icon="card-text" class="mr-2" />
              <p class="mb-0">
                Details
              </p>
            </div>
          </template>

          <h3>Description</h3>
          <span v-html="game.description"></span>
        </b-tab>

        <b-tab title="Screenshots">
          <template #title>
            <div class="d-flex align-items-center">
              <b-icon icon="images" class="mr-2" />
              <p class="mb-0">
                Screenshots
              </p>
            </div>
          </template>

          <Flicking :options="{circular: true }">
            <div class="slider-panel col-12 col-md-6 col-lg-4" v-for="screenshot in screenshots.results" :key="screenshot.id">
              <img :src="screenshot.image" class="game-screenshot" alt="">
            </div>
          </Flicking>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</b-container>
</template>

<script>
export default {
  name: "game",

  data: () => ({
    game: {},
    screenshots: {},
  }),

  mounted() {
    console.log(this.$route.query.id)
    this.$store.dispatch('GET_GAME_BY_ID', this.$route.query.id)
        .then(response => {
          console.log(response.data)
          this.game = response.data

          this.$store.dispatch('GET_GAME_SCREENSHOTS', this.game.slug)
              .then(response => {
                console.log(response.data)
                this.screenshots = response.data
              })
        })
  }
}
</script>

<style scoped>

</style>