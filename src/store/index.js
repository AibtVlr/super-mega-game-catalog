import Vue from 'vue'
import Vuex from 'vuex'

function objectToQueryString(obj) {
    const keyValuePairs = [];

    for (const key in obj) {
        let value
        if (key in obj) {
            value = obj[key].toString()
            keyValuePairs.push(`${encodeURIComponent(key)}=${value}`)
        }
    }

    console.log(keyValuePairs)

    return keyValuePairs.join('&');
}

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    main_game_catalog: [],
    filtered_games: [],
    old_filters: {},
    platforms: [],
    page: 1,
    filter_page: 1,
  },

  mutations: {
    SET_MAIN_GAME_CATALOGS: (state, games) => {
      state.main_game_catalog = [
          ...state.main_game_catalog,
          ...games
      ]
    },

    SET_FILTERED_GAMES: (state, games) => {
        state.filtered_games = [
            ...state.filtered_games,
            ...games
        ]
    },

    clearFilteredGames: (state) => {
        state.filtered_games = []
    },

    SET_PLATFORMS: (state, platforms) => {
        state.platforms = platforms
    },

    setPage: (state, page) => {
      state.page = page
    },

    setFilterPage: (state, page) => {
          state.filter_page = page
      },

    saveFilters: (state, filters) => {
        state.old_filters = filters
    }
  },

  actions: {
    GET_GAMES({commit, state}, page) {
      if(page && page !== state.page) {
        commit('setPage', page)
      }

      return new Promise((resolve, reject) => {
        window.axios(`games?key=${window.rawgApiKey}&page_size=39&page=${state.page}`, {
          method: 'GET',
        })
            .then(response => {
              commit('SET_MAIN_GAME_CATALOGS', response.data.results)
              commit('setPage', state.page + 1)
              console.log(response)
              resolve(response)
            })
            .catch(err => {
              console.log(err, err.response)
              reject(err)
            })
      })
    },

    GET_GAMES_WITH_FILTERS({commit, state}, filters) {
        let check_filter = (JSON.stringify(filters) !== JSON.stringify(state.old_filters))

        if(check_filter) {
            commit('setFilterPage', 1)
            commit('saveFilters', filters)
            commit('clearFilteredGames')
        }

        return new Promise((resolve, reject) => {
            window.axios(`games?key=${window.rawgApiKey}&${objectToQueryString(filters)}&page=${state.filter_page}`)
                .then(response => {
                    resolve(response)
                    console.log(response)
                    commit('SET_FILTERED_GAMES', response.data.results)
                    commit('setFilterPage', state.filter_page + 1)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
   },

    GET_PLATFORMS({commit}) {
        return new Promise((resolve, reject) => {
            window.axios(`platforms?key=${window.rawgApiKey}&page_size=100`)
                .then(response => {
                    commit('SET_PLATFORMS', response.data)
                    resolve(response)
                })
                .catch(err => {
                    reject(err)

                    console.log(err)
                })
        })
    },

    GET_GAME_BY_ID({}, id) {
        return new Promise((resolve, reject) => {
            window.axios(`games/${id}?key=${window.rawgApiKey}`)
                .then(response => {
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                    console.log(err)
                })
        })
    },

    GET_GAME_SCREENSHOTS({}, slug) {
        return new Promise((resolve, reject) => {
            window.axios(`games/${slug}/screenshots?key=${window.rawgApiKey}`)
                .then(response => {
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                    console.log(err)
                })
        })
    },
  },

  getters: {
    MAIN_GAME_CATALOG: state => state.main_game_catalog,
    FILTERED_GAMES: state => state.filtered_games,
    PLATFORMS: state => state.platforms
  },

  modules: {
  }
})
