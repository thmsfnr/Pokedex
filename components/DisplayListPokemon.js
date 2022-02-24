app.component('display-list-pokemon', {
  props: {
    list: {
      required: true
    }
  },
  template:
    /*html*/
    `
    <div class="list-pokemon"  @click.capture="select(pokemon.id)" v-for="pokemon in list" :key="pokemon.id">
      <!-- Id and name of the pokemon -->
      <div class="title-list">
        <div><h2>#{{ pokemon.id }} {{ pokemon.name }}</h2></div>
      </div>
      <!-- Image of the pokemon -->
      <img class="big-img-pokemon" :src="pokemon.img">
    </div>
  `,
  methods: {
    /* Select a pokemon*/
    select(id) {
      const pokemonSelected = {
        id: id,
      }
      this.$emit('pokemon-selected', pokemonSelected)
    }
  }
})