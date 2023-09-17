<template>
  <div class="game-card-container" ref="gameCardContainer" @scroll="checkScroll">
    <b-row style="gap: 2rem 0">
      <slot />
    </b-row>

    <div class="d-flex align-items-center justify-content-center py-4">
      <div class="bg-dark rounded-pill px-5 py-2">
        Load more
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "game_cards_container",

  methods: {
    checkScroll() {
      let gameCardContainer = this.$refs.gameCardContainer
      if (gameCardContainer.scrollTop + gameCardContainer.clientHeight >= gameCardContainer.scrollHeight) {
        console.log('bottom')
        this.$emit('handleScrollToBottom', gameCardContainer.scrollTop + gameCardContainer.clientHeight >= gameCardContainer.scrollHeight);
      }
    },
  },
}
</script>

<style scoped>

</style>