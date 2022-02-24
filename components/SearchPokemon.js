app.component('search-pokemon', {
    template:
      /*html*/
      `
      <form class="search-form" @submit.prevent="searchPokemon">
        <!-- Space to write the search to be performed -->
        <input class="search-bar" type="text" v-model="search" placeholder="Search" />
        <!-- Button to submit the search -->
        <button class="search-button" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </form>
    `,
    data() {
      return {
        search: ''
      }
    },
    methods: {
      /* Search a pokemon*/
      searchPokemon() {
        const elements = {
          search: this.search,
        }
        this.$emit('search-pokemon', elements)
        this.search = ''
      }
    }
  })