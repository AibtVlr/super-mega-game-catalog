<template>
  <b-container class="pt-4" fluid>
    <div class="d-flex">
      <h3>
        Catalog
      </h3>

      <b-btn class="mb-3 ml-auto" variant="dark" @click="showFilters = !showFilters">
        <b-icon icon="funnel" />
        Filters
      </b-btn>
    </div>

    <div class="pb-3 pt-3" v-show="showFilters">
      <b-row class="mb-3">
        <b-col class="d-flex" cols="12" md="6" lg="4">
          <input class="smgc-input" v-model="search" placeholder="Search" type="text">
        </b-col>
      </b-row>

      <div class="d-flex align-items-center mb-3">
        <p class="mb-0 mr-3">
          Sort by
        </p>

        <div class="d-flex gap-1">
          <button :class="{'active': sort_by === 'rating'}" @click="sort_by = 'rating'" class="smgc-button">
            Rating
          </button>

          <button :class="{'active': sort_by === 'released'}" @click="sort_by = 'released'" class="smgc-button">
            Released
          </button>
        </div>
      </div>

      <div class="d-flex align-items-center mb-4">
        <p class="mb-0 mr-3">
          Order
        </p>

        <div class="d-flex gap-1">
          <button :class="{'active': order === ''}" @click="order = ''" class="smgc-button">
            Ascending
          </button>

          <button :class="{'active': order === '-'}" @click="order = '-'" class="smgc-button">
            Descending
          </button>
        </div>
      </div>

      <p>
        Platforms
      </p>

      <div class="d-flex flex-wrap gap-1 mb-3">
        <button class="tag"
                :class="{'active': platform.selected}"
                v-for="(platform, index) in platforms"
                @click="selectPlatform(index)"
                :key="platform.id">
          {{platform.name}}
        </button>
      </div>

      <b-btn variant="primary" @click="findGames">
        <b-icon icon="search" />
        Search
      </b-btn>

      <b-btn class="ml-3" variant="dark" @click="clearFilters()">
        Clear filters
      </b-btn>
    </div>

    <game-cards-container @handleScrollToBottom="filteredSearch ? findGames() : $store.dispatch('GET_GAMES_WITH_FILTERS', {})">
      <game-card v-for="game in $store.getters.FILTERED_GAMES"
                 :image="game.background_image"
                 :name="game.name"
                 :rating="game.rating"
                 :released="game.released"
                 :id="game.id"
                 :key="game.id">
        {{game.name}}
      </game-card>
    </game-cards-container>


  </b-container>
</template>

<script>
import game_cards_container from "@/components/game_card/game_cards_container";
import game_card from "@/components/game_card/game_card";

export default {
  name: 'Catalog',
  components: {
    'game-card': game_card,
    'game-cards-container': game_cards_container,
  },

  data: () => ({
    showFilters: false,
    filteredSearch: false,
    sort_by: 'rating',
    order: '-',
    search: '',
    selected_platforms: [],
    platforms: [],
  }),

  methods: {
    findGames() {
      this.filteredSearch = true
      let filters = {
        ordering: `${this.order}${this.sort_by}`,
      }

      if(this.search !== '') {
         filters.search = this.search
      }

      this.selected_platforms = []

      this.platforms.forEach(platform => {
        if(platform.selected) {
          this.selected_platforms.push(platform.id)
        }
      })

      if(this.selected_platforms.length > 0) {
        filters.platforms = this.selected_platforms
      }

      this.$store.dispatch('GET_GAMES_WITH_FILTERS', filters)
    },

    clearFilters() {
      this.filteredSearch = false
      this.sort_by =  'rating'
      this.order =  '-'
      this.search =  ''
      this.selected_platforms =  []
      this.platforms.forEach((platform, index) => {
        platform.selected = false
        this.$set(this.platforms, index, platform)
      })

      this.$store.dispatch('GET_GAMES_WITH_FILTERS', {})
    },

    selectPlatform(index) {
      let platform = this.platforms[index]
      platform.selected = !platform.selected
      this.$set(this.platforms, index, platform);
    },
  },

  mounted() {
    this.$store.dispatch('GET_PLATFORMS')
        .then(response => {
          response.data.results.forEach(platform => {
            platform.selected = false
            this.platforms.push(platform)
          })
        })

    this.$store.dispatch('GET_GAMES_WITH_FILTERS', {})
  }
}
</script>
